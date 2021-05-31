import React from "react";
import Referencia from "../../components/Referencia/Referencia.js";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import HelpIcon from "@material-ui/icons/Help";
import { getPerfil } from "../../database/evaluadores/getPerfil";
import { getGrupo } from "../../database/evaluadores/getGrupo";
import { getCursos } from "../../database/evaluadores/getCursos";
import { postEvaluaciones } from "../../database/evaluadores/postEvaluaciones";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Evaluacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: true,
            cursoReady: false,
            grupoReady: false,
            modalInformacion: false,
            idEstudiante: 0,
            nombreEvaluador: "",
            nombreEstudiante: "",
            idPeriodo: "-- Elija un curso --",
            estudiantes: [],
            cursos: [],
            grupos: [],
            evaluaciones: [],
            cursoEvaluador: 0,
            grupoEvaluador: 0,
            idEvaluacion: "0",
            periodo: "",
            rotacion: "",
            fechaRotacion: "",
            entrevistaMedica: 5,
            examenFisico: 5,
            profesionalismo: 5,
            razonamientoClinico: 5,
            consejeria: 5,
            eficiencia: 5,
            comentarioEvaluacion: "",
            competenciaClinica: 5,
            puntajeGlobal: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleGrupos = this.handleGrupos.bind(this);
        this.handleEstudiantes = this.handleEstudiantes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInformacion = this.handleInformacion.bind(this);
    }
    componentDidMount() {
        Promise.all([getPerfil(cookies.get("token")), getCursos(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    nombreEvaluador: values[0].data["nombres_evaluador"] + " " + values[0].data["apellidos_evaluador"],
                    cursos: values[1].data,
                    queriesReady: true,
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleGrupos(event) {
        var datos = event.target.value.split("||");
        this.setState(
            {
                cursoEvaluador: datos[0],
                idPeriodo: datos[1],
            },
            () =>
                Promise.all([getGrupo(cookies.get("token"), this.state.idPeriodo, this.state.cursoEvaluador)])
                    .then((values) => {
                        this.setState({
                            grupos: values[0].data,
                            periodo: values[0].data[""],
                            cursoReady: true,
                        });
                        for (let i = 0; i < this.state.cursos.length; i++) {
                            if (this.state.cursos[i]["id"] === parseInt(this.state.cursoEvaluador)) {
                                this.setState({
                                    periodoEvaluador: this.state.cursos[i]["periodo_curso"]["nombre_periodo"],
                                    periodoId: this.state.cursos[i]["periodo_curso"]["id"],
                                });
                            }
                        }
                    })
                    .catch((err) => console.log(err))
        );
    }
    handleEstudiantes(event) {
        if (this.state.grupoReady === true) {
            this.setState({
                grupoReady: false,
            });
        }
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            () => {
                for (let i = 0; i < this.state.grupos.length; i++) {
                    if (this.state.grupos[i]["sigla_grupo"] === this.state.grupoEvaluador) {
                        this.setState({
                            estudiantes: this.state.grupos[i]["estudiantes_grupo"],
                            evaluaciones: this.state.grupos[i]["evaluaciones_grupo"],
                            grupoReady: true,
                        });
                    }
                }
            }
        );
    }
    handleInformacion() {
        this.setState({
            modalInformacion: !this.state.modalInformacion,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        var newEvaluacion = {
            observacion_calificacion_calificacion_estudiante: this.state.comentarioEvaluacion,
            valoracion_general_calificacion_estudiante: parseInt(this.state.puntajeGlobal),
            puntajes_calificacion_estudiante: [
                {
                    id_competencia: "ANAM",
                    calificacion_puntaje: parseInt(this.state.entrevistaMedica),
                },
                {
                    id_competencia: "EXFI",
                    calificacion_puntaje: parseInt(this.state.examenFisico),
                },
                {
                    id_competencia: "PROF",
                    calificacion_puntaje: parseInt(this.state.profesionalismo),
                },
                {
                    id_competencia: "JUCL",
                    calificacion_puntaje: parseInt(this.state.razonamientoClinico),
                },
                {
                    id_competencia: "HACO",
                    calificacion_puntaje: parseInt(this.state.consejeria),
                },
                {
                    id_competencia: "OREF",
                    calificacion_puntaje: parseInt(this.state.eficiencia),
                },
            ],
        };
        postEvaluaciones(
            cookies.get("token"),
            newEvaluacion,
            this.state.idPeriodo,
            this.state.cursoEvaluador,
            this.state.grupoEvaluador,
            this.state.idEstudiante,
            parseInt(this.state.idEvaluacion)
        ).then((resp) => {
            if (resp.meta === "OK") {
                this.AlertsHandler.generate("success", "Evaluado", "Evaluación realizada con éxito");
                this.setState({
                    idEstudiante: 0,
                    entrevistaMedica: 5,
                    examenFisico: 5,
                    profesionalismo: 5,
                    razonamientoClinico: 5,
                    consejeria: 5,
                    eficiencia: 5,
                    competenciaClinica: 5,
                    comentarioEvaluacion: "",
                    puntajeGlobal: 0,
                });
            } else {
                this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
            }
        });
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Evaluar Estudiante</CardTitle>
                                </CardHeader>
                            </Card>
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h6" style={{}}>
                                            Datos estudiante
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="tutor">Curso</Label>
                                                    <Input
                                                        type="select"
                                                        name="cursoEvaluador"
                                                        value={this.state.cursoEvaluador}
                                                        onChange={this.handleGrupos}
                                                        required
                                                    >
                                                        <option disabled key={0} value={0}>
                                                            -- Elija un curso --
                                                        </option>
                                                        {this.state.cursos.map((curso) => {
                                                            return (
                                                                <option
                                                                    key={curso["sigla_curso"]}
                                                                    value={curso["sigla_curso"] + "||" + curso["id_periodo"]}
                                                                >
                                                                    {curso["nombre_curso"]}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="grupoEvaluador">Grupo</Label>
                                                    <Input
                                                        type="select"
                                                        name="grupoEvaluador"
                                                        disabled={!this.state.cursoReady}
                                                        value={this.state.grupoEvaluador}
                                                        onChange={this.handleEstudiantes}
                                                        required
                                                    >
                                                        <option disabled value={0}>
                                                            -- Elija un grupo --
                                                        </option>
                                                        {this.state.grupos.map((grupo) => {
                                                            return (
                                                                <option key={grupo["sigla_grupo"]} value={grupo["sigla_grupo"]}>
                                                                    {grupo["nombre_grupo"]}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="nombre">Nombre estudiante</Label>
                                                    <Input
                                                        type="select"
                                                        name="idEstudiante"
                                                        id="idEstudiante"
                                                        value={this.state.idEstudiante}
                                                        onChange={this.handleChange}
                                                        disabled={!this.state.grupoReady}
                                                        required
                                                    >
                                                        <option disabled value={0}>
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
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="3">
                                                <FormGroup>
                                                    <Label for="fecha">Nombre evaluación</Label>
                                                    <Input
                                                        type="select"
                                                        name="idEvaluacion"
                                                        value={this.state.idEvaluacion}
                                                        onChange={this.handleChange}
                                                        disabled={!this.state.grupoReady}
                                                        required
                                                    >
                                                        <option disabled value={"0"}>
                                                            -- Elija una evaluación --
                                                        </option>
                                                        {this.state.evaluaciones.map((evaluacion) => {
                                                            return (
                                                                <option key={evaluacion["id"]} value={evaluacion["id"]}>
                                                                    {evaluacion["nombre_evaluacion"]}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="3">
                                                <FormGroup>
                                                    <Label for="rotacion">Periodo</Label>
                                                    <Input
                                                        type="text"
                                                        name="idPeriodo"
                                                        id="idPeriodo"
                                                        value={this.state.idPeriodo}
                                                        onChange={this.handleChange}
                                                        disabled={true}
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="3">
                                                <FormGroup>
                                                    <Label for="nombreEvaluador">Evaluador</Label>
                                                    <Input type="text" name="nombreEvaluador" disabled value={this.state.nombreEvaluador}></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="3">
                                                <FormGroup>
                                                    <Label for="puntajeGlobal">Puntaje Global</Label>
                                                    <Input
                                                        type="number"
                                                        name="puntajeGlobal"
                                                        value={this.state.puntajeGlobal}
                                                        onChange={this.handleChange}
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Button
                                    className="btn-round"
                                    onClick={this.handleInformacion}
                                    style={{ backgroundColor: "#F2C14E", marginBottom: "20px" }}
                                >
                                    Ayuda <HelpIcon style={{ marginBottom: "2px", marginLeft: "5px" }} />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Habilidad de entrevista médica"
                                    descripcion={`- Facilita las explicaciones del paciente- Estructurada y exhaustiva
                                    Hace preguntas adecuadas para obtener información del paciente
                                    Responde adecuadamente a expresiones claves verbales y no verbales del
                                   paciente`}
                                    name="entrevistaMedica"
                                    value={this.state.entrevistaMedica}
                                    onChange={this.handleChange}
                                    idModal="3"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Habilidad de examen físico"
                                    name="examenFisico"
                                    value={this.state.examenFisico}
                                    onChange={this.handleChange}
                                    idModal="4"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Profesionalismo"
                                    name="profesionalismo"
                                    value={this.state.profesionalismo}
                                    onChange={this.handleChange}
                                    idModal="5"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Razonamiento Clínico"
                                    name="razonamientoClinico"
                                    value={this.state.razonamientoClinico}
                                    onChange={this.handleChange}
                                    idModal="6"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Habilidades de comunicación"
                                    name="consejeria"
                                    value={this.state.consejeria}
                                    onChange={this.handleChange}
                                    idModal="7"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Eficiencia y organización"
                                    name="eficiencia"
                                    value={this.state.eficiencia}
                                    onChange={this.handleChange}
                                    idModal="8"
                                />
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Competencia clínica general / Valoración global"
                                    name="competenciaClinica"
                                    value={this.state.competenciaClinica}
                                    onChange={this.handleChange}
                                    idModal="9"
                                />
                            </Col>
                        </Row> */}
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h6" style={{}}>
                                            Feedback Descriptivo
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Input
                                            type="textarea"
                                            name="comentarioEvaluacion"
                                            value={this.state.comentarioEvaluacion}
                                            onChange={this.handleChange}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Button className="btn-round" color="primary" type="submit">
                                    Ingresar Evaluación
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalInformacion}>
                        <ModalHeader>Descriptores de las competencias</ModalHeader>
                        <ModalBody>
                            <i>
                                <b>Anamnesis</b>
                            </i>
                            <br />
                            <br />
                            <ul>
                                <li>Facilita las explicaciones del paciente</li>
                                <li>Estructurada y exhaustiva</li>
                                <li>Hace preguntas adecuadas para obtener información del paciente</li>
                                <li>Responde adecuadamente a expresiones claves verbales y no verbales del paciente</li>
                            </ul>
                            <br />
                            <i>
                                <b>Profesionalismo</b>
                            </i>
                            <br />
                            <br />
                            <ul>
                                <li>Presentación del médico</li>
                                <li>Muestra respeto y crea un clima de confianza. Empático</li>
                                <li>Se comporta de forma ética y considera los aspectos legales relevantes al caso</li>
                                <li>Atento a las necesidades del paciente en términos de confort, confidencialidad y respeto</li>
                            </ul>
                            <br />
                            <i>
                                <b>Juicio clínico</b>
                            </i>
                            <br />
                            <br />
                            <ul>
                                <li>Realiza una orientación diagnóstica adecuada con un diagnóstico diferencial</li>
                                <li>Formula un plan de manejo coherente con el diagnóstico</li>
                                <li>Hace/indica los estudios diagnósticos considerando riesgos, beneficios y costes</li>
                            </ul>
                            <br />
                            <i>
                                <b>Habilidades comunicativas</b>
                            </i>
                            <br />
                            <br />
                            <ul>
                                <li>Utiliza un lenguaje comprensible y empático para el paciente</li>
                                <li>Franco y honesto</li>
                                <li>Explora las perspectivas del paciente y la familia</li>
                                <li>Informa y consensúa el plan de manejo/tratamiento con el paciente</li>
                            </ul>
                            <br />
                            <i>
                                <b>Organización/ eficiencia</b>
                            </i>
                            <br />
                            <br />
                            <ul>
                                <li>Prioriza los problemas</li>
                                <li>Buena gestión del tiempo y los recursos</li>
                                <li>Derivaciones adecuadas</li>
                                <li>Es concreto</li>
                                <li>Recapitula y hace un resumen final</li>
                                <li>Capacidad de trabajo en equipo </li>
                            </ul>
                            <br />
                            <i>
                                <b>Valoración global</b>
                            </i>
                            <br />
                            <br />
                            <ul>
                                <li>
                                    Demuestra satisfactoriamente juicio clínico, capacidad de síntesis y de resolución, y tiene en cuenta los aspectos
                                    de eficiencia, valorando riesgos y beneficios en el plan de manejo{" "}
                                </li>
                            </ul>
                            <br />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleInformacion}>
                                Entiendo
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Evaluacion;
