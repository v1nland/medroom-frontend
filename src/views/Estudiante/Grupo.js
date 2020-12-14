import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";

class Grupo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreEvaluador: "Juan Lopez",
            cargoEvaluador: "Doctorado en Medicina",
            universidadEvaluador: "Universidad Diego Portales",
            nombreCurso: "Programación",
            siglaCurso: "CIT1000",
            grupo: [],
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
                                    <h5 className="title">Profes@r {this.state.nombreEvaluador}</h5>
                                </div>
                                <p className="description text-center">
                                    {this.state.cargoEvaluador}
                                    <br />
                                    {this.state.universidadEvaluador}
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
                                            <h2>{this.state.nombreCurso}</h2>
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
                                            <h2>{this.state.siglaCurso}</h2>
                                        </Col>
                                    </Row>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Mi grupo</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Apellido Paterno</th>
                                            <th>Apellido Materno</th>
                                            <th>Nombres</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>López</td>
                                            <td>Pérez</td>
                                            <td>Juan Francisco</td>
                                        </tr>
                                        <tr>
                                            <td>Suárez</td>
                                            <td>Pinilla</td>
                                            <td>Diego Martín</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Grupo;
