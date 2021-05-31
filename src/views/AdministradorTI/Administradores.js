import React from "react";
import { Card, CardBody, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core/";
import Localization from "../../helpers/Localization";
import { getAdministradores } from "../../database/administradorTI/getAdministradores";
import { postAdministrador } from "../../database/administradorTI/postAdministrador";
import { putAdministrador } from "../../database/administradorTI/putAdministrador";
import { reestablecerContraseñaAdministrador } from "../../database/administradorTI/reestablecerContraseñaAdministrador";
import { deleteAdministrador } from "../../database/administradorTI/deleteAdministrador";
import { asociarCursoAdministrador } from "../../database/administradorTI/asociarCursoAdministrador";
import Cookies from "universal-cookie";
import { getCursos } from "../../database/administradorTI/getCursos";
import { formatAdministradores } from "../../helpers/AdministradorTI/formatAdministradores";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import { formatCursos } from "functions/formats/estudiantes/formatCursos";
import { sha256 } from "js-sha256";
import { format } from "rut.js";
const cookies = new Cookies();

class Administradores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnas: [
                { title: "APELLIDOS", field: "apellidos_administrador_academico" },
                { title: "NOMBRES", field: "nombres_administrador_academico" },
                { title: "CORREO", field: "correo_electronico_administrador_academico" },
                { title: "RUT", field: "rut_administrador_academico" },
                { title: "CELULAR", field: "telefono_celular_administrador_academico" },
                { title: "TELÉFONO", field: "telefono_fijo_administrador_academico" },
            ],
            queriesReady: false,
            administradores: [],
            cursos: [],

            //DATOS
            nombresAdministrador: "",
            apellidosAdministrador: "",
            correoElectronicoAdministrador: "",
            contraseñaAdministrador: "",
            rutAdministrador: "",
            telefonoAdministrador: "",
            celularAdministrador: "",
            idAdministrador: "",
            siglaCurso: 0,

            modalEliminarAdministrador: false,
            modalAgregarAdministrador: false,
            modalEditarAdministrador: false,
            modalPasswordAdministrador: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAgregarAdministrador = this.handleAgregarAdministrador.bind(this);
        this.handleModalAgregarAdministrador = this.handleModalAgregarAdministrador.bind(this);
        this.handleEditarAdministrador = this.handleEditarAdministrador.bind(this);
        this.handleModalEditarAdministrador = this.handleModalEditarAdministrador.bind(this);
        this.handlePasswordAdministrador = this.handlePasswordAdministrador.bind(this);
        this.handleModalPasswordAdministrador = this.handleModalPasswordAdministrador.bind(this);
        this.handleEliminarAdministrador = this.handleEliminarAdministrador.bind(this);
        this.handleModalEliminarAdministrador = this.handleModalEliminarAdministrador.bind(this);
        this.handleAsociarCurso = this.handleAsociarCurso.bind(this);
        this.handleModalAsociarCurso = this.handleModalAsociarCurso.bind(this);
    }
    componentDidMount() {
        Promise.all([getAdministradores(cookies.get("token")), getCursos(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    queriesReady: true,
                    administradores: formatAdministradores(values[0].data),
                    cursos: formatCursos(values[1].data),
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleAsociarCurso(event) {
        event.preventDefault();
        var datos = this.state.siglaCurso.split("||");
        asociarCursoAdministrador(cookies.get("token"), datos[1], datos[0], this.state.idAdministrador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Administrador asociado con éxito");
                    this.setState(
                        {
                            siglaCurso: 0,
                            modalAsociarCurso: !this.state.modalAsociarCurso,
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAsociarCurso(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                idAdministrador: rowData["id"],
            });
        }
        this.setState({
            modalAsociarCurso: !this.state.modalAsociarCurso,
        });
    }
    handleAgregarAdministrador(event) {
        event.preventDefault();
        var newAdministrador = {
            apellidos_administrador_academico: this.state.apellidosAdministrador,
            correo_electronico_administrador_academico: this.state.correoElectronicoAdministrador,
            hash_contrasena_administrador_academico: sha256(this.state.rutAdministrador),
            id_rol: 3,
            nombres_administrador_academico: this.state.nombresAdministrador,
            rut_administrador_academico: this.state.rutAdministrador,
            telefono_celular_administrador_academico: this.state.telefonoAdministrador,
            telefono_fijo_administrador_academico: this.state.celularAdministrador,
        };
        postAdministrador(cookies.get("token"), newAdministrador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Administrador agregado con éxito");
                    this.setState(
                        {
                            apellidosAdministrador: "",
                            correoElectronicoAdministrador: "",
                            rutAdministrador: "",
                            nombresAdministrador: "",
                            telefonoAdministrador: "",
                            celularAdministrador: "",
                            modalAgregarAdministrador: !this.state.modalAgregarAdministrador,
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAgregarAdministrador() {
        this.setState({
            modalAgregarAdministrador: !this.state.modalAgregarAdministrador,
        });
    }

    handleEditarAdministrador(rowData) {
        var newAdministrador = {
            apellidos_administrador_academico: this.state.apellidosAdministrador,
            correo_electronico_administrador_academico: this.state.correoElectronicoAdministrador,
            nombres_administrador_academico: this.state.nombresAdministrador,
            rut_administrador_academico: this.state.rutAdministrador,
            telefono_celular_administrador_academico: this.state.telefonoAdministrador,
            telefono_fijo_administrador_academico: this.state.celularAdministrador,
        };
        putAdministrador(cookies.get("token"), newAdministrador, this.state.idAdministrador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Administrador modificado con éxito");
                    this.setState({
                        apellidosAdministrador: "",
                        correoElectronicoAdministrador: "",
                        rutAdministrador: "",
                        nombresAdministrador: "",
                        telefonoAdministrador: "",
                        celularAdministrador: "",
                        modalEditarAdministrador: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEditarAdministrador(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombresAdministrador: rowData["nombres_administrador_academico"],
                apellidosAdministrador: rowData["apellidos_administrador_academico"],
                correoElectronicoAdministrador: rowData["correo_electronico_administrador_academico"],
                rutAdministrador: rowData["rut_administrador_academico"],
                telefonoAdministrador: rowData["telefono_fijo_administrador_academico"],
                celularAdministrador: rowData["telefono_celular_administrador_academico"],
                idAdministrador: rowData["id"],
            });
        }

        this.setState({
            modalEditarAdministrador: !this.state.modalEditarAdministrador,
        });
    }
    handleEliminarAdministrador(rowData) {
        deleteAdministrador(cookies.get("token"), this.state.idAdministrador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Eliminado", "Administrador eliminado con éxito");
                    this.setState({
                        modalEliminarAdministrador: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEliminarAdministrador(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                idAdministrador: rowData["id"],
            });
        }

        this.setState({
            modalEliminarAdministrador: !this.state.modalEliminarAdministrador,
        });
    }
    handlePasswordAdministrador(rowData) {
        reestablecerContraseñaAdministrador(cookies.get("token"), this.state.idAdministrador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Reestablecido", "Contraseña reestablecida con éxito");
                    this.setState({
                        modalPasswordAdministrador: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalPasswordAdministrador(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                idAdministrador: rowData["id"],
            });
        }

        this.setState({
            modalPasswordAdministrador: !this.state.modalPasswordAdministrador,
        });
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <Button color="primary" onClick={this.handleModalAgregarAdministrador} style={{ marginBottom: "30px" }}>
                                        Crear Administrador <i className="fas fa-plus"></i>
                                    </Button>
                                    <MaterialTable
                                        columns={this.state.columnas}
                                        data={this.state.administradores}
                                        title="Información Administradores"
                                        localization={Localization}
                                        components={{
                                            Container: (props) => <Paper {...props} elevation={5} />,
                                        }}
                                        icons={{
                                            Filter: React.forwardRef((props, ref) => {
                                                return <SearchIcon ref={ref} />;
                                            }),
                                            Search: React.forwardRef((props, ref) => {
                                                return <SearchIcon ref={ref} />;
                                            }),
                                        }}
                                        actions={[
                                            {
                                                icon: "people",
                                                tooltip: "Asociar curso",
                                                onClick: (event, rowData) => this.handleModalAsociarCurso(rowData),
                                            },
                                            {
                                                icon: "create",
                                                tooltip: "Editar administrador",
                                                onClick: (event, rowData) => this.handleModalEditarAdministrador(rowData),
                                            },
                                            {
                                                icon: "delete",
                                                tooltip: "Borrar administrador",
                                                onClick: (event, rowData) => this.handleModalEliminarAdministrador(rowData),
                                            },
                                            {
                                                icon: "lock",
                                                tooltip: "Reestablecer contraseña",
                                                onClick: (event, rowData) => this.handleModalPasswordAdministrador(rowData),
                                            },
                                        ]}
                                        options={{
                                            exportButton: true,
                                            filtering: true,
                                            pageSize: 10,
                                            sorting: true,
                                            headerStyle: {
                                                backgroundColor: "#8C1C13",
                                                color: "#FFF",
                                                textAlign: "center",
                                                fontWeight: "normal",
                                            },
                                        }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAgregarAdministrador}>
                        <ModalHeader>Crear Administrador</ModalHeader>
                        <ModalBody>
                            <form>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Nombres Administrador</small>
                                        <Input
                                            name="nombresAdministrador"
                                            value={this.state.nombresAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="Jose Pedro Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Apellidos Administrador</small>
                                        <Input
                                            name="apellidosAdministrador"
                                            value={this.state.apellidosAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Correo</small>
                                        <Input
                                            name="correoElectronicoAdministrador"
                                            value={this.state.correoElectronicoAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="nombre.apellido@mail.udp.cl"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>RUT</small>
                                        <Input
                                            name="rutAdministrador"
                                            value={format(this.state.rutAdministrador)}
                                            onChange={this.handleChange}
                                            placeholder="123456789"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Teléfono</small>
                                        <Input
                                            name="telefonoAdministrador"
                                            value={this.state.telefonoAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="24350000"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Celular</small>
                                        <Input
                                            name="celularAdministrador"
                                            value={this.state.celularAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="96050000"
                                        />
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAgregarAdministrador}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleModalAgregarAdministrador}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEditarAdministrador}>
                        <ModalHeader>Editar Administrador</ModalHeader>
                        <ModalBody>
                            <form>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Nombres Administrador</small>
                                        <Input
                                            name="nombresAdministrador"
                                            value={this.state.nombresAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="Jose Pedro Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Apellidos Administrador</small>
                                        <Input
                                            name="apellidosAdministrador"
                                            value={this.state.apellidosAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Correo</small>
                                        <Input
                                            name="correoElectronicoAdministrador"
                                            value={this.state.correoElectronicoAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="nombre.apellido@mail.udp.cl"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>RUT</small>
                                        <Input
                                            name="rutAdministrador"
                                            value={format(this.state.rutAdministrador)}
                                            onChange={this.handleChange}
                                            placeholder="123456789"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Teléfono</small>
                                        <Input
                                            name="telefonoAdministrador"
                                            value={this.state.telefonoAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="24350000"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Celular</small>
                                        <Input
                                            name="celularAdministrador"
                                            value={this.state.celularAdministrador}
                                            onChange={this.handleChange}
                                            placeholder="96050000"
                                        />
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleEditarAdministrador}>
                                Modificar
                            </Button>
                            <Button onClick={this.handleModalEditarAdministrador}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAsociarCurso}>
                        <ModalHeader>Asociar Curso</ModalHeader>
                        <ModalBody>
                            <form>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Curso</small>
                                        <Input type="select" name="siglaCurso" value={this.state.siglaCurso} onChange={this.handleChange} required>
                                            <option disabled value={"0"}>
                                                -- Elija un curso --
                                            </option>
                                            {this.state.cursos.map((curso, i) => {
                                                return (
                                                    <option key={i} value={curso["sigla_curso"] + "||" + curso["periodo_curso"]}>
                                                        {curso["nombre_curso"]}
                                                    </option>
                                                );
                                            })}
                                        </Input>
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAsociarCurso}>
                                Asociar
                            </Button>
                            <Button onClick={this.handleModalAsociarCurso}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEliminarAdministrador}>
                        <ModalHeader>¿Está seguro que desea eliminar al administrador?</ModalHeader>
                        <ModalFooter>
                            <Button color="info" type="submit" onClick={this.handleEliminarAdministrador}>
                                Eliminar
                            </Button>
                            <Button onClick={this.handleModalEliminarAdministrador}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalPasswordAdministrador}>
                        <ModalHeader>¿Está seguro que desea reestablecer la contraseña del administrador?</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" type="submit" onClick={this.handlePasswordAdministrador}>
                                Reestablecer
                            </Button>
                            <Button onClick={this.handleModalPasswordAdministrador}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Administradores;
