import React from "react";
import { Card, CardBody, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core/";
import Localization from "../../helpers/Localization";
import { getEvaluadores } from "../../database/administradorTI/getEvaluadores";
import { postEvaluador } from "../../database/administradorTI/postEvaluador";
import { putEvaluador } from "../../database/administradorTI/putEvaluador";
import { reestablecerContraseñaEvaluador } from "../../database/administradorTI/reestablecerContraseñaEvaluador";
import { deleteEvaluador } from "../../database/administradorTI/deleteEvaluador";
import { getCursos } from "../../database/administradorTI/getCursos";
import { asociarCursoEvaluador } from "../../database/administradorTI/asociarCursoEvaluador";
import Cookies from "universal-cookie";
import { formatEvaluadores } from "../../helpers/AdministradorTI/formatEvaluadores";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import { sha256 } from "js-sha256";
import { formatCursos } from "functions/formats/estudiantes/formatCursos";

const cookies = new Cookies();

class Evaluadores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnas: [
                { title: "APELLIDOS", field: "apellidos_evaluador" },
                { title: "NOMBRES", field: "nombres_evaluador" },
                { title: "CORREO", field: "correo_electronico_evaluador" },
                { title: "RUT", field: "rut_evaluador" },
                { title: "CELULAR", field: "telefono_celular_evaluador" },
                { title: "TELÉFONO", field: "telefono_fijo_evaluador" },
            ],
            queriesReady: false,
            evaluadores: [],
            cursos: [],

            //DATOS
            nombresEvaluador: "",
            apellidosEvaluador: "",
            correoElectronicoEvaluador: "",
            contraseñaEvaluador: "",
            rutEvaluador: "",
            telefonoEvaluador: "",
            celularEvaluador: "",
            cargoEvaluador: "",
            recintoEvaluador: "",
            idEvaluador: "",
            siglaCurso: 0,
            modalEliminarEvaluador: false,
            modalAgregarEvaluador: false,
            modalEditarEvaluador: false,
            modalAsociarCurso: false,
            modalPasswordEvaluador: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAgregarEvaluador = this.handleAgregarEvaluador.bind(this);
        this.handleModalAgregarEvaluador = this.handleModalAgregarEvaluador.bind(this);
        this.handleEditarEvaluador = this.handleEditarEvaluador.bind(this);
        this.handleModalEditarEvaluador = this.handleModalEditarEvaluador.bind(this);
        this.handleAsociarCurso = this.handleAsociarCurso.bind(this);
        this.handleModalAsociarCurso = this.handleModalAsociarCurso.bind(this);
        this.handleEliminarEvaluador = this.handleEliminarEvaluador.bind(this);
        this.handleModalEliminarEvaluador = this.handleModalEliminarEvaluador.bind(this);
        this.handlePasswordEvaluador = this.handlePasswordEvaluador.bind(this);
        this.handleModalPasswordEvaluador = this.handleModalPasswordEvaluador.bind(this);
    }
    componentDidMount() {
        Promise.all([getEvaluadores(cookies.get("token")), getCursos(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    queriesReady: true,
                    evaluadores: formatEvaluadores(values[0].data),
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
    handleAgregarEvaluador(event) {
        event.preventDefault();
        var newEvaluador = {
            apellidos_evaluador: this.state.apellidosEvaluador,
            cargo_evaluador: this.state.cargoEvaluador,
            correo_electronico_evaluador: this.state.correoElectronicoEvaluador,
            hash_contrasena_evaluador: sha256(this.state.rutEvaluador),
            id_rol: 2,
            nombres_evaluador: this.state.nombresEvaluador,
            recinto_evaluador: this.state.recintoEvaluador,
            rut_evaluador: this.state.rutEvaluador,
            telefono_celular_evaluador: this.state.telefonoEvaluador,
            telefono_fijo_evaluador: this.state.celularEvaluador,
        };
        postEvaluador(cookies.get("token"), newEvaluador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Evaluador agregado con éxito");
                    this.setState(
                        {
                            apellidosEvaluador: "",
                            cargoEvaluador: "",
                            correoElectronicoEvaluador: "",
                            rutEvaluador: "",
                            nombresEvaluador: "",
                            recintoEvaluador: "",
                            telefonoEvaluador: "",
                            celularEvaluador: "",
                            modalAgregarEvaluador: !this.state.modalAgregarEvaluador,
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAgregarEvaluador() {
        this.setState({
            modalAgregarEvaluador: !this.state.modalAgregarEvaluador,
        });
    }
    handleAsociarCurso(event) {
        event.preventDefault();
        var datos = this.state.siglaCurso.split("||");
        asociarCursoEvaluador(cookies.get("token"), datos[1], datos[0], this.state.idEvaluador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Evaluador asociado con éxito");
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
                idEvaluador: rowData["id"],
            });
        }
        this.setState({
            modalAsociarCurso: !this.state.modalAsociarCurso,
        });
    }

    handleEditarEvaluador(rowData) {
        var newEvaluador = {
            apellidos_evaluador: this.state.apellidosEvaluador,
            cargo_evaluador: this.state.cargoEvaluador,
            correo_electronico_evaluador: this.state.correoElectronicoEvaluador,
            nombres_evaluador: this.state.nombresEvaluador,
            recinto_evaluador: this.state.recintoEvaluador,
            rut_evaluador: this.state.rutEvaluador,
            telefono_celular_evaluador: this.state.telefonoEvaluador,
            telefono_fijo_evaluador: this.state.celularEvaluador,
        };
        putEvaluador(cookies.get("token"), newEvaluador, this.state.idEvaluador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Curso modificado con éxito");
                    this.setState({
                        apellidosEvaluador: "",
                        cargoEvaluador: "",
                        correoElectronicoEvaluador: "",
                        rutEvaluador: "",
                        nombresEvaluador: "",
                        recintoEvaluador: "",
                        telefonoEvaluador: "",
                        celularEvaluador: "",
                        modalEditarEvaluador: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEditarEvaluador(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombresEvaluador: rowData["nombres_evaluador"],
                apellidosEvaluador: rowData["apellidos_evaluador"],
                correoElectronicoEvaluador: rowData["correo_electronico_evaluador"],
                rutEvaluador: rowData["rut_evaluador"],
                telefonoEvaluador: rowData["telefono_fijo_evaluador"],
                celularEvaluador: rowData["telefono_celular_evaluador"],
                cargoEvaluador: rowData["cargo_evaluador"],
                recintoEvaluador: rowData["recinto_evaluador"],
                idEvaluador: rowData["id"],
            });
        }

        this.setState({
            modalEditarEvaluador: !this.state.modalEditarEvaluador,
        });
    }

    handleEliminarEvaluador(event) {
        event.preventDefault();

        deleteEvaluador(cookies.get("token"), this.state.idEvaluador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Evaluador eliminado con éxito");
                    this.setState(
                        {
                            modalEliminarEvaluador: !this.state.modalEliminarEvaluador,
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEliminarEvaluador(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                idEvaluador: rowData["id"],
            });
        }
        this.setState({
            modalEliminarEvaluador: !this.state.modalEliminarEvaluador,
        });
    }
    handlePasswordEvaluador(event) {
        event.preventDefault();

        reestablecerContraseñaEvaluador(cookies.get("token"), this.state.idEvaluador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Reestablecido", "Contraseña reestablecida con éxito");
                    this.setState(
                        {
                            modalPasswordEvaluador: !this.state.modalPasswordEvaluador,
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalPasswordEvaluador(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                idEvaluador: rowData["id"],
            });
        }
        this.setState({
            modalPasswordEvaluador: !this.state.modalPasswordEvaluador,
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
                                    <Button color="primary" onClick={this.handleModalAgregarEvaluador} style={{ marginBottom: "30px" }}>
                                        Crear Evaluador <i className="fas fa-plus"></i>
                                    </Button>
                                    <MaterialTable
                                        columns={this.state.columnas}
                                        data={this.state.evaluadores}
                                        title="Información Evaluadores"
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
                                                tooltip: "Editar evaluador",
                                                onClick: (event, rowData) => this.handleModalEditarEvaluador(rowData),
                                            },
                                            {
                                                icon: "delete",
                                                tooltip: "Borrar evaluador",
                                                onClick: (event, rowData) => this.handleModalEliminarEvaluador(rowData),
                                            },
                                            {
                                                icon: "lock",
                                                tooltip: "Reestablecer contraseña",
                                                onClick: (event, rowData) => this.handleModalPasswordEvaluador(rowData),
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
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAgregarEvaluador}>
                        <ModalHeader>Crear Evaluador</ModalHeader>
                        <ModalBody>
                            <form>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Nombres Evaluador</small>
                                        <Input
                                            name="nombresEvaluador"
                                            value={this.state.nombresEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="Jose Pedro Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Apellidos Evaluador</small>
                                        <Input
                                            name="apellidosEvaluador"
                                            value={this.state.apellidosEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Correo</small>
                                        <Input
                                            name="correoElectronicoEvaluador"
                                            value={this.state.correoElectronicoEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="nombre.apellido@mail.udp.cl"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>RUT</small>
                                        <Input
                                            name="rutEvaluador"
                                            value={this.state.rutEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="123456789"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Teléfono</small>
                                        <Input
                                            name="telefonoEvaluador"
                                            value={this.state.telefonoEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="24350000"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Celular</small>
                                        <Input
                                            name="celularEvaluador"
                                            value={this.state.celularEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="96050000"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Cargo</small>
                                        <Input
                                            name="cargoEvaluador"
                                            value={this.state.cargoEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="Doctor en plataformas digitales"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Recinto</small>
                                        <Input
                                            name="recintoEvaluador"
                                            value={this.state.recintoEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="UDP"
                                        />
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAgregarEvaluador}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleModalAgregarEvaluador}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEditarEvaluador}>
                        <ModalHeader>Editar Evaluador</ModalHeader>
                        <ModalBody>
                            <form>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Nombres Evaluador</small>
                                        <Input
                                            name="nombresEvaluador"
                                            value={this.state.nombresEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="Jose Pedro Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Apellidos Evaluador</small>
                                        <Input
                                            name="apellidosEvaluador"
                                            value={this.state.apellidosEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Correo</small>
                                        <Input
                                            name="correoElectronicoEvaluador"
                                            value={this.state.correoElectronicoEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="nombre.apellido@mail.udp.cl"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>RUT</small>
                                        <Input
                                            name="rutEvaluador"
                                            value={this.state.rutEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="123456789"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Teléfono</small>
                                        <Input
                                            name="telefonoEvaluador"
                                            value={this.state.telefonoEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="24350000"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Celular</small>
                                        <Input
                                            name="celularEvaluador"
                                            value={this.state.celularEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="96050000"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Cargo</small>
                                        <Input
                                            name="cargoEvaluador"
                                            value={this.state.cargoEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="Doctor en plataformas digitales"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Recinto</small>
                                        <Input
                                            name="recintoEvaluador"
                                            value={this.state.recintoEvaluador}
                                            onChange={this.handleChange}
                                            placeholder="UDP"
                                        />
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleEditarEvaluador}>
                                Modificar
                            </Button>
                            <Button onClick={this.handleModalEditarEvaluador}>Salir</Button>
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
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEliminarEvaluador}>
                        <ModalHeader>¿Está seguro que desea eliminar al evaluador?</ModalHeader>
                        <ModalFooter>
                            <Button color="info" type="submit" onClick={this.handleEliminarEvaluador}>
                                Eliminar
                            </Button>
                            <Button onClick={this.handleModalEliminarEvaluador}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalPasswordEvaluador}>
                        <ModalHeader>¿Está seguro que desea reestablecer la contraseña del evaluador?</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" type="submit" onClick={this.handlePasswordEvaluador}>
                                Reestablecer
                            </Button>
                            <Button onClick={this.handleModalPasswordEvaluador}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Evaluadores;
