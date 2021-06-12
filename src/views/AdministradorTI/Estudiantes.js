import React from "react";
import { Card, CardBody, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from "reactstrap";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core/";
import Localization from "../../helpers/Localization";
import { getEstudiantes } from "../../database/administradorTI/getEstudiantes";
import { postEstudiante } from "../../database/administradorTI/postEstudiante";
import { putEstudiante } from "../../database/administradorTI/putEstudiante";
import { reestablecerContraseñaEstudiante } from "../../database/administradorTI/reestablecerContraseñaEstudiante";
import { deleteEstudiante } from "../../database/administradorTI/deleteEstudiante";
import { getCursos } from "../../database/administradorTI/getCursos";
import { cargarEstudiantes } from "../../database/administradorTI/cargarEstudiantes";
import { asociarCursoEstudiante } from "../../database/administradorTI/asociarCursoEstudiante";
import Cookies from "universal-cookie";
import { formatEstudiantes } from "../../helpers/AdministradorTI/formatEstudiantes";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import { formatCargaEstudiantes } from "functions/formats/administradorTI/formatCargaEstudiantes";
import { formatCursos } from "functions/formats/estudiantes/formatCursos";
import CSVReader from "react-csv-reader";

const cookies = new Cookies();
const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    delimiter: ";",
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
};

class Estudiantes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnas: [
                { title: "APELLIDOS", field: "apellidos_estudiante" },
                { title: "NOMBRES", field: "nombres_estudiante" },
                { title: "CORREO", field: "correo_electronico_estudiante" },
                { title: "RUT", field: "rut_estudiante" },
                { title: "CELULAR", field: "telefono_celular_estudiante" },
                { title: "TELÉFONO", field: "telefono_fijo_estudiante" },
            ],
            queriesReady: false,
            estudiantes: [],
            cursos: [],
            cargaEstudiantes: [],
            fileCargaEstudiantes: {},

            //DATOS
            nombresEstudiante: "",
            apellidosEstudiante: "",
            correoElectronicoEstudiante: "",
            contraseñaEstudiante: "",
            rutEstudiante: "",
            telefonoEstudiante: "",
            celularEstudiante: "",
            idEstudiante: "",
            siglaCurso: 0,

            modalEliminarEstudiante: false,
            modalAgregarEstudiante: false,
            modalEditarEstudiante: false,
            modalAsociarCurso: false,
            modalPasswordEstudiante: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAgregarEstudiante = this.handleAgregarEstudiante.bind(this);
        this.handleModalAgregarEstudiante = this.handleModalAgregarEstudiante.bind(this);
        this.handleEditarEstudiante = this.handleEditarEstudiante.bind(this);
        this.handleModalEditarEstudiante = this.handleModalEditarEstudiante.bind(this);
        this.handleAsociarCurso = this.handleAsociarCurso.bind(this);
        this.handleModalAsociarCurso = this.handleModalAsociarCurso.bind(this);
        this.handleEliminarEstudiante = this.handleEliminarEstudiante.bind(this);
        this.handleModalEliminarEstudiante = this.handleModalEliminarEstudiante.bind(this);
        this.handlePasswordEstudiante = this.handlePasswordEstudiante.bind(this);
        this.handleModalPasswordEstudiante = this.handleModalPasswordEstudiante.bind(this);
        this.handleCargaMasiva = this.handleCargaMasiva.bind(this);
        this.handleModalCargaMasiva = this.handleModalCargaMasiva.bind(this);
        this.handleForce = this.handleForce.bind(this);
    }
    componentDidMount() {
        Promise.all([getEstudiantes(cookies.get("token")), getCursos(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    queriesReady: true,
                    estudiantes: formatEstudiantes(values[0].data),
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
    handleAgregarEstudiante(event) {
        event.preventDefault();
        var newEstudiante = {
            apellidos_estudiante: this.state.apellidosEstudiante,
            correo_electronico_estudiante: this.state.correoElectronicoEstudiante,
            id_rol: 1,
            nombres_estudiante: this.state.nombresEstudiante,
            rut_estudiante: this.state.rutEstudiante,
            telefono_celular_estudiante: this.state.celularEstudiante,
            telefono_fijo_estudiante: this.state.telefonoEstudiante,
        };
        postEstudiante(cookies.get("token"), newEstudiante)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Estudiante agregado con éxito");
                    this.setState(
                        {
                            apellidosEstudiante: "",
                            correoElectronicoEstudiante: "",
                            nombresEstudiante: "",
                            rutEstudiante: "",
                            celularEstudiante: "",
                            telefonoEstudiante: "",
                            modalAgregarEstudiante: !this.state.modalAgregarEstudiante,
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAgregarEstudiante() {
        this.setState({
            modalAgregarEstudiante: !this.state.modalAgregarEstudiante,
        });
    }

    handleAsociarCurso(event) {
        event.preventDefault();
        if (this.state.siglaCurso === "" || this.state.siglaCurso === null || this.state.siglaCurso === 0) {
            this.AlertsHandler.generate("danger", "Error", "Seleccione un curso");
            return;
        }
        var datos = this.state.siglaCurso.split("||");
        asociarCursoEstudiante(cookies.get("token"), datos[1], datos[0], this.state.idEstudiante)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Estudiante asociado con éxito");
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
                idEstudiante: rowData["id"],
            });
        }
        this.setState({
            modalAsociarCurso: !this.state.modalAsociarCurso,
        });
    }
    handleForce(data, fileInfo) {
        this.setState({
            cargaEstudiantes: data,
            fileCargaEstudiantes: fileInfo,
        });
    }

    handleEditarEstudiante(event) {
        event.preventDefault();
        var newEstudiante = {
            apellidos_estudiante: this.state.apellidosEstudiante,
            correo_electronico_estudiante: this.state.correoElectronicoEstudiante,
            id_rol: 1,
            nombres_estudiante: this.state.nombresEstudiante,
            rut_estudiante: this.state.rutEstudiante,
            telefono_celular_estudiante: this.state.celularEstudiante,
            telefono_fijo_estudiante: this.state.telefonoEstudiante,
        };
        putEstudiante(cookies.get("token"), newEstudiante, this.state.idEstudiante)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Curso modificado con éxito");
                    this.setState({
                        nombreCurso: "",
                        siglaCurso: "",
                        modalEditarEstudiante: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEditarEstudiante(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombresEstudiante: rowData["nombres_estudiante"],
                apellidosEstudiante: rowData["apellidos_estudiante"],
                correoElectronicoEstudiante: rowData["correo_electronico_estudiante"],
                rutEstudiante: rowData["rut_estudiante"],
                telefonoEstudiante: rowData["telefono_fijo_estudiante"],
                celularEstudiante: rowData["telefono_celular_estudiante"],
                idEstudiante: rowData["id"],
            });
        }

        this.setState({
            modalEditarEstudiante: !this.state.modalEditarEstudiante,
        });
    }
    handleEliminarEstudiante(event) {
        event.preventDefault();
        deleteEstudiante(cookies.get("token"), this.state.idEstudiante)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Eliminado", "Estudiante eliminado con éxito");
                    this.setState({
                        modalEliminarEstudiante: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEliminarEstudiante(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                idEstudiante: rowData["id"],
            });
        }
        this.setState({
            modalEliminarEstudiante: !this.state.modalEliminarEstudiante,
        });
    }
    handlePasswordEstudiante(event) {
        event.preventDefault();
        reestablecerContraseñaEstudiante(cookies.get("token"), this.state.idEstudiante)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Reestablecido", "Contraseña reestablecida con éxito");
                    this.setState({
                        modalPasswordEstudiante: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalPasswordEstudiante(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                idEstudiante: rowData["id"],
            });
        }
        this.setState({
            modalPasswordEstudiante: !this.state.modalPasswordEstudiante,
        });
    }
    handleCargaMasiva() {
        var estudiantes = formatCargaEstudiantes(this.state.cargaEstudiantes);

        cargarEstudiantes(cookies.get("token"), estudiantes)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Estudiantes agregados con éxito");
                    this.setState({
                        modalCargaMasiva: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalCargaMasiva(rowData) {
        this.setState({
            modalCargaMasiva: !this.state.modalCargaMasiva,
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
                                    <Button
                                        color="primary"
                                        onClick={this.handleModalAgregarEstudiante}
                                        style={{ marginBottom: "30px", marginRight: "10px" }}
                                    >
                                        Crear Estudiante <i className="fas fa-plus"></i>
                                    </Button>
                                    <Button color="success" onClick={this.handleModalCargaMasiva} style={{ marginBottom: "30px" }}>
                                        Carga masiva <i className="fas fa-plus"></i>
                                    </Button>
                                    <MaterialTable
                                        columns={this.state.columnas}
                                        data={this.state.estudiantes}
                                        title="Información Estudiantes"
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
                                                tooltip: "Editar estudiante",
                                                onClick: (event, rowData) => this.handleModalEditarEstudiante(rowData),
                                            },
                                            {
                                                icon: "delete",
                                                tooltip: "Borrar estudiante",
                                                onClick: (event, rowData) => this.handleModalEliminarEstudiante(rowData),
                                            },
                                            {
                                                icon: "lock",
                                                tooltip: "Reestablecer contraseña",
                                                onClick: (event, rowData) => this.handleModalPasswordEstudiante(rowData),
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
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAgregarEstudiante}>
                        <ModalHeader>Crear Estudiante</ModalHeader>
                        <ModalBody>
                            <form>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Nombres Estudiante</small>
                                        <Input
                                            name="nombresEstudiante"
                                            value={this.state.nombresEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="Jose Pedro Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Apellidos Estudiante</small>
                                        <Input
                                            name="apellidosEstudiante"
                                            value={this.state.apellidosEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Correo</small>
                                        <Input
                                            name="correoElectronicoEstudiante"
                                            value={this.state.correoElectronicoEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="nombre.apellido@mail.udp.cl"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>RUT</small>
                                        <Input
                                            name="rutEstudiante"
                                            value={this.state.rutEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="123456789"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Teléfono</small>
                                        <Input
                                            name="telefonoEstudiante"
                                            value={this.state.telefonoEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="24350000"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Celular</small>
                                        <Input
                                            name="celularEstudiante"
                                            value={this.state.celularEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="96050000"
                                        />
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAgregarEstudiante}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleModalAgregarEstudiante}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEditarEstudiante}>
                        <ModalHeader>Editar Estudiante</ModalHeader>
                        <ModalBody>
                            <form>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Nombres Estudiante</small>
                                        <Input
                                            name="nombresEstudiante"
                                            value={this.state.nombresEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="Jose Pedro Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Apellidos Estudiante</small>
                                        <Input
                                            name="apellidosEstudiante"
                                            value={this.state.apellidosEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="Pérez López"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Correo</small>
                                        <Input
                                            name="correoElectronicoEstudiante"
                                            value={this.state.correoElectronicoEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="nombre.apellido@mail.udp.cl"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>RUT</small>
                                        <Input
                                            name="rutEstudiante"
                                            value={this.state.rutEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="123456789"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Teléfono</small>
                                        <Input
                                            name="telefonoEstudiante"
                                            value={this.state.telefonoEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="24350000"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Celular</small>
                                        <Input
                                            name="celularEstudiante"
                                            value={this.state.celularEstudiante}
                                            onChange={this.handleChange}
                                            placeholder="96050000"
                                        />
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleEditarEstudiante}>
                                Modificar
                            </Button>
                            <Button onClick={this.handleModalEditarEstudiante}>Salir</Button>
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
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEliminarEstudiante}>
                        <ModalHeader>¿Está seguro que desea eliminar al estudiante?</ModalHeader>
                        <ModalFooter>
                            <Button color="info" type="submit" onClick={this.handleEliminarEstudiante}>
                                Eliminar
                            </Button>
                            <Button onClick={this.handleModalEliminarEstudiante}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalPasswordEstudiante}>
                        <ModalHeader>¿Está seguro que desea reestablecer la contraseña del estudiante?</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" type="submit" onClick={this.handlePasswordEstudiante}>
                                Reestablecer
                            </Button>
                            <Button onClick={this.handleModalPasswordEstudiante}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalCargaMasiva}>
                        <ModalHeader>Carga masiva</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <CSVReader
                                    cssClass="csv-reader-input"
                                    label="Selecciona un archivo .csv"
                                    onFileLoaded={(data, fileInfo) => this.handleForce(data, fileInfo)}
                                    parserOptions={papaparseOptions}
                                    inputId="cargaEstudiantes"
                                    inputName="cargaEstudiantes"
                                    inputStyle={{ color: "red" }}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleCargaMasiva}>
                                Cargar
                            </Button>
                            <Button onClick={this.handleModalCargaMasiva}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Estudiantes;
