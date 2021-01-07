import React from "react";
// import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getCurso } from "../../database/estudiantes/getCurso";
import { getGrupo } from "../../database/estudiantes/getGrupo";
import { getCalificacion } from "../../database/estudiantes/getCalificacion";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Curso extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props.match.params.idCurso);
        this.state = {
            queriesReady: false,
            detalle: false,
            curso: {},
            grupo: {},
            competencias: [],
            nombreEvaluacion: "",
            comentarioEvaluacion: "",
            idCurso: 0,
            idGrupo: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDetalle = this.handleDetalle.bind(this);
        this.openDetalle = this.openDetalle.bind(this);
    }
    componentDidMount() {
        Promise.all([
            getCurso(cookies.get("token"), this.props.match.params.idCurso),
            getGrupo(cookies.get("token"), this.props.match.params.idCurso),
        ])
            .then((values) => {
                this.setState({
                    curso: values[0].data,
                    grupo: values[1].data[0],
                    idCurso: values[0].data["id"],
                    idGrupo: values[1].data[0]["id"],
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
    openDetalle(idEvaluacion, nombreEvaluacion) {
        Promise.all([getCalificacion(cookies.get("token"), this.state.idCurso, this.state.idGrupo, idEvaluacion)])
            .then((values) => {
                this.setState({
                    competencias: values[0].data["puntajes_calificacion_estudiante"],
                    comentarioEvaluacion: values[0].data["observacion_calificacion_calificacion_estudiante"],
                    nombreEvaluacion: nombreEvaluacion,
                    detalle: true,
                });
            })
            .catch((err) => console.log(err));
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Modal isOpen={this.state.detalle}>
                        <ModalHeader>{this.state.nombreEvaluacion}</ModalHeader>
                        <ModalBody>
                            <Table responsive striped bordered>
                                <thead className="text-primary text-center">
                                    <tr style={{ textAlign: "true" }}>
                                        <th>Nombre Competencia</th>
                                        <th>Puntaje obtenido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.competencias.map((competencia) => {
                                        return (
                                            <tr key={competencia["id"]}>
                                                <td>{competencia["competencia_puntaje"]["nombre_competencia"]}</td>
                                                <td className="text-center">{competencia["calificacion_puntaje"]}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            <div className="info">
                                <h4 className="info-title">Comentario</h4>
                                <p>{this.state.comentarioEvaluacion}</p>
                            </div>
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
                                    <CardTitle tag="h4">{this.state.curso["nombre_curso"]}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive striped hover>
                                        <thead className="text-primary">
                                            <tr>
                                                <th></th>
                                                <th>Nombre Evaluacion</th>
                                                <th>Puntaje obtenido</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.grupo["evaluaciones_grupo"].map((evaluacion) => {
                                                return (
                                                    <tr key={evaluacion["id"]}>
                                                        <td>
                                                            <Button
                                                                color="success"
                                                                fab="true"
                                                                round="true"
                                                                onClick={() => this.openDetalle(evaluacion["id"], evaluacion["nombre_evaluacion"])}
                                                            >
                                                                <i className="fas fa-file-alt"></i>
                                                            </Button>
                                                        </td>
                                                        <td>{evaluacion["nombre_evaluacion"]}</td>
                                                        <td>7</td>
                                                        <td>{evaluacion["created_at"]}</td>
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
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">{this.state.grupo["nombre_grupo"] + " / " + this.state.grupo["sigla_grupo"]}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Apellidos</th>
                                                <th>Nombres</th>
                                                <th>Correo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.grupo["estudiantes_grupo"].map((estudiante) => {
                                                // if (evaluacion["nombre_periodo"] === this.state.periodo)
                                                return (
                                                    <tr key={estudiante["id"]}>
                                                        <td>{estudiante["apellidos_estudiante"]}</td>
                                                        <td>{estudiante["nombres_estudiante"]}</td>
                                                        <td>{estudiante["correo_electronico_estudiante"]}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Curso;
