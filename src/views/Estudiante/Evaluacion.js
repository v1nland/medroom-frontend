import React from "react";
import { Line, Pie } from "react-chartjs-2";
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
import { dashboard24HoursPerformanceChart, dashboardEmailStatisticsChart, dashboardNASDAQChart } from "variables/charts.js";
import { getEvaluaciones } from "../../database/estudiantes/getEvaluaciones";
import { getPeriodos } from "../../database/periodos/getPeriodos";
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
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDetalle = this.handleDetalle.bind(this);
    }
    componentDidMount() {
        Promise.all([getEvaluaciones(cookies.get("token")), getPeriodos(cookies.get("token"))])
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
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Modal isOpen={this.state.detalle}>
                        <ModalHeader>Evaluación</ModalHeader>
                        <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                                                    value={this.state.periodo}
                                                    onChange={this.handleChange}
                                                >
                                                    {this.state.periodos.map((periodo) => {
                                                        return <option key={periodo["id"]}>{periodo["nombre_periodo"]}</option>;
                                                    })}
                                                </Input>
                                            </Col>
                                        </Row>
                                    </form>
                                    <Table responsive>
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
                                                return (
                                                    <tr key={evaluacion["id_evaluacion"]}>
                                                        <td>
                                                            <Button color="success" fab="true" round="true" onClick={this.handleDetalle}>
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
                        <Col md="4">
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
                        </Col>
                        <Col md="4">
                            <Card className="card-chart">
                                <CardHeader>
                                    <CardTitle tag="h5">Notas del semestre</CardTitle>
                                    <p className="card-category">Separado por cursos</p>
                                </CardHeader>
                                <CardBody>
                                    <Line data={dashboardNASDAQChart.data} options={dashboardNASDAQChart.options} width={400} height={100} />
                                </CardBody>
                                <CardFooter>
                                    <div className="chart-legend">
                                        <i className="fa fa-circle text-info" /> Programación
                                        <br />
                                        <i className="fa fa-circle text-warning" /> Programación Avanzada
                                    </div>
                                    <hr />
                                    <div className="card-stats">
                                        <i className="fa fa-check" /> Data information certified
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Evaluaciones;
