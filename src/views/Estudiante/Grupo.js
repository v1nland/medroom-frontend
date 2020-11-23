import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

class Grupo extends React.Component {
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="6">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Curso</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <hr />
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="6" md="6" xs="6">
                                            <h5>
                                                Programación <br />
                                                <small>Nombre</small>
                                            </h5>
                                        </Col>
                                        <Col className="ml-auto" lg="6" md="6" xs="6">
                                            <h5>
                                                CIT1000
                                                <br />
                                                <small>Sigla</small>
                                            </h5>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6">
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
                </Row>
            </div>
        );
    }
}

export default Grupo;
