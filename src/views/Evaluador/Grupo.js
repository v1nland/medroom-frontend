import React from "react";
import { Card, CardBody, Row, Col, Table, CardHeader, CardTitle } from "reactstrap";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getGrupo } from "../../database/evaluadores/getGrupo";
import { formatGrupo } from "../../functions/formats/estudiantes/formatGrupo";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Grupo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queriesReady: false,
            estudiantes: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        Promise.all([getGrupo(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    estudiantes: formatGrupo(values[0].data["estudiantes_grupo"]),
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
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Lista de estudiantes</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive style={{ overflow: "hidden" }}>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Apellidos</th>
                                                <th>Nombres</th>
                                                <th>Correo</th>
                                                <th>RUT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.estudiantes.map((estudiante) => {
                                                return (
                                                    <tr key={estudiante["id_grupo"]}>
                                                        <td>{estudiante["apellidos_estudiante"]}</td>
                                                        <td>{estudiante["nombres_estudiante"]}</td>
                                                        <td>{estudiante["correo_electronico_estudiante"]}</td>
                                                        <td>{estudiante["rut_estudiante"]}</td>
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
