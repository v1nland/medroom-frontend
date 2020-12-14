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
        this.state = {
            nombreAlumno: "Jose Pedro",
            carreraAlumno: "Estudiante de medicina",
            universidadAlumno: "Universidad Diego Portales",
            correoAlumno: "jose.perez@mail.udp.cl",
            contactoAlumno: 98712313,
            passwordAlumno: "",
            passwordConfAlumno: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        Promise.all([])
            .then((values) => {})
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            console.log(event.target.value)
        );
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
                                    <h5 className="title">{this.state.nombreAlumno}</h5>
                                </div>
                                <p className="description text-center">
                                    {this.state.carreraAlumno}
                                    <br />
                                    {this.state.universidadAlumno}
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
                    <Col sm="12" md="8">
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
                                                <Input value={this.state.nombreAlumno} disabled type="text" />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="4">
                                            <FormGroup>
                                                <label>Correo</label>
                                                <Input value={this.state.correoAlumno} disabled type="text" />
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
                                                    <Input
                                                        name="contactoAlumno"
                                                        value={this.state.contactoAlumno}
                                                        onChange={this.handleChange}
                                                        type="numeric"
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <FormGroup>
                                                <label>Nueva Contraseña</label>
                                                <Input
                                                    name="contactoAlumno"
                                                    value={this.state.passwordAlumno}
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
                                                    name="contactoAlumno"
                                                    value={this.state.passwordConfAlumno}
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
