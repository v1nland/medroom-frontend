import React from "react";
import Referencia from "../../components/Referencia/Referencia.js";
import { Card, CardBody, CardHeader, CardTitle, Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
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
            idEstudiante: 0,
            nombreEvaluador: "",
            nombreEstudiante: "",
            idPeriodo: 0,
            periodoEvaluador: "--- Elija un curso ---",
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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleGrupos = this.handleGrupos.bind(this);
        this.handleEstudiantes = this.handleEstudiantes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            () =>
                Promise.all([getGrupo(cookies.get("token"), this.state.cursoEvaluador)])
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
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            () => {
                for (let i = 0; i < this.state.grupos.length; i++) {
                    if (this.state.grupos[i]["id"] === parseInt(this.state.grupoEvaluador)) {
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
    handleSubmit(event) {
        event.preventDefault();
        var newEvaluacion = {
            asunto_principal_consulta_calificacion_estudiante: "string",
            categoria_observador_calificacion_estudiante: "string",
            complejidad_caso_calificacion_estudiante: "string",
            entorno_clinico_calificacion_estudiante: "string",
            id_periodo: parseInt(this.state.periodoId),
            // id_estudiante: this.state.idEstudiante,
            nombre_calificacion_estudiante: "string",
            numero_observaciones_previas_calificacion_estudiante: "string",
            observacion_calificacion_calificacion_estudiante: this.state.comentarioEvaluacion,
            paciente_calificacion_estudiante: "string",
            puntajes_calificacion_estudiante: [
                {
                    feedback_puntaje: "string",
                    id_competencia: "ANAM",
                    calificacion_puntaje: parseInt(this.state.entrevistaMedica),
                },
                {
                    feedback_puntaje: "string",
                    id_competencia: "EXFI",
                    calificacion_puntaje: parseInt(this.state.examenFisico),
                },
                {
                    feedback_puntaje: "string",
                    id_competencia: "PROF",
                    calificacion_puntaje: parseInt(this.state.profesionalismo),
                },
                {
                    feedback_puntaje: "string",
                    id_competencia: "JUCL",
                    calificacion_puntaje: parseInt(this.state.razonamientoClinico),
                },
                {
                    feedback_puntaje: "string",
                    id_competencia: "HACO",
                    calificacion_puntaje: parseInt(this.state.consejeria),
                },
                {
                    feedback_puntaje: "string",
                    id_competencia: "OREF",
                    calificacion_puntaje: parseInt(this.state.eficiencia),
                },
                {
                    feedback_puntaje: "string",
                    id_competencia: "VAGL",
                    calificacion_puntaje: parseInt(this.state.competenciaClinica),
                },
            ],
            tiempo_utilizado_calificacion_estudiante: 0,
        };
        postEvaluaciones(
            cookies.get("token"),
            newEvaluacion,
            parseInt(this.state.cursoEvaluador),
            parseInt(this.state.grupoEvaluador),
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
                                                                <option key={curso["id"]} value={curso["id"]}>
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
                                                                <option key={grupo["id"]} value={grupo["id"]}>
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
                                            <Col sm="12" md="4">
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
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="rotacion">Periodo</Label>
                                                    <Input
                                                        type="text"
                                                        name="periodoEvaluador"
                                                        id="periodoEvaluador"
                                                        value={this.state.periodoEvaluador}
                                                        onChange={this.handleChange}
                                                        disabled={true}
                                                    ></Input>
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <Label for="tutor">Evaluador</Label>
                                                    <Input type="text" name="nombreEvaluador" disabled value={this.state.nombreEvaluador}></Input>
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
                                    name="entrevistaMedica"
                                    value={this.state.entrevistaMedica}
                                    onChange={this.handleChange}
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
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Profesionalismo/ Cualidad humana"
                                    name="profesionalismo"
                                    value={this.state.profesionalismo}
                                    onChange={this.handleChange}
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
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Habilidades de consejería"
                                    name="consejeria"
                                    value={this.state.consejeria}
                                    onChange={this.handleChange}
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
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md="12" lg="12">
                                <Referencia
                                    label="Competencia clínica general"
                                    name="competenciaClinica"
                                    value={this.state.competenciaClinica}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h6" style={{}}>
                                            Comentarios
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

export default Evaluacion;
