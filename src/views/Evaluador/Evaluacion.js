import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Label, Form, Input, Row, Col } from "reactstrap";

class Evaluacion extends React.Component {
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Evaluar Estudiante</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col className="pr-1" md="9">
                                            <h6>
                                                <label> Habilidad de entrevista médica</label> <br />
                                            </h6>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica1" value={1} />1
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica2" value={2} />2
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica3" value={3} />3
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica4" value={4} />4
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica5" value={5} defaultChecked />5
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica6" value={6} />6
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica7" value={7} />7
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica8" value={8} />8
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                            <div className="form-check-radio form-check-inline">
                                                <Label className="form-check-label">
                                                    <Input type="radio" name="habilidadmedica" id="habilidadmedica9" value={9} />9
                                                    <span className="form-check-sign"></span>
                                                </Label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Evaluacion;
