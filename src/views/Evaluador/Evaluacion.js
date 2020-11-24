import React from "react";
import Referencia from "../../components/Referencia/Referencia.js";
import { Card, CardHeader, CardTitle, Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";

class Evaluacion extends React.Component {
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
                                        <Col>
                                            <FormGroup>
                                                <Label for="nombre">Nombre estudiante</Label>
                                                <Input type="select" name="select" id="nombre">
                                                    <option>Diego Martín Suárez Pinilla</option>
                                                    <option>Juan Francisco López Pérez</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="asignatura">Asignatura</Label>
                                                <Input type="select" name="select" id="asignatura">
                                                    <option>Programación</option>
                                                    <option>Programación Avanzada</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="rotacion">Rotación</Label>
                                                <Input type="text" name="select" id="rotacion" placeholder="Hola"></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="fecha">Fecha</Label>
                                                <Input type="date" name="select" id="fecha"></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="tutor">Rotación</Label>
                                                <Input type="text" name="select" id="tutor" disabled value="Jose Pedro"></Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="6">
                            <Referencia label="Habilidad de entrevista médica" name="entrevistamedica" />
                        </Col>
                        <Col sm="12" md="12" lg="6">
                            <Referencia label="Habilidad de examen físico" name="examenfisico" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="6">
                            <Referencia label="Profesionalismo/ Cualidad humana" name="profesionalismo" />
                        </Col>
                        <Col sm="12" md="12" lg="6">
                            <Referencia label="Razonamiento Clínico" name="razonamiento" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="6">
                            <Referencia label="Habilidades de consejería" name="conserjeria" />
                        </Col>
                        <Col sm="12" md="12" lg="6">
                            <Referencia label="Eficiencia y organización" name="eficiencia" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="12" md="12" lg="6">
                            <Referencia label="Competencia clínica general" name="competencia" />
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Evaluacion;
