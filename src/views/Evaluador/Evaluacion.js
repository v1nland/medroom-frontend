import React from "react";
import Referencia from "../../components/Referencia/Referencia.js";
import ComentarioReferencia from "../../components/Referencia/ComentarioReferencia.js";
import { Card, CardBody, CardHeader, CardTitle, Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getPerfil } from "../../database/evaluadores/getPerfil";
import { getGrupo } from "../../database/evaluadores/getGrupo";
import { getCurso } from "../../database/evaluadores/getCurso";
import { postEvaluaciones } from "../../database/evaluadores/postEvaluaciones";
import { getPeriodos } from "../../database/periodos/getPeriodos";
import { formatGrupo } from "../../functions/formats/estudiantes/formatGrupo";
import { formatPeriodos } from "../../functions/formats/periodos/formatPeriodos";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Evaluacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            idEstudiante: "",
            nombreEvaluador: "",
            estudiantes: [],
            periodos: [],
            cursoEvaluador: "",
            grupoEvaluador: "",
            nombreEvaluacion: "",
            periodo: "",
            rotacion: "",
            fechaRotacion: "",
            entrevistaMedica: 5,
            examenFisico: 5,
            profesionalismo: 5,
            razonamientoClinico: 5,
            consejeria: 5,
            eficiencia: 5,
            competenciaClinica: 5,
            comentarioEntrevistaMedica: "",
            comentarioExamenFisico: "",
            comentarioProfesionalismo: "",
            comentarioRazonamientoClinico: "",
            comentarioConsejeria: "",
            comentarioEficiencia: "",
            comentarioCompetenciaClinica: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        Promise.all([
            getPerfil(cookies.get("token")),
            getGrupo(cookies.get("token")),
            getPeriodos(cookies.get("token")),
            getCurso(cookies.get("token")),
        ])
            .then((values) => {
                this.setState({
                    nombreEvaluador: values[0].data["nombres_evaluador"] + " " + values[0].data["apellidos_evaluador"],
                    cursoEvaluador: values[3].data["nombre_curso"],
                    grupoEvaluador: values[1].data["nombre_grupo"],
                    estudiantes: formatGrupo(values[1].data["estudiantes_grupo"]),
                    periodos: formatPeriodos(values[2].data),
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
    handleSubmit(event) {
        event.preventDefault();
        var newEvaluacion = {
            asunto_principal_consulta_evaluacion: "string",
            categoria_observador_evaluacion: "string",
            complejidad_caso_evaluacion: "string",
            entorno_clinico_evaluacion: "string",
            id_estudiante: this.state.idEstudiante,
            id_periodo: parseInt(this.state.periodo),
            nombre_evaluacion: this.state.nombreEvaluacion,
            numero_observaciones_previas_evaluacion: "string",
            observacion_calificacion_evaluacion: "string",
            paciente_evaluacion: "string",
            puntajes_evaluacion: [
                {
                    feedback_competencia: this.state.comentarioEntrevistaMedica,
                    nombre_competencia: "HABILIDAD DE ENTREVISTA MÉDICA",
                    codigo_competencia: "entrevistaMedica",
                    puntaje_competencia: parseInt(this.state.entrevistaMedica),
                },
                {
                    feedback_competencia: this.state.comentarioExamenFisico,
                    nombre_competencia: "HABILIDAD DE EXAMEN FÍSICO",
                    codigo_competencia: "examenFisico",
                    puntaje_competencia: parseInt(this.state.examenFisico),
                },
                {
                    feedback_competencia: this.state.comentarioProfesionalismo,
                    nombre_competencia: "PROFESIONALISMO/ CUALIDAD HUMANA",
                    codigo_competencia: "profesionalismo",
                    puntaje_competencia: parseInt(this.state.profesionalismo),
                },
                {
                    feedback_competencia: this.state.comentarioRazonamientoClinico,
                    nombre_competencia: "RAZONAMIENTO CLÍNICO",
                    codigo_competencia: "razonamientoClinico",
                    puntaje_competencia: parseInt(this.state.razonamientoClinico),
                },
                {
                    feedback_competencia: this.state.comentarioConsejeria,
                    nombre_competencia: "HABILIDADES DE CONSEJERÍA",
                    codigo_competencia: "consejeria",
                    puntaje_competencia: parseInt(this.state.consejeria),
                },
                {
                    feedback_competencia: this.state.comentarioEficiencia,
                    nombre_competencia: "EFICIENCIA Y ORGANIZACIÓN",
                    codigo_competencia: "eficiencia",
                    puntaje_competencia: parseInt(this.state.eficiencia),
                },
                {
                    feedback_competencia: this.state.comentarioCompetenciaClinica,
                    nombre_competencia: "COMPETENCIA CLÍNICA GENERAL",
                    codigo_competencia: "competenciaClinica",
                    puntaje_competencia: parseInt(this.state.competenciaClinica),
                },
            ],
            tiempo_utilizado_evaluacion: 0,
        };
        postEvaluaciones(cookies.get("token"), newEvaluacion).then((resp) => {
            if (resp.meta === "OK") {
                this.AlertsHandler.generate("success", "Evaluado", "Evaluación realizada con éxito");
                this.setState({
                    idEstudiante: "DEFAULT",
                    nombreEvaluacion: "",
                    periodo: "DEFAULT",
                    rotacion: "",
                    fechaRotacion: "",
                    entrevistaMedica: 5,
                    examenFisico: 5,
                    profesionalismo: 5,
                    razonamientoClinico: 5,
                    consejeria: 5,
                    eficiencia: 5,
                    competenciaClinica: 5,
                    comentarioEntrevistaMedica: "",
                    comentarioExamenFisico: "",
                    comentarioProfesionalismo: "",
                    comentarioRazonamientoClinico: "",
                    comentarioConsejeria: "",
                    comentarioEficiencia: "",
                    comentarioCompetenciaClinica: "",
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
                                                    <Label for="nombre">Nombre estudiante</Label>
                                                    <Input
                                                        type="select"
                                                        name="idEstudiante"
                                                        id="idEstudiante"
                                                        onChange={this.handleChange}
                                                        defaultValue={"DEFAULT"}
                                                        required
                                                    >
                                                        <option disabled value="DEFAULT">
                                                            -- Elija un estudiante --
                                                        </option>
                                                        {this.state.estudiantes.map((estudiante) => {
                                                            return (
                                                                <option key={estudiante["key"]} value={estudiante["id"]}>
                                                                    {estudiante["nombres_estudiante"] + " " + estudiante["apellidos_estudiante"]}{" "}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="tutor">Curso</Label>
                                                    <Input
                                                        type="text"
                                                        name="cursoEvaluador"
                                                        disabled
                                                        value={this.state.cursoEvaluador}
                                                        onChange={this.handleChange}
                                                        required
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="tutor">Grupo</Label>
                                                    <Input
                                                        type="text"
                                                        name="grupoEvaluador"
                                                        disabled
                                                        value={this.state.grupoEvaluador}
                                                        onChange={this.handleChange}
                                                        required
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="fecha">Nombre evaluación</Label>
                                                    <Input
                                                        value={this.state.nombreEvaluacion}
                                                        type="select"
                                                        name="nombreEvaluacion"
                                                        onChange={this.handleChange}
                                                        required
                                                    >
                                                        <option value={"Control 1"}>Control 1</option>
                                                        <option value={"Control 2"}>Control 2</option>
                                                        <option value={"Control 3"}>Control 3</option>
                                                        <option value={"Control 4"}>Control 4</option>
                                                        <option value={"Control 5"}>Control 5</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="rotacion">Periodo</Label>
                                                    <Input
                                                        type="select"
                                                        name="periodo"
                                                        id="periodo"
                                                        onChange={this.handleChange}
                                                        defaultValue={"DEFAULT"}
                                                    >
                                                        <option disabled value="DEFAULT">
                                                            -- Elija un periodo --
                                                        </option>
                                                        {this.state.periodos.map((periodo) => {
                                                            return (
                                                                <option key={periodo["key"]} value={periodo["id"]}>
                                                                    {periodo["nombre_periodo"]}
                                                                </option>
                                                            );
                                                        })}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="tutor">Evaluador</Label>
                                                    <Input
                                                        type="text"
                                                        name="nombreEvaluador"
                                                        disabled
                                                        value={this.state.nombreEvaluador}
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
                            <Col sm="12" md="12" lg="6">
                                <Referencia
                                    label="Habilidad de entrevista médica"
                                    name="entrevistaMedica"
                                    value={this.state.entrevistaMedica}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <ComentarioReferencia
                                    title="Comentario habilidad de entrevista médica"
                                    name="comentarioEntrevistaMedica"
                                    value={this.state.comentarioEntrevistaMedica}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Referencia
                                    label="Habilidad de examen físico"
                                    name="examenFisico"
                                    value={this.state.examenFisico}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <ComentarioReferencia
                                    title="Comentario habilidad de examen físico"
                                    name="comentarioExamenFisico"
                                    value={this.state.comentarioExamenFisico}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Referencia
                                    label="Profesionalismo/ Cualidad humana"
                                    name="profesionalismo"
                                    value={this.state.profesionalismo}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <ComentarioReferencia
                                    title="Comentario Profesionalismo/ Cualidad humana"
                                    name="comentarioProfesionalismo"
                                    value={this.state.comentarioProfesionalismo}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Referencia
                                    label="Razonamiento Clínico"
                                    name="razonamientoClinico"
                                    value={this.state.razonamientoClinico}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <ComentarioReferencia
                                    title="Comentario Razonamiento Clínico"
                                    name="comentarioRazonamientoClinico"
                                    value={this.state.comentarioRazonamientoClinico}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Referencia
                                    label="Habilidades de consejería"
                                    name="consejeria"
                                    value={this.state.consejeria}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <ComentarioReferencia
                                    title="Comentario Habilidades de consejería"
                                    name="comentarioConsejeria"
                                    value={this.state.comentarioConsejeria}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Referencia
                                    label="Eficiencia y organización"
                                    name="eficiencia"
                                    value={this.state.eficiencia}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <ComentarioReferencia
                                    title="Comentario Eficiencia y organización"
                                    name="comentarioEficiencia"
                                    value={this.state.comentarioEficiencia}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Referencia
                                    label="Competencia clínica general"
                                    name="competenciaClinica"
                                    value={this.state.competenciaClinica}
                                    onChange={this.handleChange}
                                />
                            </Col>
                            <Col sm="12" md="12" lg="6">
                                <ComentarioReferencia
                                    title="Comentario Competencia clínica general"
                                    name="comentarioCompetenciaClinica"
                                    value={this.state.comentarioCompetenciaClinica}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="6">
                                <Button className="btn-round" color="primary" type="submit">
                                    Ingresar Evaluación
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Evaluacion;
