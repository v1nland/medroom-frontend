import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from "reactstrap";

class Perfil extends React.Component {
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
                    <Col md="4">
                        <Card className="card-user">
                            <div className="image">
                                <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
                            </div>
                            <CardBody>
                                <div className="author">
                                    <img alt="..." className="avatar border-gray" src={require("assets/img/mike.jpg")} />
                                    <h5 className="title">Jose Pedro</h5>
                                </div>
                                <p className="description text-center">
                                    Administrador plataforma Medroom
                                    <br />
                                    Universidad Diego Portales
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
                                                <small>Cursos inscritos</small>
                                            </h5>
                                        </Col>
                                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                            <h5>
                                                2 <br />
                                                <small>Grupos activos</small>
                                            </h5>
                                        </Col>
                                        <Col className="mr-auto" lg="3">
                                            <h5>
                                                4 <br />
                                                <small>Reportes</small>
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
                                                <Input defaultValue="Jose Perez" disabled placeholder="Nombre Completo" type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <label>Correo</label>
                                                <Input defaultValue="jose.perez@mail.udp.cl" disabled placeholder="Correo" type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <label>Celular</label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="nc-icon nc-single-02"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input defaultValue="98123123" placeholder="Celular" type="numeric" />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <label>Nueva Contraseña</label>
                                                <Input placeholder="******" type="password" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <label>Repetir Nueva Contraseña</label>
                                                <Input placeholder="******" type="password" />
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
