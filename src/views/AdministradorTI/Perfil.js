import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
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
import { getPerfil } from "../../database/administradorTI/getPerfil";
import Cookies from "universal-cookie";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
// import { sha256 } from "js-sha256";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { sha256 } from "js-sha256";
import { putPerfil } from "../../database/administradorTI/putPerfil";

const cookies = new Cookies();

class Perfil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            passwordsReady: false,
            nombreAdministrador: "",
            correoAdministrador: "",
            contactoAdministrador: "",
            rolAdministrador: "",
            passwordOldAdministrador: "",
            passwordAdministrador: "",
            passwordConfAdministrador: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderAlertPassword = this.renderAlertPassword.bind(this);
    }
    componentDidMount() {
        Promise.all([getPerfil(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    nombreAdministrador: values[0].data["nombres_administrador_ti"] + " " + values[0].data["apellidos_administrador_ti"],
                    correoAdministrador: values[0].data["correo_electronico_administrador_ti"],
                    contactoAdministrador: values[0].data["telefono_celular_administrador_ti"],
                    rolAdministrador: values[0].data["rol_administrador_ti"]["nombre_rol"],
                    queriesReady: true,
                });
            })
            .catch((err) => console.log(err));
    }
    validatePassword() {
        if (this.state.passwordOldAdministrador !== "" && this.state.passwordAdministrador === "" && this.state.passwordConfAdministrador === "") {
            this.setState({
                passwordsReady: true,
            });
        } else if (
            this.state.passwordOldAdministrador !== "" &&
            this.state.passwordAdministrador !== "" &&
            this.state.passwordAdministrador === this.state.passwordConfAdministrador
        ) {
            this.setState({
                passwordsReady: true,
            });
        } else if (
            this.state.passwordAdministrador === "" ||
            this.state.passwordConfAdministrador === "" ||
            this.state.passwordAdministrador !== this.state.passwordConfAdministrador
        ) {
            this.setState({
                passwordsReady: false,
            });
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            this.validatePassword
        );
    }

    renderAlertPassword() {
        if (this.state.passwordAdministrador !== this.state.passwordConfAdministrador) {
            return (
                <div>
                    <small style={{ color: "red" }}>Contraseñas no coinciden</small>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        var newDatos = {
            hash_contrasena_administrador_ti: sha256(this.state.passwordOldAdministrador),
            hash_nueva_contrasena_administrador_ti: sha256(this.state.passwordAdministrador),
            telefono_celular_administrador_ti: this.state.contactoAdministrador,
        };
        putPerfil(cookies.get("token"), newDatos).then((resp) => {
            if (resp.meta === "OK") {
                this.AlertsHandler.generate("success", "Perfil actualizado", "");
                this.setState({
                    passwordAdministrador: "",
                    passwordConfAdministrador: "",
                    passwordOldAdministrador: "",
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
                                        <h5 className="title">{this.state.nombreAdministrador}</h5>
                                    </div>
                                    <p className="description text-center">
                                        {this.state.rolAdministrador}
                                        <br />
                                        Universidad Diego Portales
                                        <br />
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" md="8">
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
                                                    <Input value={this.state.nombreAdministrador} disabled type="text" />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <label>Correo</label>
                                                    <Input value={this.state.correoAdministrador} disabled type="text" />
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
                                                            name="contactoAdministrador"
                                                            value={this.state.contactoAdministrador}
                                                            onChange={this.handleChange}
                                                            type="numeric"
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <label>Contraseña Actual</label>
                                                    <Input
                                                        name="passwordOldAdministrador"
                                                        value={this.state.passwordOldAdministrador}
                                                        onChange={this.handleChange}
                                                        placeholder="******"
                                                        type="password"
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <label>Nueva Contraseña</label>
                                                    <Input
                                                        name="passwordAdministrador"
                                                        value={this.state.passwordAdministrador}
                                                        onChange={this.handleChange}
                                                        placeholder="******"
                                                        type="password"
                                                        required
                                                    />
                                                    {this.renderAlertPassword()}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <label>Repetir Nueva Contraseña</label>
                                                    <Input
                                                        name="passwordConfAdministrador"
                                                        value={this.state.passwordConfAdministrador}
                                                        onChange={this.handleChange}
                                                        placeholder="******"
                                                        type="password"
                                                        required
                                                    />
                                                    {this.renderAlertPassword()}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="update ml-auto mr-auto">
                                                <Button className="btn-round" color="primary" type="submit" disabled={!this.state.passwordsReady}>
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
