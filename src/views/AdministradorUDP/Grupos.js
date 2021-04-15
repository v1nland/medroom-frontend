import React from "react";
import { Card, CardBody, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, ModalFooter } from "reactstrap";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core/";
import Localization from "../../helpers/Localization";
import { formatGrupos } from "../../helpers/AdministradorUDP/formatGrupos";
import { getGrupos } from "../../database/administradorUDP/getGrupos";
import { postGrupo } from "../../database/administradorUDP/postGrupo";
import { putGrupo } from "../../database/administradorUDP/putGrupo";
import { getCursos } from "../../database/administradorUDP/getCursos";
import { getEvaluadores } from "../../database/administradorUDP/getEvaluadores";
import { getEstudiantes } from "../../database/administradorUDP/getEstudiantes";
import { asociarGrupoEstudiante } from "../../database/administradorUDP/asociarGrupoEstudiante";
import { asociarGrupoEvaluador } from "../../database/administradorUDP/asociarGrupoEvaluador";
import Cookies from "universal-cookie";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
const cookies = new Cookies();

class Grupos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnas: [
                { title: "NOMBRE GRUPO", field: "nombre_grupo" },
                { title: "SIGLA GRUPO", field: "sigla_grupo" },
            ],
            queriesReady: false,
            periodos: [],
            grupos: [],
            cursos: [],
            evaluadores: [],
            estudiantes: [],
            nombreGrupo: "",
            siglaGrupo: "",
            idGrupo: 0,
            idCurso: 0,
            idEvaluador: 0,
            idEstudiante: 0,
            modalEliminarGrupo: false,
            modalAgregarGrupo: false,
            modalEditarGrupo: false,
            modalAsociarEstudiante: false,
            modalAsociarEvaluador: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAgregarGrupo = this.handleAgregarGrupo.bind(this);
        this.handleModalAgregarGrupo = this.handleModalAgregarGrupo.bind(this);
        this.handleEditarGrupo = this.handleEditarGrupo.bind(this);
        this.handleModalEditarGrupo = this.handleModalEditarGrupo.bind(this);
        this.handleAsociarEvaluador = this.handleAsociarEvaluador.bind(this);
        this.handleModalAsociarEvaluador = this.handleModalAsociarEvaluador.bind(this);
        this.handleAsociarEstudiante = this.handleAsociarEstudiante.bind(this);
        this.handleModalAsociarEstudiante = this.handleModalAsociarEstudiante.bind(this);
    }
    componentDidMount() {
        Promise.all([
            getGrupos(cookies.get("token")),
            getCursos(cookies.get("token")),
            getEvaluadores(cookies.get("token")),
            getEstudiantes(cookies.get("token")),
        ])
            .then((values) => {
                this.setState({
                    queriesReady: true,
                    grupos: formatGrupos(values[0].data),
                    cursos: values[1].data,
                    evaluadores: values[2].data,
                    estudiantes: values[3].data,
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleAgregarGrupo() {
        var newGrupo = {
            id_curso: parseInt(this.state.idCurso),
            id_evaluador: "0",
            nombre_grupo: this.state.nombreGrupo,
            sigla_grupo: this.state.siglaGrupo,
        };
        postGrupo(cookies.get("token"), newGrupo)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Nuevo grupo agregado con éxito");
                    this.setState({
                        nombreGrupo: "",
                        siglaGrupo: "",
                        modalAgregarGrupo: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAgregarGrupo(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombreGrupo: rowData["nombre_curso"],
                siglaGrupo: rowData["sigla_curso"],
                idGrupo: rowData["id"],
            });
        }
        this.setState({
            modalAgregarGrupo: !this.state.modalAgregarGrupo,
        });
    }

    handleEditarGrupo(rowData) {
        var newGrupo = {
            nombre_curso: this.state.nombreGrupo,
            sigla_curso: this.state.siglaGrupo,
            id_periodo: 1,
        };
        putGrupo(cookies.get("token"), newGrupo, this.state.idGrupo)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Grupo modificado con éxito");
                    this.setState({
                        nombreGrupo: "",
                        siglaGrupo: "",
                        modalEditarGrupo: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEditarGrupo(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombreGrupo: rowData["nombre_curso"],
                siglaGrupo: rowData["sigla_curso"],
                idGrupo: rowData["id"],
            });
        }

        this.setState({
            modalEditarGrupo: !this.state.modalEditarGrupo,
        });
    }
    handleAsociarEvaluador(rowData) {
        asociarGrupoEvaluador(cookies.get("token"), this.state.idCurso, this.state.idGrupo, this.state.idEvaluador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Grupo modificado con éxito");
                    this.setState({
                        nombreGrupo: "",
                        siglaGrupo: "",
                        modalAsociarEstudiante: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAsociarEvaluador(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombreGrupo: rowData["nombre_curso"],
                siglaGrupo: rowData["sigla_curso"],
                idCurso: rowData["id_curso"],
                idGrupo: rowData["id"],
            });
        }

        this.setState({
            modalAsociarEvaluador: !this.state.modalAsociarEvaluador,
        });
    }

    handleAsociarEstudiante(rowData) {
        asociarGrupoEstudiante(cookies.get("token"), this.state.idCurso, this.state.idGrupo, this.state.idEstudiante)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Grupo modificado con éxito");
                    this.setState({
                        nombreGrupo: "",
                        siglaGrupo: "",
                        modalAsociarEstudiante: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAsociarEstudiante(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombreGrupo: rowData["nombre_curso"],
                siglaGrupo: rowData["sigla_curso"],
                idCurso: rowData["id_curso"],
                idGrupo: rowData["id"],
            });
        }

        this.setState({
            modalAsociarEstudiante: !this.state.modalAsociarEstudiante,
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
                                    <Button color="primary" onClick={this.handleModalAgregarGrupo} style={{ marginBottom: "30px" }}>
                                        Agregar grupo <i className="fas fa-plus"></i>
                                    </Button>
                                    <MaterialTable
                                        columns={this.state.columnas}
                                        data={this.state.grupos}
                                        title="Información Grupos"
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
                                                icon: "personadd",
                                                tooltip: "Asociar estudiante",
                                                onClick: (event, rowData) => this.handleModalAsociarEstudiante(rowData),
                                            },
                                            {
                                                icon: "assignmentturnedin",
                                                tooltip: "Asociar evaluador",
                                                onClick: (event, rowData) => this.handleModalAsociarEvaluador(rowData),
                                            },
                                            {
                                                icon: "create",
                                                tooltip: "Editar curso",
                                                onClick: (event, rowData) => this.handleModalEditarGrupo(rowData),
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
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAgregarGrupo}>
                        <ModalHeader>Agregar nuevo Grupo</ModalHeader>
                        <ModalBody>
                            <form>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Curso</small>
                                        <Input type="select" name="idCurso" value={this.state.idCurso} onChange={this.handleChange} required>
                                            <option disabled value={"0"}>
                                                -- Elija un curso --
                                            </option>
                                            {this.state.cursos.map((curso) => {
                                                return (
                                                    <option key={curso["id"]} value={curso["id"]}>
                                                        {curso["nombre_curso"]}
                                                    </option>
                                                );
                                            })}
                                        </Input>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Nombre Grupo</small>
                                        <Input
                                            name="nombreGrupo"
                                            value={this.state.nombreGrupo}
                                            onChange={this.handleChange}
                                            placeholder="Grupo Médico"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Sigla Grupo</small>
                                        <Input name="siglaGrupo" value={this.state.siglaGrupo} onChange={this.handleChange} placeholder="GMED-1" />
                                    </Col>
                                </Row>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAgregarGrupo}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleModalAgregarGrupo}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEditarGrupo}>
                        <ModalHeader>Editar Grupo</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nombreGrupo" style={{ marginTop: "10px" }}>
                                    Nombre curso
                                </Label>
                                <Input type="text" name="nombreGrupo" id="nombreGrupo" value={this.state.nombreGrupo} onChange={this.handleChange} />
                                <Label for="siglaGrupo" style={{ marginTop: "10px" }}>
                                    Nombre sigla
                                </Label>
                                <Input type="text" name="siglaGrupo" id="siglaGrupo" value={this.state.siglaGrupo} onChange={this.handleChange} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleEditarGrupo}>
                                Modificar
                            </Button>
                            <Button onClick={this.handleModalEditarGrupo}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAsociarEvaluador}>
                        <ModalHeader>Asociar Evaluador</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Evaluador</small>
                                        <Input type="select" name="idEvaluador" value={this.state.idEvaluador} onChange={this.handleChange} required>
                                            <option disabled value={"0"}>
                                                -- Elija un evaluador --
                                            </option>
                                            {this.state.evaluadores.map((evaluador) => {
                                                return (
                                                    <option key={evaluador["id"]} value={evaluador["id"]}>
                                                        {evaluador["nombres_evaluador"] + " " + evaluador["apellidos_evaluador"]}
                                                    </option>
                                                );
                                            })}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAsociarEvaluador}>
                                Asociar
                            </Button>
                            <Button onClick={this.handleModalAsociarEvaluador}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAsociarEstudiante}>
                        <ModalHeader>Asociar Estudiante</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Row>
                                    <Col sm="12" md="12">
                                        <small>Estudiante</small>
                                        <Input
                                            type="select"
                                            name="idEstudiante"
                                            value={this.state.idEstudiante}
                                            onChange={this.handleChange}
                                            required
                                        >
                                            <option disabled value={"0"}>
                                                -- Elija un estudiante --
                                            </option>
                                            {this.state.estudiantes.map((estudiante) => {
                                                return (
                                                    <option key={estudiante["id"]} value={estudiante["id"]}>
                                                        {estudiante["nombres_estudiante"] + " " + estudiante["apellidos_estudiante"]}
                                                    </option>
                                                );
                                            })}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAsociarEstudiante}>
                                Asociar
                            </Button>
                            <Button onClick={this.handleModalAsociarEstudiante}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Grupos;
