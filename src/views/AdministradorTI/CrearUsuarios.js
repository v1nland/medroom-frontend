import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Input, Button } from "reactstrap";
import { postEstudiante } from "../../database/administradorTI/postEstudiante";
import { postEvaluador } from "../../database/administradorTI/postEvaluador";
import { postAdministrador } from "../../database/administradorTI/postAdministrador";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import { sha256 } from "js-sha256";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class CrearUsuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Estudiante
            nombresEstudiante: "",
            apellidosEstudiante: "",
            correoElectronicoEstudiante: "",
            contraseñaEstudiante: "",
            rutEstudiante: "",
            telefonoEstudiante: "",
            celularEstudiante: "",

            //Evaluador
            nombresEvaluador: "",
            apellidosEvaluador: "",
            correoElectronicoEvaluador: "",
            contraseñaEvaluador: "",
            rutEvaluador: "",
            telefonoEvaluador: "",
            celularEvaluador: "",
            cargoEvaluador: "",
            recintoEvaluador: "",

            //Administrador
            nombresAdministrador: "",
            apellidosAdministrador: "",
            correoElectronicoAdministrador: "",
            contraseñaAdministrador: "",
            rutAdministrador: "",
            telefonoAdministrador: "",
            celularAdministrador: "",
            cargoAdministrador: "",
            recintoAdministrador: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAgregarEstudiante = this.handleAgregarEstudiante.bind(this);
        this.handleAgregarEvaluador = this.handleAgregarEvaluador.bind(this);
        this.handleAgregarAdministrador = this.handleAgregarAdministrador.bind(this);
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
    handleAgregarEstudiante(event) {
        event.preventDefault();
        var newEstudiante = {
            apellidos_estudiante: this.state.apellidosEstudiante,
            correo_electronico_estudiante: this.state.correoElectronicoEstudiante,
            hash_contrasena_estudiante: sha256(this.state.rutEstudiante),
            id_rol: 1,
            nombres_estudiante: this.state.nombresEstudiante,
            rut_estudiante: this.state.rutEstudiante,
            telefono_celular_estudiante: this.state.celularEstudiante,
            telefono_fijo_estudiante: this.state.telefonoEstudiante,
        };
        postEstudiante(cookies.get("token"), newEstudiante)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Estudiante agregado con éxito");
                    this.setState(
                        {
                            apellidosEstudiante: "",
                            correoElectronicoEstudiante: "",
                            nombresEstudiante: "",
                            rutEstudiante: "",
                            celularEstudiante: "",
                            telefonoEstudiante: "",
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleAgregarEvaluador(event) {
        event.preventDefault();
        var newEvaluador = {
            apellidos_evaluador: this.state.apellidosEvaluador,
            cargo_evaluador: this.state.cargoEvaluador,
            correo_electronico_evaluador: this.state.correoElectronicoEvaluador,
            hash_contrasena_evaluador: sha256(this.state.rutEvaluador),
            id_rol: 2,
            nombres_evaluador: this.state.nombresEvaluador,
            recinto_evaluador: this.state.recintoEvaluador,
            rut_evaluador: this.state.rutEvaluador,
            telefono_celular_evaluador: this.state.telefonoEvaluador,
            telefono_fijo_evaluador: this.state.celularEvaluador,
        };
        postEvaluador(cookies.get("token"), newEvaluador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Evaluador agregado con éxito");
                    this.setState(
                        {
                            apellidosEvaluador: "",
                            cargoEvaluador: "",
                            correoElectronicoEvaluador: "",
                            rutEvaluador: "",
                            nombresEvaluador: "",
                            recintoEvaluador: "",
                            telefonoEvaluador: "",
                            celularEvaluador: "",
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleAgregarAdministrador(event) {
        event.preventDefault();
        var newAdministrador = {
            apellidos_administrador_academico: this.state.apellidosAdministrador,
            correo_electronico_administrador_academico: this.state.correoElectronicoAdministrador,
            hash_contrasena_administrador_academico: sha256(this.state.rutAdministrador),
            id_rol: 2,
            nombres_administrador_academico: this.state.nombresAdministrador,
            rut_administrador_academico: this.state.rutAdministrador,
            telefono_celular_administrador_academico: this.state.celularAdministrador,
            telefono_fijo_administrador_academico: this.state.telefonoAdministrador,
        };
        postAdministrador(cookies.get("token"), newAdministrador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Administrador agregado con éxito");
                    this.setState(
                        {
                            apellidosAdministrador: "",
                            cargoAdministrador: "",
                            correoElectronicoAdministrador: "",
                            rutAdministrador: "",
                            nombresAdministrador: "",
                            recintoAdministrador: "",
                            celularAdministrador: "",
                            telefonoAdministrador: "",
                        },
                        () => resp
                    );
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }

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
                                            <small>Nombres Estudiante</small>
                                            <Input
                                                name="nombresEstudiante"
                                                value={this.state.nombresEstudiante}
                                                onChange={this.handleChange}
                                                placeholder="Jose Pedro Pérez López"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Apellidos Estudiante</small>
                                            <Input
                                                name="apellidosEstudiante"
                                                value={this.state.apellidosEstudiante}
                                                onChange={this.handleChange}
                                                placeholder="Pérez López"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Correo</small>
                                            <Input
                                                name="correoElectronicoEstudiante"
                                                value={this.state.correoElectronicoEstudiante}
                                                onChange={this.handleChange}
                                                placeholder="nombre.apellido@mail.udp.cl"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>RUT</small>
                                            <Input
                                                name="rutEstudiante"
                                                value={this.state.rutEstudiante}
                                                onChange={this.handleChange}
                                                placeholder="123456789"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Teléfono</small>
                                            <Input
                                                name="telefonoEstudiante"
                                                value={this.state.telefonoEstudiante}
                                                onChange={this.handleChange}
                                                placeholder="24350000"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Celular</small>
                                            <Input
                                                name="celularEstudiante"
                                                value={this.state.celularEstudiante}
                                                onChange={this.handleChange}
                                                placeholder="96050000"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                                style={{ marginTop: "20px" }}
                                                onClick={this.handleAgregarEstudiante}
                                            >
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
                                            <small>Nombres Evaluador</small>
                                            <Input
                                                name="nombresEvaluador"
                                                value={this.state.nombresEvaluador}
                                                onChange={this.handleChange}
                                                placeholder="Jose Pedro"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Apellidos Evaluador</small>
                                            <Input
                                                name="apellidosEvaluador"
                                                value={this.state.apellidosEvaluador}
                                                onChange={this.handleChange}
                                                placeholder="Pérez López"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Correo Evaluador</small>
                                            <Input
                                                name="correoElectronicoEvaluador"
                                                value={this.state.correoElectronicoEvaluador}
                                                onChange={this.handleChange}
                                                placeholder="evaluador@mail.udp.cl"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>RUT</small>
                                            <Input
                                                name="rutEvaluador"
                                                value={this.state.rutEvaluador}
                                                onChange={this.handleChange}
                                                placeholder="199331183"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Teléfono</small>
                                            <Input
                                                name="telefonoEvaluador"
                                                value={this.state.telefonoEvaluador}
                                                onChange={this.handleChange}
                                                placeholder="24500000"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Celular</small>
                                            <Input
                                                name="celularEvaluador"
                                                value={this.state.celularEvaluador}
                                                onChange={this.handleChange}
                                                placeholder="98765421"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>Cargo</small>
                                            <Input
                                                name="cargoEvaluador"
                                                value={this.state.cargoEvaluador}
                                                onChange={this.handleChange}
                                                placeholder="Doctor en plataformas digitales"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Recinto</small>
                                            <Input
                                                name="recintoEvaluador"
                                                value={this.state.recintoEvaluador}
                                                onChange={this.handleChange}
                                                placeholder="UDP"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                                style={{ marginTop: "20px" }}
                                                onClick={this.handleAgregarEvaluador}
                                            >
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
                                            <small>Nombres Administrador</small>
                                            <Input
                                                name="nombresAdministrador"
                                                value={this.state.nombresAdministrador}
                                                onChange={this.handleChange}
                                                placeholder="Jose Pedro"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Apellidos Administrador</small>
                                            <Input
                                                name="apellidosAdministrador"
                                                value={this.state.apellidosAdministrador}
                                                onChange={this.handleChange}
                                                placeholder="Pérez López"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Correo Administrador</small>
                                            <Input
                                                name="correoElectronicoAdministrador"
                                                value={this.state.correoElectronicoAdministrador}
                                                onChange={this.handleChange}
                                                placeholder="Administrador@mail.udp.cl"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>RUT</small>
                                            <Input
                                                name="rutAdministrador"
                                                value={this.state.rutAdministrador}
                                                onChange={this.handleChange}
                                                placeholder="199331183"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Teléfono</small>
                                            <Input
                                                name="telefonoAdministrador"
                                                value={this.state.telefonoAdministrador}
                                                onChange={this.handleChange}
                                                placeholder="24500000"
                                            />
                                        </Col>
                                        <Col sm="12" md="4">
                                            <small>Celular</small>
                                            <Input
                                                name="celularAdministrador"
                                                value={this.state.celularAdministrador}
                                                onChange={this.handleChange}
                                                placeholder="98765421"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button
                                                className="btn-round"
                                                color="primary"
                                                type="submit"
                                                style={{ marginTop: "20px" }}
                                                onClick={this.handleAgregarAdministrador}
                                            >
                                                Crear Administrador Académico
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
            </div>
        );
    }
}

export default CrearUsuarios;
