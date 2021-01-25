import React from "react";
import { Card, CardBody, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, ModalFooter } from "reactstrap";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core/";
import Localization from "../../helpers/Localization";
import { getCursos } from "../../database/administradorTI/getCursos";
import { postCurso } from "../../database/administradorTI/postCurso";
import { putCurso } from "../../database/administradorTI/putCurso";
// import { getPeriodos } from "../../database/periodos/getPeriodos";
import Cookies from "universal-cookie";
import { formatCursos } from "../../helpers/AdministradorTI/formatCursos";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
const cookies = new Cookies();

class Cursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnas: [
                { title: "NOMBRE CURSO", field: "nombre_curso" },
                { title: "SIGLA CURSO", field: "sigla_curso" },
                { title: "PERIODO", field: "nombre_periodo" },
                { title: "N° DE GRUPOS", field: "grupos_curso" },
            ],
            queriesReady: false,
            periodos: [],
            cursos: [],
            nombreCurso: "",
            siglaCurso: "",
            idCurso: 0,
            modalEliminarCurso: false,
            modalAgregarCurso: false,
            modalEditarCurso: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAgregarCurso = this.handleAgregarCurso.bind(this);
        this.handleModalAgregarCurso = this.handleModalAgregarCurso.bind(this);
        this.handleEditarCurso = this.handleEditarCurso.bind(this);
        this.handleModalEditarCurso = this.handleModalEditarCurso.bind(this);
    }
    componentDidMount() {
        Promise.all([getCursos(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    queriesReady: true,
                    cursos: formatCursos(values[0].data),
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleAgregarCurso() {
        var newCurso = {
            nombre_curso: this.state.nombreCurso,
            sigla_curso: this.state.siglaCurso,
            id_periodo: 1,
        };
        postCurso(cookies.get("token"), newCurso)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Nuevo curso agregado con éxito");
                    this.setState({
                        nombreCurso: "",
                        siglaCurso: "",
                        modalAgregarCurso: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalAgregarCurso() {
        this.setState({
            modalAgregarCurso: !this.state.modalAgregarCurso,
        });
    }

    handleEditarCurso(rowData) {
        var newCurso = {
            nombre_curso: this.state.nombreCurso,
            sigla_curso: this.state.siglaCurso,
            id_periodo: 1,
        };
        putCurso(cookies.get("token"), newCurso, this.state.idCurso)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Curso modificado con éxito");
                    this.setState({
                        nombreCurso: "",
                        siglaCurso: "",
                        modalEditarCurso: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEditarCurso(rowData) {
        if (rowData["id"] != null) {
            this.setState({
                nombreCurso: rowData["nombre_curso"],
                siglaCurso: rowData["sigla_curso"],
                idCurso: rowData["id"],
            });
        }

        this.setState({
            modalEditarCurso: !this.state.modalEditarCurso,
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
                                    <Button color="primary" onClick={this.handleModalAgregarCurso} style={{ marginBottom: "30px" }}>
                                        Agregar curso <i className="fas fa-plus"></i>
                                    </Button>
                                    <MaterialTable
                                        columns={this.state.columnas}
                                        data={this.state.cursos}
                                        title="Información Cursos"
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
                                                icon: "create",
                                                tooltip: "Editar curso",
                                                onClick: (event, rowData) => this.handleModalEditarCurso(rowData),
                                            },
                                            {
                                                icon: "delete",
                                                tooltip: "Borrar curso",
                                                onClick: (event, rowData) => this.handleDeleteCurso(rowData),
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
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.modalAgregarCurso}>
                        <ModalHeader>Agregar nuevo Curso</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nombreCurso" style={{ marginTop: "10px" }}>
                                    Nombre nuevo curso
                                </Label>
                                <Input
                                    type="text"
                                    name="nombreCurso"
                                    id="nombreCurso"
                                    placeholder="Habilidades Médicas I"
                                    onChange={this.handleChange}
                                />
                                <Label for="siglaCurso" style={{ marginTop: "10px" }}>
                                    Nombre sigla curso
                                </Label>
                                <Input type="text" name="siglaCurso" id="siglaCurso" placeholder="HMED-1000" onChange={this.handleChange} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAgregarCurso}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleModalAgregarCurso}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.modalEditarCurso}>
                        <ModalHeader>Editar Curso</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nombreCurso" style={{ marginTop: "10px" }}>
                                    Nombre curso
                                </Label>
                                <Input type="text" name="nombreCurso" id="nombreCurso" value={this.state.nombreCurso} onChange={this.handleChange} />
                                <Label for="siglaCurso" style={{ marginTop: "10px" }}>
                                    Nombre sigla
                                </Label>
                                <Input type="text" name="siglaCurso" id="siglaCurso" value={this.state.siglaCurso} onChange={this.handleChange} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleEditarCurso}>
                                Modificar
                            </Button>
                            <Button onClick={this.handleModalEditarCurso}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Cursos;
