import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Input, Button, Table } from "reactstrap";

class AdministrarUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                                <CardTitle tag="h4">Crear estudiante</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>Nombre Completo Estudiante</small>
                                            <Input placeholder="Jose Pedro Pérez López" />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Correo</small>
                                            <Input placeholder="nombre.apellido@mail.udp.cl" />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Celular</small>
                                            <Input placeholder="96050000" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit" style={{ marginTop: "20px" }}>
                                                Crear grupo
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Actualizar grupo</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nombre Grupo</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>Grupo 1</option>
                                                <option>Grupo 2</option>
                                                <option>Grupo 3</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Sigla Grupo</small>
                                            <Input value="GRUP10" disabled />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nuevo Nombre Grupo</small>
                                            <Input placeholder="Grupo 1" />
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Nueva Sigla Grupo</small>
                                            <Input placeholder="GRUP01" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="info" type="submit" style={{ marginTop: "20px" }}>
                                                Actualizar grupo
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Eliminar grupo</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nombre Grupo</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>Grupo 1</option>
                                                <option>Grupo 2</option>
                                                <option>Grupo 3</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Sigla Grupo</small>
                                            <Input value="GRUP10" disabled />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="danger" type="submit" style={{ marginTop: "20px" }}>
                                                Eliminar grupo
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Asociar usuarios</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nombre Grupo</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>Grupo 1</option>
                                                <option>Grupo 2</option>
                                                <option>Grupo 3</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Sigla Grupo</small>
                                            <Input value="GRUP10" disabled />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>Nombre alumno</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>Juan Francisco Lopez Perez</option>
                                                <option>Diego Martín Pinilla Suarez</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="2">
                                            <Row>
                                                <div className="update ml-auto mr-auto">
                                                    <Button className="btn-round" color="success" type="submit" style={{ marginTop: "20px" }}>
                                                        Agregar Alumno
                                                    </Button>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Nombre evaluador</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>José Lopez</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="12">
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
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit" style={{ marginTop: "20px" }}>
                                                Asociar usuarios
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdministrarUsuarios;
