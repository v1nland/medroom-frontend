import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Input, Button, Table } from "reactstrap";

class CrearUsuarios extends React.Component {
    render() {
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Crear Estudiante</CardTitle>
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
                                                Crear Estudiante
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
                                <CardTitle tag="h4">Crear Evaluador</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>Nombre Completo Evaluador</small>
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
                                        <Col sm="12" md="6">
                                            <small>Recinto</small>
                                            <Input placeholder="TEC-100" />
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Cargo</small>
                                            <Input placeholder="Profesor" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>Cursos</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>CIT1000</option>
                                                <option>CIT1010</option>
                                                <option>CIT1020</option>
                                                <option>CIT1030</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="2">
                                            <Row>
                                                <div className="update ml-auto mr-auto">
                                                    <Button className="btn-round" color="success" type="submit" style={{ marginTop: "20px" }}>
                                                        Agregar Curso
                                                    </Button>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Vigencia</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>Semestre 2021-1</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="12">
                                            <Table responsive>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Sigla</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Programación</td>
                                                        <td>Programación Avanzada</td>
                                                    </tr>
                                                    <tr>
                                                        <td>CIT1000</td>
                                                        <td>CIT1010</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit" style={{ marginTop: "20px" }}>
                                                Crear Evaluador
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
                                <CardTitle tag="h4">Crear Administrador Académico</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>Nombre Completo Administrador</small>
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
                                        <Col sm="12" md="4">
                                            <small>Cursos</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>CIT1000</option>
                                                <option>CIT1010</option>
                                                <option>CIT1020</option>
                                                <option>CIT1030</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="2">
                                            <Row>
                                                <div className="update ml-auto mr-auto">
                                                    <Button className="btn-round" color="success" type="submit" style={{ marginTop: "20px" }}>
                                                        Agregar Curso
                                                    </Button>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Vigencia</small>
                                            <Input type="select" name="grupo" id="idGrupo">
                                                <option>Semestre 2021-1</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="12">
                                            <Table responsive>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Sigla</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Programación</td>
                                                        <td>Programación Avanzada</td>
                                                    </tr>
                                                    <tr>
                                                        <td>CIT1000</td>
                                                        <td>CIT1010</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit" style={{ marginTop: "20px" }}>
                                                Crear Administrador Académico
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

export default CrearUsuarios;
