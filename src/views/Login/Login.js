import React from "react";
import BackgroundImage from "./background-login.jpg";
import { Card, CardBody, Row, Col, Input, Button, Form, InputGroup, Container, CardGroup } from "reactstrap";

class Login extends React.Component {
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
                                            <p className="text-muted">Ingresa con tu cuenta</p>
                                            <InputGroup className="mb-3">
                                                <Input
                                                    type="text"
                                                    name="user"
                                                    placeholder="Usuario"
                                                    value={this.state.user}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Contraseña"
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                    required
                                                />
                                            </InputGroup>
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
                                                        Login <i class="fas fa-sign-in-alt"></i>
                                                    </Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="primary" round outline>
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
            </div>
        );
    }
}

export default Login;
