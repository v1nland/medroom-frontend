import React from "react";
import BackgroundImage from "./background-login.jpg";
import { loginMedRoom } from "../../database/login/loginMedRoom";
import { loginEvaluador } from "../../database/login/loginEvaluador";
import Cookies from "universal-cookie";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import { Card, CardBody, Row, Col, Input, Button, Form, Container, CardGroup, Label, FormGroup, ButtonGroup } from "reactstrap";

const cookies = new Cookies();

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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButton = this.handleButton.bind(this);
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
    handleButton() {
        if (this.state.user !== "" && this.state.password !== "") {
            this.setState({ buttonClicked: true });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ buttonDisabled: true });
        if (parseInt(this.state.perfil) === 1) {
            loginMedRoom(this.state.user, this.state.password).then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Ingresado 💙", "Credenciales correctas");
                    cookies.set("token", resp.data.token, { path: "/" });
                    window.location.href = "/portal";
                } else {
                    this.AlertsHandler.generate("danger", "Oh no 😥", "Credenciales incorrectas");
                    this.setState({ buttonClicked: false, buttonDisabled: false });
                }
            });
        } else if (parseInt(this.state.perfil) === 2) {
            loginEvaluador(this.state.user, this.state.password).then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Ingresado 💙", "Credenciales correctas");
                    cookies.set("token", resp.data.token, { path: "/" });
                    window.location.href = "/portal";
                } else {
                    this.AlertsHandler.generate("danger", "Oh no 😥", "Credenciales incorrectas");
                    this.setState({ buttonClicked: false, buttonDisabled: false });
                }
            });
        }
    };
    render() {
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
                        <Col md="8" xl="8" style={{ marginTop: "100px" }}>
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmit}>
                                            <h1>Login</h1>
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
                                            <ButtonGroup>
                                                <Button color="default" name="perfil" value={1} onClick={this.handleChange}>
                                                    ALUMNO
                                                </Button>
                                                <Button color="default" name="perfil" value={2} onClick={this.handleChange}>
                                                    EVALUADOR
                                                </Button>
                                            </ButtonGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        className="px-4"
                                                        size="lg"
                                                        onClick={this.handleButton}
                                                        disabled={this.state.buttonDisabled}
                                                    >
                                                        {renderTextButton(this.state.buttonClicked)}
                                                    </Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="primary" outline={true}>
                                                        ¿Problemas?
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
                <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
            </div>
        );
    }
}

export default Login;
