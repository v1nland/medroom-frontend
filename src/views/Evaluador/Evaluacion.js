import React from "react";
import Referencia from "../../components/Referencia/Referencia.js";
import ComentarioReferencia from "../../components/Referencia/ComentarioReferencia.js";
import { Card, CardHeader, CardTitle, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";

class Evaluacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreEstudiante: "",
            nombreEvaluador: "Jose Pedro",
            asignatura: "",
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
    }
    componentDidMount() {
        Promise.all([])
            .then((values) => {})
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
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
                <Form>
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
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="nombre">Nombre estudiante</Label>
                                                <Input
                                                    type="select"
                                                    name="nombreEstudiante"
                                                    id="nombreEstudiante"
                                                    value={this.state.nombreEstudiante}
                                                    onChange={this.handleChange}
                                                >
                                                    <option>Diego Martín Suárez Pinilla</option>
                                                    <option>Juan Francisco López Pérez</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <Label for="asignatura">Asignatura</Label>
                                                <Input
                                                    type="select"
                                                    name="asignatura"
                                                    id="asignatura"
                                                    value={this.state.asignatura}
                                                    onChange={this.handleChange}
                                                >
                                                    <option>Programación</option>
                                                    <option>Programación Avanzada</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <Label for="rotacion">Rotación</Label>
                                                <Input
                                                    value={this.state.rotacion}
                                                    type="text"
                                                    name="rotacion"
                                                    placeholder="Horario A"
                                                    onChange={this.handleChange}
                                                ></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <Label for="fecha">Fecha de rotación</Label>
                                                <Input
                                                    value={this.state.fechaRotacion}
                                                    type="date"
                                                    name="fechaRotacion"
                                                    placeholder="Horario A"
                                                    onChange={this.handleChange}
                                                ></Input>
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
                                name="conserjeria"
                                value={this.state.conserjeria}
                                onChange={this.handleChange}
                            />
                        </Col>
                        <Col sm="12" md="12" lg="6">
                            <ComentarioReferencia
                                title="Comentario Habilidades de consejería"
                                name="comentarioConserjeria"
                                value={this.state.comentarioConserjeria}
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
                    <Row></Row>
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
                    <Row></Row>
                </Form>
            </div>
        );
    }
}

export default Evaluacion;
