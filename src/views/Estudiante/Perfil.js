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
import { getPerfil } from "../../database/estudiantes/getPerfil";
import { putPerfil } from "../../database/estudiantes/putPerfil";
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
            passwordsReady: false,
            nombreAlumno: "",
            carreraAlumno: "Estudiante de Medicina UDP",
            universidadAlumno: "Universidad Diego Portales",
            correoAlumno: "",
            contactoAlumno: 0,
            passwordOldAlumno: "",
            passwordAlumno: "",
            passwordConfAlumno: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderAlertPassword = this.renderAlertPassword.bind(this);
    }
    componentDidMount() {
        Promise.all([getPerfil(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    nombreAlumno: values[0].data["nombres_estudiante"] + " " + values[0].data["apellidos_estudiante"],
                    correoAlumno: values[0].data["correo_electronico_estudiante"],
                    contactoAlumno: values[0].data["telefono_celular_estudiante"],
                    queriesReady: true,
                });
            })
            .catch((err) => console.log(err));
    }

    validatePassword() {
        if (this.state.passwordOldAlumno !== "" && this.state.passwordAlumno === "" && this.state.passwordConfAlumno === "") {
            this.setState({
                passwordsReady: true,
            });
        } else if (
            this.state.passwordOldAlumno !== "" &&
            this.state.passwordAlumno !== "" &&
            this.state.passwordAlumno === this.state.passwordConfAlumno
        ) {
            this.setState({
                passwordsReady: true,
            });
        } else if (
            this.state.passwordAlumno === "" ||
            this.state.passwordConfAlumno === "" ||
            this.state.passwordAlumno !== this.state.passwordConfAlumno
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
        if (this.state.passwordAlumno !== this.state.passwordConfAlumno) {
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
            hash_contrasena_estudiante: sha256(this.state.passwordOldAlumno),
            hash_nueva_contrasena_estudiante: this.state.passwordAlumno ? sha256(this.state.passwordAlumno) : null,
            telefono_celular_estudiante: this.state.contactoAlumno,
        };
        putPerfil(cookies.get("token"), newDatos).then((resp) => {
            if (resp.meta === "OK") {
                this.AlertsHandler.generate("success", "Perfil actualizado", "");
                this.setState({
                    passwordAlumno: "",
                    passwordConfAlumno: "",
                    passwordOldAlumno: "",
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
                                        <h5 className="title">{this.state.nombreAlumno}</h5>
                                    </div>
                                    <p className="description text-center">
                                        {this.state.carreraAlumno}
                                        <br />
                                        {this.state.universidadAlumno}
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
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <label>Contraseña Actual</label>
                                                    <Input
                                                        name="passwordOldAlumno"
                                                        value={this.state.passwordOldAlumno}
                                                        onChange={this.handleChange}
                                                        placeholder="******"
                                                        type="password"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <label>Nueva Contraseña</label>
                                                    <Input
                                                        name="passwordAlumno"
                                                        value={this.state.passwordAlumno}
                                                        onChange={this.handleChange}
                                                        placeholder="******"
                                                        type="password"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col sm="12" md="4">
                                                <FormGroup>
                                                    <label>Repetir Nueva Contraseña</label>
                                                    <Input
                                                        name="passwordConfAlumno"
                                                        value={this.state.passwordConfAlumno}
                                                        onChange={this.handleChange}
                                                        placeholder="******"
                                                        type="password"
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
