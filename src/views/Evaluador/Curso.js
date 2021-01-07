import React from "react";
// import { Line } from "react-chartjs-2";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Table,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Label,
    FormText,
    FormGroup,
} from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getCurso } from "../../database/evaluadores/getCurso";
import { getGrupo } from "../../database/evaluadores/getGrupo";
import { postEvaluacion } from "../../database/evaluadores/postEvaluacion";
import Cookies from "universal-cookie";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
const cookies = new Cookies();

class Curso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            modalNewEvaluacion: false,
            curso: {},
            grupos: [],
            competencias: [],
            nombreEvaluacion: "",
            comentarioEvaluacion: "",
            idCurso: 0,
            idGrupo: 0,
            activeTab: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleNewEvaluacion = this.handleNewEvaluacion.bind(this);
        this.handleSubmitNewEvaluacion = this.handleSubmitNewEvaluacion.bind(this);
    }
    componentDidMount() {
        Promise.all([
            getCurso(cookies.get("token"), this.props.match.params.idCurso),
            getGrupo(cookies.get("token"), this.props.match.params.idCurso),
        ])
            .then((values) => {
                this.setState({
                    curso: values[0].data,
                    grupos: values[1].data,
                    activeTab: values[1].data[0]["id"] ?? 1,
                    idCurso: values[0].data["id"],
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
    handleNewEvaluacion(event) {
        this.setState({
            modalNewEvaluacion: !this.state.modalNewEvaluacion,
        });
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    handleSubmitNewEvaluacion() {
        var newEvaluacion = {
            nombre_evaluacion: this.state.nombreEvaluacion,
        };
        postEvaluacion(cookies.get("token"), newEvaluacion, parseInt(this.state.idCurso), parseInt(this.state.idGrupo))
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Nueva evaluación agregada con éxito");
                    this.setState({
                        idCurso: 0,
                        idGrupo: 0,
                        modalNewEvaluacion: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Modal isOpen={this.state.modalNewEvaluacion}>
                        <ModalHeader>Agregar nueva evaluación</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="idGrupo">Grupo</Label>
                                <Input type="select" name="idGrupo" value={this.state.idGrupo} onChange={this.handleChange} required>
                                    <option disabled value={0}>
                                        -- Elija un grupo --
                                    </option>
                                    {this.state.grupos.map((grupo) => {
                                        return (
                                            <option key={grupo["id"]} value={grupo["id"]}>
                                                {grupo["nombre_grupo"]}
                                            </option>
                                        );
                                    })}
                                </Input>
                                <Label for="nombreEvaluacion" style={{ marginTop: "10px" }}>
                                    Nombre nueva evaluación
                                </Label>
                                <Input
                                    type="text"
                                    name="nombreEvaluacion"
                                    id="nombreEvaluacion"
                                    placeholder="CONTROL 1"
                                    onChange={this.handleChange}
                                />
                                <FormText color="muted">Se recomienda mantener consistencia en los nombres de las evaluaciones.</FormText>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleSubmitNewEvaluacion}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleNewEvaluacion}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">{this.state.curso["nombre_curso"]}</CardTitle>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardBody>
                                    <Button color="primary" onClick={this.handleNewEvaluacion}>
                                        Agregar evaluación <i className="fas fa-plus"></i>
                                    </Button>
                                    <Card>
                                        <CardHeader>
                                            <Nav tabs>
                                                {this.state.grupos.map((grupo) => {
                                                    return (
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === grupo["id"] ? "active" : ""}
                                                                onClick={() => {
                                                                    this.toggle(grupo["id"]);
                                                                }}
                                                            >
                                                                {grupo["nombre_grupo"]}
                                                            </NavLink>
                                                        </NavItem>
                                                    );
                                                })}
                                            </Nav>
                                        </CardHeader>
                                        <CardBody>
                                            <TabContent activeTab={this.state.activeTab} className="text-center">
                                                {this.state.grupos.map((grupo) => {
                                                    return (
                                                        <TabPane tabId={grupo["id"]}>
                                                            <Table bordered>
                                                                <thead className="text-primary">
                                                                    <tr>
                                                                        <th>Apellidos</th>
                                                                        <th>Nombres</th>
                                                                        <th>Correo</th>
                                                                        <th>Número</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {grupo["estudiantes_grupo"].map((estudiante) => {
                                                                        return (
                                                                            <tr key={estudiante["id"]}>
                                                                                <td>{estudiante["apellidos_estudiante"]}</td>
                                                                                <td>{estudiante["nombres_estudiante"]}</td>
                                                                                <td>{estudiante["correo_electronico_estudiante"]}</td>
                                                                                <td>{estudiante["telefono_celular_estudiante"]}</td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </Table>
                                                            <hr />
                                                            <h4 style={{ textAlign: "left" }}>Evaluaciones</h4>
                                                            <Table striped hover bordered>
                                                                <thead className="text-primary">
                                                                    <tr>
                                                                        <th>Nombre Evaluación</th>
                                                                        <th>Fecha de creación</th>
                                                                        <th>Fecha de modificación</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody key={grupo["id"]}>
                                                                    {grupo["evaluaciones_grupo"].map((evaluacion) => {
                                                                        return (
                                                                            <tr key={evaluacion["id"]}>
                                                                                <td>{evaluacion["nombre_evaluacion"]}</td>
                                                                                <td>{evaluacion["created_at"]}</td>
                                                                                <td>{evaluacion["updated_at"]}</td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </Table>
                                                        </TabPane>
                                                    );
                                                })}
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card className="card-chart">
                                <CardHeader>
                                    <CardTitle tag="h5">Evolución por competencia</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    {/* <Line data={dashboardNASDAQChart.data} options={dashboardNASDAQChart.options} width={400} height={100} /> */}
                                </CardBody>
                                <CardFooter>
                                    <div className="chart-legend">
                                        <i className="fa fa-circle text-info" /> Entrevista Medica
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12"></Col>
                    </Row>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Curso;
