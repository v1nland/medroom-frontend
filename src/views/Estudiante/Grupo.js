import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table } from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getPerfil } from "../../database/estudiantes/getPerfil";
import { getGrupo } from "../../database/estudiantes/getGrupo";
import { formatGrupo } from "../../functions/formats/estudiantes/formatGrupo";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Grupo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            nombreEvaluador: "Juan Lopez",
            cargoEvaluador: "Doctorado en Medicina",
            universidadEvaluador: "Universidad Diego Portales",
            correoEvaluador: "",
            nombreCurso: "",
            siglaCurso: "",
            estudiantesGrupo: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        Promise.all([getPerfil(cookies.get("token")), getGrupo(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    nombreEvaluador:
                        values[1].data["evaluador_grupo"]["nombres_evaluador"] + " " + values[1].data["evaluador_grupo"]["apellidos_evaluador"],
                    cargoEvaluador: values[1].data["evaluador_grupo"]["cargo_evaluador"],
                    correoEvaluador: values[1].data["evaluador_grupo"]["correo_electronico_evaluador"],
                    nombreCurso: values[1].data["curso_grupo"]["nombre_curso"],
                    siglaCurso: values[1].data["curso_grupo"]["sigla_curso"],
                    estudiantesGrupo: formatGrupo(values[1].data["estudiantes_grupo"]),
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
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Row>
                        <Col sm="12" md="6">
                            <Card className="card-user">
                                <CardHeader>
                                    <CardTitle tag="h5">Evaluador</CardTitle>
                                    <hr />
                                </CardHeader>
                                <div className="image">
                                    <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
                                </div>
                                <CardBody>
                                    <div className="author">
                                        <img alt="..." className="avatar border-gray" src={require("assets/img/mike.jpg")} />
                                        <h5 className="title">{this.state.nombreEvaluador}</h5>
                                    </div>
                                    <p className="description text-center">
                                        {this.state.cargoEvaluador}
                                        <br />
                                        {this.state.universidadEvaluador}
                                        <br />
                                        {this.state.correoEvaluador}
                                        <br />
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" md="3">
                            <Card className="card-user">
                                <CardHeader>
                                    <CardTitle tag="h5">Nombre Curso</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <hr />
                                    <br />
                                    <br />
                                    <div className="button-container">
                                        <Row>
                                            <Col className="ml-auto" lg="12" md="12" xs="12">
                                                <h2>{this.state.nombreCurso}</h2>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" md="3">
                            <Card className="card-user">
                                <CardHeader>
                                    <CardTitle tag="h5">Sigla Curso</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <hr />
                                    <br />
                                    <br />
                                    <div className="button-container">
                                        <Row>
                                            <Col className="ml-auto" lg="12" md="12" xs="12">
                                                <h2>{this.state.siglaCurso}</h2>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Mi grupo</CardTitle>
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
                                            {this.state.estudiantesGrupo.map((estudiante) => {
                                                return (
                                                    <tr key={estudiante["key"]}>
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

export default Grupo;
