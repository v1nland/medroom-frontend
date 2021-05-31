import React from "react";
import Referencia from "../../components/Referencia/Referencia.js";
import { Card, CardBody, CardHeader, CardTitle, Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
// import { getGrupo } from "../../database/evaluadores/getGrupo";
// import { postEvaluaciones } from "../../database/evaluadores/postEvaluaciones";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import Cookies from "universal-cookie";
import { getCalificacionPorEstudiante } from "database/evaluadores/getCalificacionPorEstudiante.js";
import { putEvaluacionPorEstudiante } from "database/evaluadores/putEvaluacionPorEstudiante.js";
const cookies = new Cookies();

class ModificarEvaluacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: true,
            cursoReady: false,
            grupoReady: false,
            idEstudiante: 0,
            nombreEvaluador: "",
            nombreEstudiante: "",
            idPeriodo: 0,
            periodoEvaluador: "",
            estudiantes: [],
            cursos: [],
            grupos: [],
            location: {},
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
            idPrueba: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        var location = this.props.location;
        Promise.all([
            getCalificacionPorEstudiante(
                cookies.get("token"),
                location.idPeriodo,
                location.siglaCurso,
                location.siglaGrupo,
                location.idEstudiante,
                location.idEvaluacion
            ),
        ])
            .then((values) => {
                this.setState({
                    cursoEvaluador: location.siglaCurso,
                    grupoEvaluador: location.nombreGrupo,
                    idEstudiante: location.nombreEstudiante,
                    idEvaluacion: values[0].data["evaluacion_calificacion_estudiante"]["nombre_evaluacion"],
                    periodoEvaluador: location.idPeriodo,
                    nombreEvaluador:
                        values[0].data["evaluador_calificacion_estudiante"]["nombres_evaluador"] +
                        " " +
                        values[0].data["evaluador_calificacion_estudiante"]["apellidos_evaluador"],
                    puntajeGlobal: values[0].data["valoracion_general_calificacion_estudiante"],
                    comentarioEvaluacion: values[0].data["observacion_calificacion_calificacion_estudiante"],
                    entrevistaMedica: 5,
                    examenFisico: 5,
                    profesionalismo: 5,
                    razonamientoClinico: 5,
                    consejeria: 5,
                    eficiencia: 5,
                    competenciaClinica: 5,
                    location: location,
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
                    feedback_puntaje: "string",
                    id_competencia: "OREF",
                    calificacion_puntaje: parseInt(this.state.eficiencia),
                },
            ],
        };
        putEvaluacionPorEstudiante(
            cookies.get("token"),
            this.state.location.idPeriodo,
            this.state.location.siglaCurso,
            this.state.location.siglaGrupo,
            this.state.location.idEstudiante,
            parseInt(this.state.location.idEvaluacion),
            newEvaluacion
        ).then((resp) => {
            if (resp.meta === "OK") {
                this.AlertsHandler.generate("success", "Evaluado", "Evaluación modificada con éxito");
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
                                                        type="text"
                                                        name="cursoEvaluador"
                                                        value={this.state.cursoEvaluador}
                                                        disabled
                                                        onChange={this.handleGrupos}
                                                        required
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="grupoEvaluador">Grupo</Label>
                                                    <Input
                                                        type="text"
                                                        name="grupoEvaluador"
                                                        disabled
                                                        value={this.state.grupoEvaluador}
                                                        onChange={this.handleEstudiantes}
                                                        required
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="nombre">Nombre estudiante</Label>
                                                    <Input
                                                        type="text"
                                                        name="idEstudiante"
                                                        id="idEstudiante"
                                                        value={this.state.idEstudiante}
                                                        onChange={this.handleChange}
                                                        disabled
                                                        required
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="3">
                                                <FormGroup>
                                                    <Label for="fecha">Nombre evaluación</Label>
                                                    <Input
                                                        type="text"
                                                        name="idEvaluacion"
                                                        value={this.state.idEvaluacion}
                                                        onChange={this.handleChange}
                                                        disabled
                                                        required
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="3">
                                                <FormGroup>
                                                    <Label for="rotacion">Periodo</Label>
                                                    <Input
                                                        type="text"
                                                        name="periodoEvaluador"
                                                        id="periodoEvaluador"
                                                        value={this.state.periodoEvaluador}
                                                        onChange={this.handleChange}
                                                        disabled
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
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default ModificarEvaluacion;
