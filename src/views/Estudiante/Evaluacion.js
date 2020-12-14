import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col, Table, Input, Button } from "reactstrap";
import { dashboard24HoursPerformanceChart, dashboardEmailStatisticsChart, dashboardNASDAQChart } from "variables/charts.js";

class Evaluaciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaInicio: "",
            fechaTermino: "",
            evaluaciones: [],
        };
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
            <div className="content">
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
                                            <small>Fecha de inicio</small>
                                            <Input name="fechaInicio" value={this.state.fechaInicio} onChange={this.handleChange} type="date" />
                                        </Col>
                                        <Col md="2">
                                            <small>Fecha de termino</small>
                                            <Input name="fechaTermino" value={this.state.fechaInicio} onChange={this.handleChange} type="date" />
                                        </Col>
                                    </Row>
                                </form>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th></th>
                                            <th>Ramo</th>
                                            <th>Puntaje obtenido</th>
                                            <th>Nota</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button color="info" fab="true" round="true" style={{ marginRight: "5px" }}>
                                                    <i className="fa fa-comments"></i>
                                                </Button>
                                                <Button color="success" fab="true" round="true">
                                                    <i className="fas fa-file-alt"></i>
                                                </Button>
                                            </td>
                                            <td>Programación</td>
                                            <td>40 / 60</td>
                                            <td>5.0</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button color="info" fab="true" round="true" style={{ marginRight: "5px" }}>
                                                    <i className="fa fa-comments"></i>
                                                </Button>
                                                <Button color="success" fab="true" round="true">
                                                    <i className="fas fa-file-alt"></i>
                                                </Button>
                                            </td>
                                            <td>Programación Avanzada</td>
                                            <td>55 / 60</td>
                                            <td>5.5</td>
                                        </tr>
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
    }
}

export default Evaluaciones;
