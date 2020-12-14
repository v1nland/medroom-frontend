import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Input, Row, Col } from "reactstrap";

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreEvaluador: "Jose Pedro",
            cargoEvaluador: "Evaluador de medicina",
            universidadEvaluador: "Universidad Diego Portales",
            correoEvaluador: "jose.perez@mail.udp.cl",
            contactoEvaluador: "98123123",
            recintoEvaluador: "TEC-100",
            passwordEvaluador: "",
            passwordConfEvaluador: "",
            grupo: "",
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
                    <Col md="4">
                        <Card className="card-user">
                            <div className="image">
                                <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
                            </div>
                            <CardBody>
                                <div className="author">
                                    <img alt="..." className="avatar border-gray" src={require("assets/img/mike.jpg")} />
                                    <h5 className="title">{this.state.nombreEvaluador}</h5>
                                </div>
                                <p className="description text-center">
                                    {this.state.cargoEvaluador}
                                    <br />
                                    {this.state.universidadEvaluador}
                                    <br />
                                </p>
                            </CardBody>
                            <CardFooter>
                                <hr />
                                <div className="button-container">
                                    <Row>
                                        <Col className="ml-auto" lg="3" md="6" xs="6">
                                            <h5>
                                                12 <br />
                                                <small>Notas Calificadas</small>
                                            </h5>
                                        </Col>
                                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                2 <br />
                                                <small>Pruebas pendientes</small>
                                            </h5>
                                        </Col>
                                        <Col className="mr-auto" lg="3">
                                            <h5>
                                                4 <br />
                                                <small>Ramos inscritos</small>
                                            </h5>
                                        </Col>
                                    </Row>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col md="8">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Editar Perfil</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <label>Nombre Completo</label>
                                                <Input value={this.state.nombreEvaluador} disabled type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <label>Correo</label>
                                                <Input value={this.state.correoEvaluador} disabled type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <label>Celular</label>
                                                <Input
                                                    name="contactoEvaluador"
                                                    value={this.state.contactoEvaluador}
                                                    onChange={this.handleChange}
                                                    placeholder="98732121"
                                                    type="numeric"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <label>Recinto</label>
                                                <Input value={this.state.recintoEvaluador} disabled type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <label>Cargo</label>
                                                <Input
                                                    name="cargoEvaluador"
                                                    value={this.state.cargoEvaluador}
                                                    onChange={this.handleChange}
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <label>Nueva Contraseña</label>
                                                <Input
                                                    name="passwordEvaluador"
                                                    value={this.state.passwordEvaluador}
                                                    onChange={this.handleChange}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <label>Repetir Nueva Contraseña</label>
                                                <Input
                                                    name="passwordConfEvaluador"
                                                    value={this.state.passwordConfEvaluador}
                                                    onChange={this.handleChange}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                Actualizar datos
                                            </Button>
                                        </div>
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

export default Perfil;
