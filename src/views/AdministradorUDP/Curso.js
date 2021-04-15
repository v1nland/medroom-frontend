import React from "react";
import { Card, CardBody, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, ModalFooter } from "reactstrap";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, TableCell, TableRow, Table, Box, Typography, TableHead, TableBody, Chip } from "@material-ui/core/";
import Localization from "../../helpers/Localization";
import { formatGrupos } from "../../helpers/AdministradorUDP/formatGrupos";
import { formatSinGrupos } from "../../helpers/AdministradorUDP/formatSinGrupos";
import { getGrupos } from "../../database/administradorUDP/getGrupos";
import { postGrupos } from "../../database/administradorUDP/postGrupos";
import { putGrupos } from "../../database/administradorUDP/putGrupos";
import { deleteGrupos } from "../../database/administradorUDP/deleteGrupos";
import { asociarGrupoEstudiante } from "../../database/administradorUDP/asociarGrupoEstudiante";
import { asociarGrupoEvaluador } from "../../database/administradorUDP/asociarGrupoEvaluador";
import Cookies from "universal-cookie";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
const cookies = new Cookies();

class Curso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnas: [
                { title: "NOMBRE GRUPO", field: "nombre_grupo" },
                { title: "SIGLA GRUPO", field: "sigla_grupo" },
            ],
            queriesReady: false,
            periodos: [],
            grupos: [],
            sinGrupo: [],
            cursos: [],
            evaluadores: [],
            estudiantes: [],
            nombreGrupo: "",
            siglaGrupo: "",
            idGrupo: 0,
            idCurso: 0,
            idEvaluador: 0,
            idEstudiante: 0,

            //Modales
            modalEliminarGrupo: false,
            modalAgregarGrupo: false,
            modalEditarGrupo: false,
            modalAsociarEstudiante: false,
            modalAsociarEvaluador: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAgregarGrupo = this.handleAgregarGrupo.bind(this);
        this.handleModalAgregarGrupo = this.handleModalAgregarGrupo.bind(this);
        this.handleEditarGrupo = this.handleEditarGrupo.bind(this);
        this.handleModalEditarGrupo = this.handleModalEditarGrupo.bind(this);
        this.handleEliminarGrupo = this.handleEliminarGrupo.bind(this);
        this.handleModalEliminarGrupo = this.handleModalEliminarGrupo.bind(this);
        this.handleAsociarEvaluador = this.handleAsociarEvaluador.bind(this);
        this.handleModalAsociarEvaluador = this.handleModalAsociarEvaluador.bind(this);
        this.handleAsociarEstudiante = this.handleAsociarEstudiante.bind(this);
        this.handleModalAsociarEstudiante = this.handleModalAsociarEstudiante.bind(this);
    }
    componentDidMount() {
        Promise.all([getGrupos(cookies.get("token"), this.props.match.params.idCurso)])
            .then((values) => {
                this.setState({
                    queriesReady: true,
                    grupos: formatGrupos(values[0].data),
                    sinGrupo: formatSinGrupos(values[0].data),
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleAgregarGrupo() {
        var newGrupo = {
            nombre_grupo: this.state.nombreGrupo,
            sigla_grupo: this.state.siglaGrupo,
        };
        postGrupos(cookies.get("token"), newGrupo, this.props.match.params.idCurso)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Nuevo grupo agregado con éxito");
                    this.setState({
                        nombreGrupo: "",
                        siglaGrupo: "",
                        modalAgregarGrupo: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAgregarGrupo() {
        this.setState({
            modalAgregarGrupo: !this.state.modalAgregarGrupo,
        });
    }

    handleEditarGrupo(rowData) {
        var newGrupo = {
            nombre_grupo: this.state.nombreGrupo,
            sigla_grupo: this.state.siglaGrupo,
        };
        putGrupos(cookies.get("token"), newGrupo, this.props.match.params.idCurso, this.state.idGrupo)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Grupo modificado con éxito");
                    this.setState({
                        nombreGrupo: "",
                        siglaGrupo: "",
                        modalEditarGrupo: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEditarGrupo(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombreGrupo: rowData["nombre_grupo"],
                siglaGrupo: rowData["sigla_grupo"],
                idGrupo: rowData["id"],
            });
        }

        this.setState({
            modalEditarGrupo: !this.state.modalEditarGrupo,
        });
    }
    handleEliminarGrupo(event) {
        event.preventDefault();
        deleteGrupos(cookies.get("token"), this.props.match.params.idCurso, this.state.idGrupo)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Eliminado", "Grupo eliminado con éxito");
                    this.setState({
                        modalEliminarGrupo: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEliminarGrupo(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                idGrupo: rowData["id"],
            });
        }
        this.setState({
            modalEliminarGrupo: !this.state.modalEliminarGrupo,
        });
    }
    handleAsociarEvaluador() {
        asociarGrupoEvaluador(cookies.get("token"), this.props.match.params.idCurso, this.state.idGrupo, this.state.idEvaluador)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Nuevo grupo agregado con éxito");
                    this.setState({
                        nombreGrupo: "",
                        siglaGrupo: "",
                        modalAsociarEvaluador: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAsociarEvaluador(rowData) {
        this.setState({
            idGrupo: rowData["id"],
            modalAsociarEvaluador: !this.state.modalAsociarEvaluador,
        });
    }
    handleAsociarEstudiante() {
        asociarGrupoEstudiante(cookies.get("token"), this.props.match.params.idCurso, this.state.idGrupo, this.state.idEstudiante)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Nuevo grupo agregado con éxito");
                    this.setState({
                        nombreGrupo: "",
                        siglaGrupo: "",
                        modalAsociarEstudiante: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAsociarEstudiante(rowData) {
        this.setState({
            idGrupo: rowData["id"],
            modalAsociarEstudiante: !this.state.modalAsociarEstudiante,
        });
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <Button color="primary" onClick={this.handleModalAgregarGrupo} style={{ marginBottom: "30px" }}>
                                        Agregar grupo <i className="fas fa-plus"></i>
                                    </Button>
                                    <MaterialTable
                                        columns={this.state.columnas}
                                        data={this.state.grupos}
                                        title="Información Grupos"
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
                                        actions={[
                                            {
                                                icon: "book",
                                                tooltip: "Asociar evaluador",
                                                onClick: (event, rowData) => this.handleModalAsociarEvaluador(rowData),
                                            },
                                            {
                                                icon: "school",
                                                tooltip: "Asociar estudiante",
                                                onClick: (event, rowData) => this.handleModalAsociarEstudiante(rowData),
                                            },
                                            {
                                                icon: "create",
                                                tooltip: "Editar grupo",
                                                onClick: (event, rowData) => this.handleModalEditarGrupo(rowData),
                                            },
                                            {
                                                icon: "delete",
                                                tooltip: "Borrar grupo",
                                                onClick: (event, rowData) => this.handleModalEliminarGrupo(rowData),
                                            },
                                        ]}
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
                                        detailPanel={(rowData) => {
                                            return (
                                                <Box margin={1} style={{}}>
                                                    <Typography variant="h6" gutterBottom component="div" style={{ marginLeft: "10px" }}>
                                                        Detalle Grupo
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell style={{ fontWeight: "bold" }}>Rol</TableCell>
                                                                <TableCell style={{ fontWeight: "bold" }}>Apellidos</TableCell>
                                                                <TableCell style={{ fontWeight: "bold" }}>Nombres</TableCell>
                                                                <TableCell style={{ fontWeight: "bold" }}>Correo</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rowData["evaluadores_grupo"].map((evaluador, i) => (
                                                                <TableRow key={i}>
                                                                    <TableCell>
                                                                        <Chip label="Evaluador" color="primary" />
                                                                    </TableCell>
                                                                    <TableCell> {evaluador["apellidos_evaluador"]} </TableCell>
                                                                    <TableCell> {evaluador["nombres_evaluador"]} </TableCell>
                                                                    <TableCell> {evaluador["correo_electronico_evaluador"]} </TableCell>
                                                                </TableRow>
                                                            ))}
                                                            {rowData["estudiantes_grupo"].map((estudiante, i) => (
                                                                <TableRow key={i}>
                                                                    <TableCell>
                                                                        <Chip label="Estudiante" color="secondary" />
                                                                    </TableCell>
                                                                    <TableCell> {estudiante["apellidos_estudiante"]} </TableCell>
                                                                    <TableCell> {estudiante["nombres_estudiante"]} </TableCell>
                                                                    <TableCell> {estudiante["correo_electronico_estudiante"]} </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            );
                                        }}
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAgregarGrupo}>
                        <ModalHeader>Agregar nuevo grupo</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nombreGrupo" style={{ marginTop: "10px" }}>
                                    Nombre nuevo grupo
                                </Label>
                                <Input type="text" name="nombreGrupo" id="nombreGrupo" placeholder="Grupo 1" onChange={this.handleChange} />
                                <Label for="siglaGrupo" style={{ marginTop: "10px" }}>
                                    Nombre sigla grupo
                                </Label>
                                <Input type="text" name="siglaGrupo" id="siglaGrupo" placeholder="G01" onChange={this.handleChange} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAgregarGrupo}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleModalAgregarGrupo}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEditarGrupo}>
                        <ModalHeader>Editar Grupo</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nombreGrupo" style={{ marginTop: "10px" }}>
                                    Nombre grupo
                                </Label>
                                <Input type="text" name="nombreGrupo" id="nombreGrupo" value={this.state.nombreGrupo} onChange={this.handleChange} />
                                <Label for="siglaGrupo" style={{ marginTop: "10px" }}>
                                    Nombre sigla
                                </Label>
                                <Input type="text" name="siglaGrupo" id="siglaGrupo" value={this.state.siglaGrupo} onChange={this.handleChange} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleEditarGrupo}>
                                Modificar
                            </Button>
                            <Button onClick={this.handleModalEditarGrupo}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEliminarGrupo}>
                        <ModalHeader>¿Está seguro que desea eliminar el grupo?</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" type="submit" onClick={this.handleEliminarGrupo}>
                                Eliminar
                            </Button>
                            <Button onClick={this.handleModalEliminarGrupo}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAsociarEvaluador}>
                        <ModalHeader>Asociar evaluador</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="idEvaluador" style={{ marginTop: "10px" }}>
                                    Nombre evaluador
                                </Label>
                                <Input type="select" name="idEvaluador" value={this.state.idEvaluador} onChange={this.handleChange} required>
                                    <option disabled value={"0"}>
                                        -- Elija un evaluador --
                                    </option>
                                    {this.state.sinGrupo["evaluadores_grupo"].map((evaluador) => {
                                        return (
                                            <option key={evaluador["id"]} value={evaluador["id"]}>
                                                {evaluador["nombres_evaluador"] + " " + evaluador["apellidos_evaluador"]}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAsociarEvaluador}>
                                Asociar
                            </Button>
                            <Button onClick={this.handleModalAsociarEvaluador}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAsociarEstudiante}>
                        <ModalHeader>Asociar estudiante</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="idEstudiante" style={{ marginTop: "10px" }}>
                                    Nombre estudiante
                                </Label>
                                <Input type="select" name="idEstudiante" value={this.state.idEstudiante} onChange={this.handleChange} required>
                                    <option disabled value={"0"}>
                                        -- Elija un estudiante --
                                    </option>
                                    {this.state.sinGrupo["estudiantes_grupo"].map((estudiante) => {
                                        return (
                                            <option key={estudiante["id"]} value={estudiante["id"]}>
                                                {estudiante["nombres_estudiante"] + " " + estudiante["apellidos_estudiante"]}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAsociarEstudiante}>
                                Asociar
                            </Button>
                            <Button onClick={this.handleModalAsociarEstudiante}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Curso;
