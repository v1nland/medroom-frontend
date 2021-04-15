import React from "react";
import { Link } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import {
    Card,
    CardHeader,
    CardBody,
    // CardFooter,
    CardTitle,
    Row,
    Col,
    Table,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Label,
    FormText,
    FormGroup,
} from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getCurso } from "../../database/evaluadores/getCurso";
import { getGrupo } from "../../database/evaluadores/getGrupo";
import { getEvolucionPorCompetencia } from "../../database/evaluadores/getEvolucionPorCompetencia";
import { getEvolucionPorEvaluacion } from "../../database/evaluadores/getEvolucionPorEvaluacion";
import { getEvaluacionPorEstudiante } from "../../database/evaluadores/getEvaluacionPorEstudiante";
import { postEvaluacion } from "../../database/evaluadores/postEvaluacion";
import Cookies from "universal-cookie";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import { format } from "date-fns";
import { formatCompetencias } from "../../functions/formats/evaluadores/formatCompetencias";
import { formatEvaluaciones } from "../../functions/formats/evaluadores/formatEvaluaciones";
import { evaluadorOptions, evaluacionesOptions } from "variables/charts.js";
const cookies = new Cookies();

class Curso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            modalNewEvaluacion: false,
            curso: {},
            grupos: [],
            competencias: {},
            evaluaciones: {},
            evaluacionesEstudiante: [],
            nombreEvaluacion: "",
            comentarioEvaluacion: "",
            idCurso: 0,
            idGrupo: 0,
            idEstudiante: 0,
            idEvaluacion: 0,
            activeTab: 1,
            modificarEvaluacion: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleNewEvaluacion = this.handleNewEvaluacion.bind(this);
        this.handleSubmitNewEvaluacion = this.handleSubmitNewEvaluacion.bind(this);
        this.handleEstadistica = this.handleEstadistica.bind(this);
        this.handleEditarEvaluacion = this.handleEditarEvaluacion.bind(this);
        this.handleModalEditarEvaluacion = this.handleModalEditarEvaluacion.bind(this);
        this.handleIdEvaluacion = this.handleIdEvaluacion.bind(this);
    }
    componentDidMount() {
        Promise.all([
            getCurso(cookies.get("token"), this.props.match.params.idCurso),
            getGrupo(cookies.get("token"), this.props.match.params.idCurso),
        ])
            .then((values) => {
                this.setState(
                    {
                        curso: values[0].data,
                        grupos: values[1].data,
                        activeTab: values[1].data[0]["id"] ?? 1,
                        idCurso: values[0].data["id"],
                        idGrupo: values[1].data[0]["id"],
                        queriesReady: true,
                    },
                    () => this.handleEstadistica(this.state.idGrupo)
                );
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleIdEvaluacion(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        var idEvaluacion = event.target.value;
        this.setState((prevState) => ({
            modificarEvaluacion: {
                // object that we want to update
                ...prevState.modificarEvaluacion, // keep all other key-value pairs
                idEvaluacion: idEvaluacion, // update the value of specific key
            },
        }));
    }
    handleNewEvaluacion(event) {
        this.setState({
            modalNewEvaluacion: !this.state.modalNewEvaluacion,
        });
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.handleEstadistica(tab);
            this.setState({
                activeTab: tab,
            });
        }
    }
    handleSubmitNewEvaluacion() {
        var newEvaluacion = {
            nombre_evaluacion: this.state.nombreEvaluacion,
        };
        postEvaluacion(cookies.get("token"), newEvaluacion, parseInt(this.state.idCurso), parseInt(this.state.idGrupo))
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Nueva evaluación agregada con éxito");
                    this.setState({
                        idCurso: 0,
                        idGrupo: 0,
                        modalNewEvaluacion: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleEstadistica(idGrupo) {
        Promise.all([
            getEvolucionPorCompetencia(cookies.get("token"), this.props.match.params.idCurso, idGrupo),
            getEvolucionPorEvaluacion(cookies.get("token"), this.props.match.params.idCurso, idGrupo),
        ])
            .then((values) => {
                this.setState({
                    competencias: formatCompetencias(values[0].data),
                    evaluaciones: formatEvaluaciones(values[1].data),
                });
            })
            .catch((err) => console.log(err));
    }
    handleEditarEvaluacion() {
        console.log(this.props.match.params.idCurso, this.state.idGrupo, this.state.idEstudiante, this.state.idEvaluacion);
    }
    handleModalEditarEvaluacion(idEstudiante, idGrupo, nombreGrupo, nombreEstudiante) {
        if (!this.state.modalEditarEvaluacion) {
            Promise.all([getEvaluacionPorEstudiante(cookies.get("token"), this.props.match.params.idCurso, idGrupo, idEstudiante)])
                .then((values) => {
                    var newModificarEvaluacion = {
                        pathname: "/portal/evaluador/modificar/evaluacion",
                        nombreEstudiante: nombreEstudiante,
                        nombreCurso: this.state.curso["nombre_curso"],
                        nombreGrupo: nombreGrupo,
                        idCurso: this.props.match.params.idCurso,
                        idGrupo: idGrupo,
                        idEstudiante: idEstudiante,
                        idEvaluacion: 0,
                    };
                    this.setState({
                        evaluacionesEstudiante: values[0].data,
                        modificarEvaluacion: newModificarEvaluacion,
                    });
                })
                .catch((err) => console.log(err));
        }
        this.setState({
            modalEditarEvaluacion: !this.state.modalEditarEvaluacion,
        });
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalNewEvaluacion}>
                        <ModalHeader>Agregar nueva evaluación</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="idGrupo">Grupo</Label>
                                <Input type="select" name="idGrupo" value={this.state.idGrupo} onChange={this.handleChange} required>
                                    <option disabled value={0}>
                                        -- Elija un grupo --
                                    </option>
                                    {this.state.grupos.map((grupo) => {
                                        return (
                                            <option key={grupo["id"]} value={grupo["id"]}>
                                                {grupo["nombre_grupo"]}
                                            </option>
                                        );
                                    })}
                                </Input>
                                <Label for="nombreEvaluacion" style={{ marginTop: "10px" }}>
                                    Nombre nueva evaluación
                                </Label>
                                <Input
                                    type="text"
                                    name="nombreEvaluacion"
                                    id="nombreEvaluacion"
                                    placeholder="CONTROL 1"
                                    onChange={this.handleChange}
                                />
                                <FormText color="muted">Se recomienda mantener consistencia en los nombres de las evaluaciones.</FormText>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleSubmitNewEvaluacion}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleNewEvaluacion}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">{this.state.curso["nombre_curso"]}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Button color="primary" onClick={this.handleNewEvaluacion}>
                                        Agregar evaluación <i className="fas fa-plus"></i>
                                    </Button>
                                    <Card>
                                        <CardHeader>
                                            <Nav pills>
                                                {this.state.grupos.map((grupo) => {
                                                    return (
                                                        <NavItem key={grupo["id"]}>
                                                            <NavLink
                                                                className={this.state.activeTab === grupo["id"] ? "active" : ""}
                                                                onClick={() => {
                                                                    this.toggle(grupo["id"]);
                                                                }}
                                                            >
                                                                {grupo["nombre_grupo"]}
                                                            </NavLink>
                                                        </NavItem>
                                                    );
                                                })}
                                            </Nav>
                                        </CardHeader>
                                        <CardBody>
                                            <TabContent activeTab={this.state.activeTab} className="text-center">
                                                {this.state.grupos.map((grupo) => {
                                                    if (grupo["sigla_grupo"] === "SG")
                                                        return (
                                                            <TabPane tabId={grupo["id"]} key={grupo["id"]}>
                                                                <Table responsive bordered>
                                                                    <thead className="text-primary">
                                                                        <tr>
                                                                            <th>Apellidos</th>
                                                                            <th>Nombres</th>
                                                                            <th>Correo</th>
                                                                            <th>Número</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {grupo["estudiantes_grupo"].map((estudiante) => {
                                                                            return (
                                                                                <tr key={estudiante["id"]}>
                                                                                    <td>{estudiante["apellidos_estudiante"]}</td>
                                                                                    <td>{estudiante["nombres_estudiante"]}</td>
                                                                                    <td>{estudiante["correo_electronico_estudiante"]}</td>
                                                                                    <td>{estudiante["telefono_celular_estudiante"]}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                            </TabPane>
                                                        );
                                                    else
                                                        return (
                                                            <TabPane tabId={grupo["id"]} key={grupo["id"]}>
                                                                <Table responsive bordered>
                                                                    <thead className="text-primary">
                                                                        <tr>
                                                                            <th></th>
                                                                            <th>Apellidos</th>
                                                                            <th>Nombres</th>
                                                                            <th>Correo</th>
                                                                            <th>Número</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {grupo["estudiantes_grupo"].map((estudiante) => {
                                                                            return (
                                                                                <tr key={estudiante["id"]}>
                                                                                    <td>
                                                                                        <Button
                                                                                            onClick={() =>
                                                                                                this.handleModalEditarEvaluacion(
                                                                                                    estudiante["id"],
                                                                                                    grupo["id"],
                                                                                                    grupo["nombre_grupo"],
                                                                                                    `${estudiante["nombres_estudiante"]} ${estudiante["apellidos_estudiante"]}`
                                                                                                )
                                                                                            }
                                                                                            style={{ width: "40%" }}
                                                                                        >
                                                                                            <i className="fas fa-pen"></i>
                                                                                        </Button>
                                                                                    </td>
                                                                                    <td>{estudiante["apellidos_estudiante"]}</td>
                                                                                    <td>{estudiante["nombres_estudiante"]}</td>
                                                                                    <td>{estudiante["correo_electronico_estudiante"]}</td>
                                                                                    <td>{estudiante["telefono_celular_estudiante"]}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                                <hr />
                                                                <h4 style={{ textAlign: "left" }}>Evaluaciones</h4>
                                                                <Table responsive striped hover bordered>
                                                                    <thead className="text-primary">
                                                                        <tr>
                                                                            <th>Nombre Evaluación</th>
                                                                            <th>Fecha de Evaluación</th>
                                                                            <th>Hora de Evaluación</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody key={grupo["id"]}>
                                                                        {grupo["evaluaciones_grupo"].map((evaluacion) => {
                                                                            var fecha = new Date(evaluacion["created_at"]);
                                                                            return (
                                                                                <tr key={evaluacion["id"]}>
                                                                                    <td>{evaluacion["nombre_evaluacion"]}</td>
                                                                                    <td>{format(fecha, "dd-MM-yyyy")}</td>
                                                                                    <td>{format(fecha, "hh:mm:ss")}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                                <hr />
                                                                <h4 style={{ textAlign: "left" }}>Evaluadores del grupo</h4>
                                                                <Table responsive striped hover bordered>
                                                                    <thead className="text-primary">
                                                                        <tr>
                                                                            <th>Apellidos Evaluador</th>
                                                                            <th>Nombres Evaluador</th>
                                                                            <th>Cargo Evaluador</th>
                                                                            <th>Recinto Evaluador</th>
                                                                            <th>Correo Evaluador</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody key={grupo["id"]}>
                                                                        {grupo["evaluadores_grupo"].map((evaluador) => {
                                                                            return (
                                                                                <tr key={evaluador["id"]}>
                                                                                    <td>{evaluador["apellidos_evaluador"]}</td>
                                                                                    <td>{evaluador["nombres_evaluador"]}</td>
                                                                                    <td>{evaluador["cargo_evaluador"]}</td>
                                                                                    <td>{evaluador["recinto_evaluador"]}</td>
                                                                                    <td>{evaluador["correo_electronico_evaluador"]}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                                <Col xl="12">
                                                                    <h5 style={{ marginTop: "40px" }}>Evolución grupal por competencia</h5>
                                                                    <Line
                                                                        data={this.state.competencias}
                                                                        options={evaluadorOptions.options}
                                                                        width={400}
                                                                        height={100}
                                                                    />
                                                                </Col>
                                                                <Col xl="12">
                                                                    <h5 style={{ marginTop: "40px" }}>Evolución grupal por evaluación</h5>
                                                                    <Bar
                                                                        data={this.state.evaluaciones}
                                                                        options={evaluacionesOptions.options}
                                                                        width={400}
                                                                        height={100}
                                                                    />
                                                                </Col>
                                                            </TabPane>
                                                        );
                                                })}
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEditarEvaluacion}>
                        <ModalHeader>Modificar Evaluación</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="idEvaluacion">Nombre Evaluación</Label>
                                <Input type="select" name="idEvaluacion" value={this.state.idEvaluacion} onChange={this.handleIdEvaluacion} required>
                                    <option disabled value={0}>
                                        -- Elija un evaluación --
                                    </option>
                                    {this.state.evaluacionesEstudiante.map((evaluacion) => {
                                        return (
                                            <option key={evaluacion["id"]} value={evaluacion["id"]}>
                                                {evaluacion["nombre_evaluacion"]}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Link to={this.state.modificarEvaluacion}>
                                <Button disabled={this.state.idEvaluacion === 0} color="success" type="submit">
                                    Modificar
                                    {/* Modificar */}
                                </Button>
                            </Link>
                            <Button onClick={this.handleModalEditarEvaluacion}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Curso;
