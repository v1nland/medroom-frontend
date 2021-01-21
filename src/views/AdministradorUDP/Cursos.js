import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Input, Button, Table } from "reactstrap";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core/";
import Localization from "../../helpers/Localization";

class Cursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnas: [
                { title: "NOMBRE GRUPO", field: "nombre_producto" },
                { title: "SIGLA", field: "CURSO" },
            ],
            crearNombreGrupo: "",
            crearSiglaGrupo: "",
            actualizarNombreGrupo: "",
            actualizarSiglaGrupo: "",
            nuevoNombreGrupo: "",
            nuevaSiglaGrupo: "",
            eliminarNombreGrupo: "",
            eliminarSiglaGrupo: "",
            asociarNombreGrupo: "",
            asociarSiglaGrupo: "",
            nombreAlumno: "",
            nombreEvaluador: "",
            grupos: [],
            alumnos: [],
            evaluadores: [],
            nuevosAlumnos: [],
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
                            {/* <CardHeader>
                                <CardTitle tag="h4">Administrar grupos</CardTitle>
                            </CardHeader> */}
                            <CardBody>
                                <Button color="primary" onClick={this.handleNewEvaluacion} style={{ marginBottom: "30px" }}>
                                    Agregar evaluación <i className="fas fa-plus"></i>
                                </Button>
                                <MaterialTable
                                    columns={this.state.columnas}
                                    title=""
                                    localization={Localization}
                                    components={{
                                        Container: (props) => <Paper {...props} elevation={5} />,
                                    }}
                                    icons={{
                                        Filter: React.forwardRef((props, ref) => {
                                            return <SearchIcon ref={ref} />;
                                        }),
                                        Search: React.forwardRef((props, ref) => {
                                            return <SearchIcon ref={ref} />;
                                        }),
                                    }}
                                    options={{
                                        exportButton: true,
                                        filtering: true,
                                        pageSize: 10,
                                        sorting: true,
                                        headerStyle: {
                                            backgroundColor: "#8C1C13",
                                            color: "#FFF",
                                            textAlign: "center",
                                            fontWeight: "normal",
                                        },
                                    }}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Crear grupo</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nombre Grupo</small>
                                            <Input
                                                placeholder="Programación"
                                                name="crearNombreGrupo"
                                                value={this.state.crearNombreGrupo}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Sigla Grupo</small>
                                            <Input
                                                placeholder="CIT1000"
                                                name="crearSiglaGrupo"
                                                value={this.state.crearSiglaGrupo}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit" style={{ marginTop: "20px" }}>
                                                Crear grupo
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Actualizar grupo</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nombre Grupo</small>
                                            <Input
                                                type="select"
                                                name="actualizarNombreGrupo"
                                                value={this.state.actualizarNombreGrupo}
                                                onChange={this.handleChange}
                                                required
                                            >
                                                <option>Grupo 1</option>
                                                <option>Grupo 2</option>
                                                <option>Grupo 3</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Sigla Grupo</small>
                                            <Input
                                                name="actualizarSiglaGrupo"
                                                value={this.state.actualizarSiglaGrupo}
                                                onChange={this.handleChange}
                                                type="text"
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nuevo Nombre Grupo</small>
                                            <Input
                                                placeholder="Grupo 1"
                                                name="nuevoNombreGrupo"
                                                value={this.state.nuevoNombreGrupo}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Nueva Sigla Grupo</small>
                                            <Input
                                                placeholder="GRUP01"
                                                name="nuevaSiglaGrupo"
                                                value={this.state.nuevaSiglaGrupo}
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="info" type="submit" style={{ marginTop: "20px" }}>
                                                Actualizar grupo
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Eliminar grupo</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nombre Grupo</small>
                                            <Input
                                                type="select"
                                                name="eliminarNombreGrupo"
                                                value={this.state.eliminarNombreGrupo}
                                                onChange={this.handleChange}
                                                required
                                            >
                                                <option>Grupo 1</option>
                                                <option>Grupo 2</option>
                                                <option>Grupo 3</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Sigla Grupo</small>
                                            <Input
                                                name="eliminarSiglaGrupo"
                                                value={this.state.eliminarSiglaGrupo}
                                                onChange={this.handleChange}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="danger" type="submit" style={{ marginTop: "20px" }}>
                                                Eliminar grupo
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Asociar usuarios</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <Row>
                                        <Col sm="12" md="6">
                                            <small>Nombre Grupo</small>
                                            <Input
                                                type="select"
                                                name="asociarNombreGrupo"
                                                value={this.state.asociarNombreGrupo}
                                                onChange={this.handleChange}
                                                required
                                            >
                                                <option>Grupo 1</option>
                                                <option>Grupo 2</option>
                                                <option>Grupo 3</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Sigla Grupo</small>
                                            <Input
                                                type="text"
                                                name="asociarSiglaGrupo"
                                                value={this.state.asociarSiglaGrupo}
                                                onChange={this.handleChange}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="4">
                                            <small>Nombre alumno</small>
                                            <Input
                                                type="select"
                                                name="nombreAlumno"
                                                value={this.state.nombreAlumno}
                                                onChange={this.handleChange}
                                                required
                                            >
                                                <option>Juan Francisco Lopez Perez</option>
                                                <option>Diego Martín Pinilla Suarez</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="2">
                                            <Row>
                                                <div className="update ml-auto mr-auto">
                                                    <Button className="btn-round" color="success" type="submit" style={{ marginTop: "20px" }}>
                                                        Agregar Alumno
                                                    </Button>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col sm="12" md="6">
                                            <small>Nombre evaluador</small>
                                            <Input
                                                type="select"
                                                name="nombreEvaluador"
                                                value={this.state.nombreEvaluador}
                                                onChange={this.handleChange}
                                                required
                                            >
                                                <option>José Lopez</option>
                                            </Input>
                                        </Col>
                                        <Col sm="12" md="12">
                                            <Table responsive>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>Apellido Paterno</th>
                                                        <th>Apellido Materno</th>
                                                        <th>Nombres</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>López</td>
                                                        <td>Pérez</td>
                                                        <td>Juan Francisco</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Suárez</td>
                                                        <td>Pinilla</td>
                                                        <td>Diego Martín</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit" style={{ marginTop: "20px" }}>
                                                Asociar usuarios
                                            </Button>
                                        </div>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Cursos;
