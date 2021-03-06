import React from "react";
import { Line, Radar } from "react-chartjs-2";
import { estudianteOptions } from "variables/charts.js";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Media } from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getCurso } from "../../database/estudiantes/getCurso";
import { getGrupo } from "../../database/estudiantes/getGrupo";
import { getCalificacion } from "../../database/estudiantes/getCalificacion";
import { getEvolucionCompetencia } from "../../database/estudiantes/getEvolucionCompetencia";
import { formatEvaluaciones } from "../../functions/formats/estudiantes/formatEvaluaciones";
import { formatGraficoCompetencias } from "../../functions/formats/estudiantes/formatGraficoCompetencias";
import { format } from "date-fns";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const optionsCompetencia = {
    scale: {
        ticks: { beginAtZero: true, min: 0, max: 9 },
    },
};

class Curso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            detalle: false,
            curso: {},
            grupo: {},
            competencias: [],
            evolucionCompetencia: [],
            data: {},
            nombreEvaluacion: "",
            comentarioEvaluacion: "",
            nombreEvaluador: "",
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
            getEvolucionCompetencia(cookies.get("token"), this.props.match.params.idCurso, this.props.match.params.idGrupo),
        ])
            .then((values) => {
                this.setState({
                    curso: values[0].data,
                    grupo: values[1].data[0],
                    idCurso: values[0].data["id"],
                    idGrupo: values[1].data[0]["id"],
                    evolucionCompetencia: formatEvaluaciones(values[2].data),
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
                    data: formatGraficoCompetencias(values[0].data["puntajes_calificacion_estudiante"]),
                    competencias: values[0].data["puntajes_calificacion_estudiante"],
                    comentarioEvaluacion: values[0].data["observacion_calificacion_calificacion_estudiante"],
                    nombreEvaluacion: nombreEvaluacion,
                    nombreEvaluador:
                        values[0].data["evaluador_calificacion_estudiante"]["nombres_evaluador"] +
                        " " +
                        values[0].data["evaluador_calificacion_estudiante"]["apellidos_evaluador"],
                    detalle: true,
                });
            })
            .catch((err) => console.log(err));
    }
    render() {
        if (this.state.queriesReady && this.state.grupo["sigla_grupo"] !== "SG")
            return (
                <div className="content">
                    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.detalle}>
                        <ModalHeader>{this.state.nombreEvaluacion}</ModalHeader>
                        <ModalBody>
                            <div className="info">
                                <h4 className="info-title">Tutor clínico evaluador</h4>
                                <p>{this.state.nombreEvaluador}</p>
                            </div>
                            <Table striped bordered>
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
                            <Media>
                                <Media left href="#">
                                    <Media
                                        object
                                        src={require("../../images/doctor.png")}
                                        alt="profile.png"
                                        style={{ width: "64px", height: "64px", marginTop: "25px", marginRight: "10px" }}
                                    />
                                </Media>
                                <Media body>
                                    <Media heading>Feedback Descriptivo</Media>
                                    {this.state.comentarioEvaluacion}
                                </Media>
                            </Media>
                            <Radar data={this.state.data} options={optionsCompetencia} width={400} height={200} style={{ marginTop: "35px" }} />
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
                                                <th>Detalle</th>
                                                <th>Nombre Evaluacion</th>
                                                <th>Fecha Evaluacion</th>
                                                <th>Hora Evaluacion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.grupo["evaluaciones_grupo"].map((evaluacion) => {
                                                var fecha = new Date(evaluacion["created_at"]);
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
                                                        <td>{format(fecha, "dd-MM-yyyy")}</td>
                                                        <td>{format(fecha, "hh:mm:ss")}</td>
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
                                    <Line data={this.state.evolucionCompetencia} options={estudianteOptions.options} width={400} height={100} />
                                </CardBody>
                            </Card>
                        </Col>
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
        else if (this.state.grupo["sigla_grupo"] === "SG")
            return (
                <div className="content">
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
