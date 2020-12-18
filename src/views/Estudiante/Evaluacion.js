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
} from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
// import { dashboardNASDAQChart } from "variables/charts.js";
import { getEvaluaciones } from "../../database/estudiantes/getEvaluaciones";
import { getPeriodos } from "../../database/periodos/getPeriodos";
import { getEvolucionCompetencia } from "../../database/estudiantes/getEvolucionCompetencia";
import { formatEvaluaciones } from "../../functions/formats/estudiantes/formatEvaluaciones";
import { formatPeriodos } from "../../functions/formats/periodos/formatPeriodos";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Evaluaciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            detalle: false,
            fechaInicio: "",
            fechaTermino: "",
            periodo: "",
            evaluaciones: [],
            periodos: [],
            nombreEvaluacion: "",
            competencias: [],
            codigoCompetencia: "entrevistaMedica",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDetalle = this.handleDetalle.bind(this);
        this.openDetalle = this.openDetalle.bind(this);
    }
    componentDidMount() {
        Promise.all([
            getEvaluaciones(cookies.get("token")),
            getPeriodos(cookies.get("token")),
            getEvolucionCompetencia(cookies.get("token"), this.state.codigoCompetencia),
        ])
            .then((values) => {
                this.setState({
                    evaluaciones: formatEvaluaciones(values[0].data),
                    periodos: formatPeriodos(values[1].data),
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
    handleDetalle(event) {
        this.setState({
            detalle: !this.state.detalle,
        });
    }
    openDetalle(evaluacion) {
        this.setState({
            detalle: !this.state.detalle,
            nombreEvaluacion: evaluacion["nombre_evaluacion"],
            competencias: evaluacion["puntajes_evaluacion"],
        });
    }
    handleCompetencia(codigoCompetencia) {
        getEvolucionCompetencia(cookies.get("token"), codigoCompetencia)
            .then((data) => {
                this.setState({});
            })
            .catch((err) => console.log(err));
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Modal isOpen={this.state.detalle} handle>
                        <ModalHeader>{this.state.nombreEvaluacion}</ModalHeader>
                        <ModalBody>
                            <Table responsive striped bordered>
                                <thead className="text-primary text-center">
                                    <tr style={{ textAlign: "true" }}>
                                        <th>Nombre Competencia</th>
                                        <th>Puntaje obtenido</th>
                                        <th>Comentario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.competencias.map((competencia) => {
                                        return (
                                            <tr key={competencia["id_evaluacion"]}>
                                                <td>{competencia["nombre_competencia_puntaje"]}</td>
                                                <td className="text-center">{competencia["calificacion_puntaje"]}</td>
                                                <td>{competencia["feedback_puntaje"]}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleDetalle}>
                                Salir
                            </Button>
                        </ModalFooter>
                    </Modal>
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Evaluaciones</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <form>
                                        <Row>
                                            <Col md="2">
                                                <small>Periodo</small>
                                                <Input
                                                    type="select"
                                                    name="periodo"
                                                    id="periodo"
                                                    onChange={this.handleChange}
                                                    defaultValue={"DEFAULT"}
                                                >
                                                    <option disabled value="DEFAULT">
                                                        -- Filtrar por periodo --
                                                    </option>
                                                    {this.state.periodos.map((periodo) => {
                                                        return (
                                                            <option key={periodo["id"]} value={periodo["nombre_periodo"]}>
                                                                {periodo["nombre_periodo"]}
                                                            </option>
                                                        );
                                                    })}
                                                </Input>
                                            </Col>
                                        </Row>
                                    </form>
                                    <Table responsive striped hover>
                                        <thead className="text-primary">
                                            <tr>
                                                <th></th>
                                                <th>Nombre Evaluacion</th>
                                                <th>Puntaje obtenido</th>
                                                <th>Periodo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.evaluaciones.map((evaluacion) => {
                                                // if (evaluacion["nombre_periodo"] === this.state.periodo)
                                                return (
                                                    <tr key={evaluacion["id_evaluacion"]}>
                                                        <td>
                                                            <Button
                                                                color="success"
                                                                fab="true"
                                                                round="true"
                                                                onClick={() => this.openDetalle(evaluacion)}
                                                            >
                                                                <i className="fas fa-file-alt"></i>
                                                            </Button>
                                                        </td>
                                                        <td>{evaluacion["nombre_evaluacion"]}</td>
                                                        <td>{evaluacion["promedio_evaluacion"]}</td>
                                                        <td>{evaluacion["nombre_periodo"]}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
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
                        {/* <Col md="4">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Promedio General</CardTitle>
                                    <p className="card-category">Última evaluación</p>
                                </CardHeader>
                                <CardBody>
                                    <Line
                                        data={dashboard24HoursPerformanceChart.data}
                                        options={dashboard24HoursPerformanceChart.options}
                                        width={400}
                                        height={100}
                                    />
                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-history" /> Updated 3 minutes ago
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Notas última evaluación</CardTitle>
                                    <p className="card-category">Basado en rango de notas</p>
                                </CardHeader>
                                <CardBody>
                                    <Pie data={dashboardEmailStatisticsChart.data} options={dashboardEmailStatisticsChart.options} />
                                </CardBody>
                                <CardFooter>
                                    <div className="legend">
                                        <i className="fa fa-circle text-primary" /> [1.0 - 2.0] <br />
                                        <i className="fa fa-circle text-warning" /> ]2.0 - 3.0]
                                        <br />
                                        <i className="fa fa-circle text-danger" /> ]3.0 - 4.0]
                                        <br />
                                        <i className="fa fa-circle text-gray" /> ]4.0 - 4.0]
                                        <br />
                                    </div>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-calendar" /> Number of emails sent
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col> */}
                    </Row>
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Evaluaciones;
