import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getCursos } from "../../database/estudiantes/getCursos";
// import { formatCursos } from "../../functions/formats/estudiantes/formatCursos";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Cursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            nombreEvaluador: "Juan Lopez",
            cargoEvaluador: "Doctorado en Medicina",
            universidadEvaluador: "Universidad Diego Portales",
            correoEvaluador: "",
            estudiantesGrupo: [],
            cursos: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        Promise.all([getCursos(cookies.get("token"))])
            .then((values) => {
                this.setState(
                    {
                        cursos: values[0].data,
                        queriesReady: true,
                    },
                    () => console.log(this.state.cursos)
                );
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleClick(idCurso, idGrupo) {
        window.location.href = "/portal/estudiante/curso/" + idCurso + "/grupo/" + idGrupo;
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Row>
                        {this.state.cursos.map((curso) => {
                            return (
                                <Col sm="12" md="4" key={curso["id"]}>
                                    <Card
                                        className="card-user"
                                        onClick={() =>
                                            this.handleClick(
                                                curso["id"],
                                                curso["grupos_curso"][0]["sigla_grupo"] !== "SG"
                                                    ? curso["grupos_curso"][0]["id"]
                                                    : curso["grupos_curso"][1]["id"]
                                            )
                                        }
                                    >
                                        <div className="image">
                                            <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
                                            <div className="centered">Centered</div>
                                        </div>
                                        <CardBody>
                                            <div className="author">
                                                <img alt="..." className="avatar border-gray" src={require("assets/img/mike.jpg")} style={{}} />
                                                <h5 className="title">{curso["nombre_curso"]}</h5>
                                            </div>
                                            <p className="description text-center">
                                                {curso["sigla_curso"]}
                                                <br />
                                                {curso["periodo_curso"]["nombre_periodo"]}
                                                <br />
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Cursos;
