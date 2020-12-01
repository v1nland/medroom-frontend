import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

class Grupo extends React.Component {
    render() {
        return (
            <div className="content">
                <Row>
                    <Col sm="12" md="6">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Evaluador</CardTitle>
                                <hr />
                            </CardHeader>
                            <div className="image">
                                <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
                            </div>
                            <CardBody>
                                <div className="author">
                                    <img alt="..." className="avatar border-gray" src={require("assets/img/mike.jpg")} />
                                    <h5 className="title">Profes@r Juan López</h5>
                                </div>
                                <p className="description text-center">
                                    Doctorado en Medicina
                                    <br />
                                    Universidad Diego Portales
                                    <br />
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="3">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Nombre Curso</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <hr />
                                <br />
                                <br />
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="12" md="12" xs="12">
                                            <h2>Programación</h2>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="12" md="3">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Siglas</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <hr />
                                <br />
                                <br />
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="12" md="12" xs="12">
                                            <h2>CIT1000</h2>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Grupo;
