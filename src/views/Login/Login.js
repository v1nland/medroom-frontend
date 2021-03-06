import React from "react";
import { Redirect } from "react-router-dom";
import BackgroundImage from "./background-login.jpg";
import { loginMedRoom } from "../../database/estudiantes/loginMedRoom";
import { loginEvaluador } from "../../database/evaluadores/loginEvaluador";
import { loginAdministradorTI } from "../../database/administradorTI/loginAdministradorTI";
import { loginAdministradorUDP } from "../../database/administradorUDP/loginAdministradorUDP";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { sha256 } from "js-sha256";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import {
    Card,
    CardBody,
    Row,
    Col,
    Input,
    Button,
    Form,
    Container,
    CardGroup,
    Label,
    FormGroup,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from "reactstrap";

const cookies = new Cookies();
var token = cookies.get("token");
var decoded = token ? jwt_decode(token) : "";

function renderTextButton(buttonClicked) {
    if (buttonClicked) {
        return (
            <div>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                &nbsp; Loading...
            </div>
        );
    } else {
        return (
            <div>
                Ingresar <i className="fas fa-sign-in-alt"></i>
            </div>
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            password: "",
            perfil: 1,
            buttonClicked: false,
            buttonDisabled: false,
            dropdownClicked: false,
            modalProblemas: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handleLogged = this.handleLogged.bind(this);
        this.renderLogged = this.renderLogged.bind(this);
        this.handleModalProblemas = this.handleModalProblemas.bind(this);
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
    handleDropdown() {
        this.setState({ dropdownClicked: !this.state.dropdownClicked });
    }
    handleButton() {
        if (this.state.user !== "" && this.state.password !== "") {
            this.setState({ buttonClicked: true });
        }
    }
    handleLogged() {
        if (cookies.get("token") != null) {
            return true;
        } else {
            return false;
        }
    }
    renderLogged() {
        if (this.state.perfil === 1) {
            return <DropdownToggle caret>Estudiante</DropdownToggle>;
        } else if (this.state.perfil === 2) {
            return <DropdownToggle caret>Evaluador</DropdownToggle>;
        } else if (this.state.perfil === 3) {
            return <DropdownToggle caret>Administrador</DropdownToggle>;
        } else if (this.state.perfil === 4) {
            return <DropdownToggle caret>Administrador TI</DropdownToggle>;
        } else {
            return <DropdownToggle caret>Seleccionar Perfil</DropdownToggle>;
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ buttonDisabled: true });
        if (parseInt(this.state.perfil) === 1) {
            loginMedRoom(this.state.user, sha256(this.state.password)).then((resp) => {
                if (resp.meta === "OK") {
                    cookies.set("token", resp.data.token, { path: "/" });
                    window.location.href = "/portal/estudiante/perfil";
                } else {
                    this.AlertsHandler.generate("danger", "Oh no 😥", "Credenciales incorrectas");
                    this.setState({ buttonClicked: false, buttonDisabled: false });
                }
            });
        } else if (parseInt(this.state.perfil) === 2) {
            loginEvaluador(this.state.user, sha256(this.state.password)).then((resp) => {
                if (resp.meta === "OK") {
                    cookies.set("token", resp.data.token, { path: "/" });
                    window.location.href = "/portal/evaluador/perfil";
                } else {
                    this.AlertsHandler.generate("danger", "Oh no 😥", "Credenciales incorrectas");
                    this.setState({ buttonClicked: false, buttonDisabled: false });
                }
            });
        } else if (parseInt(this.state.perfil) === 3) {
            loginAdministradorUDP(this.state.user, sha256(this.state.password)).then((resp) => {
                if (resp.meta === "OK") {
                    cookies.set("token", resp.data.token, { path: "/" });
                    window.location.href = "/portal/administradorUDP/perfil";
                } else {
                    this.AlertsHandler.generate("danger", "Oh no 😥", "Credenciales incorrectas");
                    this.setState({ buttonClicked: false, buttonDisabled: false });
                }
            });
        } else if (parseInt(this.state.perfil) === 4) {
            loginAdministradorTI(this.state.user, sha256(this.state.password)).then((resp) => {
                if (resp.meta === "OK") {
                    cookies.set("token", resp.data.token, { path: "/" });
                    window.location.href = "/portal/administradorTI/perfil";
                } else {
                    this.AlertsHandler.generate("danger", "Oh no 😥", "Credenciales incorrectas");
                    this.setState({ buttonClicked: false, buttonDisabled: false });
                }
            });
        } else {
            this.AlertsHandler.generate("danger", "Oh no 😥", "Error en el ingreso");
            this.setState({ buttonClicked: false, buttonDisabled: false });
        }
    };
    handleModalProblemas(rowData) {
        this.setState({
            modalProblemas: !this.state.modalProblemas,
        });
    }
    render() {
        if (!this.handleLogged())
            return (
                <div
                    className="flex-row align-items-center"
                    style={{
                        backgroundImage: `url(${BackgroundImage})`,
                        backgroundRepeat: "no-repeat",
                        height: "100vh",
                        width: "100%",
                    }}
                >
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="12" xl="8" style={{ marginTop: "100px" }}>
                                <CardGroup>
                                    <Card className="p-4">
                                        <CardBody>
                                            <Form onSubmit={this.handleSubmit}>
                                                <h1>Iniciar Sesión</h1>
                                                <FormGroup className="mb-3">
                                                    <Label for="Usuario">Correo electrónico</Label>
                                                    <Input
                                                        type="text"
                                                        name="user"
                                                        placeholder="Usuario"
                                                        value={this.state.user}
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup className="mb-4">
                                                    <Label for="Contraseña">Contraseña</Label>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Contraseña"
                                                        value={this.state.password}
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="perfil">Perfil</Label>
                                                    <Input type="select" name="perfil" id="perfil" onChange={this.handleChange}>
                                                        <option value={1}>ESTUDIANTE</option>
                                                        <option value={2}>EVALUADOR</option>
                                                        <option value={3}>ADMINISTRADOR ACADÉMICO</option>
                                                        <option value={4}>ADMINISTRADOR TI</option>
                                                    </Input>
                                                </FormGroup>
                                                {/* <ButtonGroup className="flex-wrap">
                                                    <Button
                                                        color={this.state.perfil === 1 ? "info" : "default"}
                                                        name="perfil"
                                                        value={1}
                                                        onClick={this.handleChange}
                                                    >
                                                        ESTUDIANTE
                                                    </Button>
                                                    <Button
                                                        color={this.state.perfil === 2 ? "info" : "default"}
                                                        name="perfil"
                                                        value={2}
                                                        onClick={this.handleChange}
                                                    >
                                                        EVALUADOR
                                                    </Button>
                                                    <Button
                                                        color={this.state.perfil === 3 ? "info" : "default"}
                                                        name="perfil"
                                                        value={3}
                                                        onClick={this.handleChange}
                                                    >
                                                        ADMINISTRADOR
                                                    </Button>
                                                    <Button
                                                        color={this.state.perfil === 4 ? "info" : "default"}
                                                        name="perfil"
                                                        value={4}
                                                        onClick={this.handleChange}
                                                    >
                                                        ADMINISTRADOR TI
                                                    </Button>
                                                </ButtonGroup> */}
                                                <Row>
                                                    <Col xs="12">
                                                        <Button
                                                            type="submit"
                                                            color="primary"
                                                            size="lg"
                                                            onClick={this.handleButton}
                                                            disabled={this.state.buttonDisabled}
                                                        >
                                                            {renderTextButton(this.state.buttonClicked)}
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            </Col>
                        </Row>
                    </Container>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalProblemas}>
                        <ModalHeader>Recuperación</ModalHeader>
                        <ModalBody>
                            Para recuperar la contraseña o usuario, por favor contactar con <a href={"soport@mail.udp.cl"}>soporte@mail.udp.cl</a>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleModalProblemas}>
                                Entendido
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else {
            if (decoded.perfil === "estudiante") return <Redirect to="/portal/estudiante/perfil" />;
            else if (decoded.perfil === "evaluador") return <Redirect to="/portal/evaluador/perfil" />;
            else if (decoded.perfil === "estudiante") return <Redirect to="/portal/estudiante/perfil" />;
            else if (decoded.perfil === "administrador_academico") return <Redirect to="/portal/administradorUDP/perfil" />;
            else if (decoded.perfil === "administrador_ti") return <Redirect to="/portal/administradorTI/perfil" />;
            else return <div> {decoded.perfil} Oops, no deberías estar aquí xD</div>;
        }
    }
}

export default Login;
