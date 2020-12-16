import React from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, FormGroup, Form, Input, Row, Col } from "reactstrap";
import { getPerfil } from "../../database/evaluadores/getPerfil";
import { putPerfil } from "../../database/evaluadores/putPerfil";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import Cookies from "universal-cookie";
import { sha256 } from "js-sha256";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const cookies = new Cookies();

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            nombreEvaluador: "",
            cargoEvaluador: "",
            universidadEvaluador: "Universidad Diego Portales",
            correoEvaluador: "",
            contactoEvaluador: "",
            recintoEvaluador: "",
            passwordEvaluador: "",
            passwordConfEvaluador: "",
            grupo: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        Promise.all([getPerfil(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    nombreEvaluador: values[0].data["nombres_evaluador"] + " " + values[0].data["apellidos_evaluador"],
                    cargoEvaluador: values[0].data["cargo_evaluador"],
                    correoEvaluador: values[0].data["correo_electronico_evaluador"],
                    contactoEvaluador: values[0].data["telefono_celular_evaluador"],
                    recintoEvaluador: values[0].data["recinto_evaluador"],
                    queriesReady: true,
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        var newDatos = {
            cargo_evaluador: this.state.cargoEvaluador,
            hash_contrasena_evaluador: sha256(this.state.passwordEvaluador),
            telefono_celular_evaluador: this.state.contactoEvaluador,
        };
        putPerfil(cookies.get("token"), newDatos).then((resp) => {
            if (resp.meta === "OK") {
                this.AlertsHandler.generate("success", "Perfil actualizado", "");
                this.setState({
                    passwordEvaluador: "",
                    passwordConfEvaluador: "",
                });
            } else {
                this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
            }
        });
    }
    render() {
        if (this.state.queriesReady)
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
                                    <Form onSubmit={this.handleSubmit}>
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
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Perfil;
