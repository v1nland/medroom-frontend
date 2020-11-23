import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";
import { dashboard24HoursPerformanceChart, dashboardEmailStatisticsChart, dashboardNASDAQChart } from "variables/charts.js";

class Evaluaciones extends React.Component {
    render() {
        return (
            <div className="content">
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
                                    <i className="fa fa-circle text-info" /> Programación <i className="fa fa-circle text-warning" /> Programación
                                    Avanzada
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
