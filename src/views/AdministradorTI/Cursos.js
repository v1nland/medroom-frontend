import React from "react";
import { Card, CardBody, Row, Col, Input, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, ModalFooter } from "reactstrap";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper } from "@material-ui/core/";
import Localization from "../../helpers/Localization";
import { getCursos } from "../../database/administradorTI/getCursos";
import { postCurso } from "../../database/administradorTI/postCurso";
import { cargarCursos } from "../../database/administradorTI/cargarCursos";
import { cargarGrupos } from "../../database/administradorTI/cargarGrupos";
import { putCurso } from "../../database/administradorTI/putCurso";
import { deleteCurso } from "../../database/administradorTI/deleteCurso";
import { getReporteCurso } from "../../database/administradorTI/getReporteCurso";
import Cookies from "universal-cookie";
import { formatCursos } from "../../helpers/AdministradorTI/formatCursos";
import { formatReporte } from "../../functions/formats/administradorTI/formatReporte";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import AlertsHandler from "../../components/AlertsHandler/AlertsHandler";
import CSVReader from "react-csv-reader";
import { ExportToCsv } from "export-to-csv";
import { getPeriodo } from "database/administradorTI/getPeriodo";

const cookies = new Cookies();
const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
};
const options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    filename: "REPORTE",
    decimalSeparator: ".",
    showLabels: true,
    showTitle: false,
    title: "Reporte",
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
};

class Cursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnas: [
                { title: "NOMBRE CURSO", field: "nombre_curso" },
                { title: "SIGLA CURSO", field: "sigla_curso" },
                { title: "PERIODO", field: "id_periodo" },
                { title: "N° DE GRUPOS", field: "grupos_curso" },
            ],
            queriesReady: false,
            periodos: [],
            cursos: [],
            cargaCursos: [],
            fileCargaCursos: {},
            cargaGrupos: [],
            fileCargaGrupos: {},
            nombreCurso: "",
            siglaCurso: "",
            idPeriodo: 0,
            modalEliminarCurso: false,
            modalAgregarCurso: false,
            modalEditarCurso: false,
            modalCargaMasiva: false,
            modalCargaMasivaGrupos: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAgregarCurso = this.handleAgregarCurso.bind(this);
        this.handleModalAgregarCurso = this.handleModalAgregarCurso.bind(this);
        this.handleEditarCurso = this.handleEditarCurso.bind(this);
        this.handleModalEditarCurso = this.handleModalEditarCurso.bind(this);
        this.handleEliminarCurso = this.handleEliminarCurso.bind(this);
        this.handleModalEliminarCurso = this.handleModalEliminarCurso.bind(this);
        this.handleCargaMasiva = this.handleCargaMasiva.bind(this);
        this.handleModalCargaMasiva = this.handleModalCargaMasiva.bind(this);
        this.handleCargaMasivaGrupos = this.handleCargaMasivaGrupos.bind(this);
        this.handleModalCargaMasivaGrupos = this.handleModalCargaMasivaGrupos.bind(this);
        this.handleForceCursos = this.handleForceCursos.bind(this);
        this.handleForceGrupos = this.handleForceGrupos.bind(this);
        this.handleDescargarReporte = this.handleDescargarReporte.bind(this);
    }
    componentDidMount() {
        Promise.all([getCursos(cookies.get("token")), getPeriodo(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    queriesReady: true,
                    cursos: formatCursos(values[0].data),
                    periodos: values[1].data,
                });
            })
            .catch((err) => console.log(err));
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    handleForceCursos(data, fileInfo) {
        this.setState({
            cargaCursos: data,
            fileCargaCursos: fileInfo,
        });
    }
    handleForceGrupos(data, fileInfo) {
        this.setState({
            cargaGrupos: data,
            fileCargaGrupos: fileInfo,
        });
    }
    handleAgregarCurso() {
        var newCurso = {
            nombre_curso: this.state.nombreCurso,
            sigla_curso: this.state.siglaCurso,
        };
        postCurso(cookies.get("token"), newCurso, this.state.idPeriodo)
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
        };
        putCurso(cookies.get("token"), newCurso, this.state.idPeriodo, this.state.siglaCurso)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Curso modificado con éxito");
                    this.setState({
                        nombreCurso: "",
                        modalEditarCurso: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEditarCurso(rowData) {
        if (rowData["sigla_curso"] != null) {
            this.setState({
                nombreCurso: rowData["nombre_curso"],
                siglaCurso: rowData["sigla_curso"],
                idPeriodo: rowData["id_periodo"],
            });
        }

        this.setState({
            modalEditarCurso: !this.state.modalEditarCurso,
        });
    }

    handleEliminarCurso(rowData) {
        deleteCurso(cookies.get("token"), this.state.siglaCurso)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Curso eliminado con éxito");
                    this.setState({
                        modalEliminarCurso: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalEliminarCurso(rowData) {
        if (rowData["sigla_curso"] != null) {
            this.setState({
                idPeriodo: rowData["id_periodo"],
                siglaCurso: rowData["sigla_curso"],
            });
        }

        this.setState({
            modalEliminarCurso: !this.state.modalEliminarCurso,
        });
    }
    handleCargaMasiva() {
        var cursos = {
            cursos: this.state.cargaCursos,
        };
        cargarCursos(cookies.get("token"), cursos)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Cursos agregados con éxito");
                    this.setState({
                        modalCargaMasiva: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalCargaMasiva(rowData) {
        this.setState({
            modalCargaMasiva: !this.state.modalCargaMasiva,
        });
    }
    handleCargaMasivaGrupos() {
        var grupos = {
            grupos: this.state.cargaGrupos,
        };
        cargarGrupos(cookies.get("token"), grupos)
            .then((resp) => {
                if (resp.meta === "OK") {
                    this.AlertsHandler.generate("success", "Agregado", "Grupos agregados con éxito");
                    this.setState({
                        modalCargaMasivaGrupos: false,
                    });
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    handleModalCargaMasivaGrupos(rowData) {
        this.setState({
            modalCargaMasivaGrupos: !this.state.modalCargaMasivaGrupos,
        });
    }
    handleDescargarReporte(rowData) {
        getReporteCurso(cookies.get("token"), rowData["id_periodo"], rowData["sigla_curso"])
            .then((resp) => {
                if (resp.meta === "OK") {
                    // console.log(resp.data);
                    const customOptions = options;
                    customOptions["filename"] = "REPORTE " + rowData["nombre_curso"];
                    const csvExporter = new ExportToCsv(customOptions);
                    csvExporter.generateCsv(formatReporte(resp.data));
                } else {
                    this.AlertsHandler.generate("danger", "Oops!", "Parece que hubo un problema");
                }
            })
            .catch((err) => console.log(err));
    }
    render() {
        if (this.state.queriesReady)
            return (
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardBody>
                                    <Button
                                        color="primary"
                                        onClick={this.handleModalAgregarCurso}
                                        style={{ marginBottom: "30px", marginRight: "10px" }}
                                    >
                                        Agregar curso <i className="fas fa-plus"></i>
                                    </Button>
                                    <Button
                                        color="success"
                                        onClick={this.handleModalCargaMasiva}
                                        style={{ marginBottom: "30px", marginRight: "10px" }}
                                    >
                                        Carga masiva Cursos <i className="fas fa-plus"></i>
                                    </Button>
                                    <Button color="danger" onClick={this.handleModalCargaMasivaGrupos} style={{ marginBottom: "30px" }}>
                                        Carga masiva Grupos <i className="fas fa-plus"></i>
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
                                                onClick: (event, rowData) => this.handleModalEliminarCurso(rowData),
                                            },
                                            {
                                                icon: "assignmentreturned",
                                                tooltip: "Descargar reporte",
                                                onClick: (event, rowData) => this.handleDescargarReporte(rowData),
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
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalAgregarCurso}>
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
                                    required
                                />
                                <Label for="siglaCurso" style={{ marginTop: "10px" }}>
                                    Nombre sigla curso
                                </Label>
                                <Input type="text" name="siglaCurso" id="siglaCurso" placeholder="HMED-1000" onChange={this.handleChange} required />
                                <Label for="idPeriodo" style={{ marginTop: "10px" }}>
                                    Periodo
                                </Label>
                                <Input type="select" name="idPeriodo" value={this.state.idPeriodo} onChange={this.handleChange} required>
                                    <option disabled value={"0"}>
                                        -- Elija un periodo --
                                    </option>
                                    {this.state.periodos.map((periodo, i) => {
                                        return (
                                            <option key={i} value={periodo["id"]}>
                                                {periodo["id"]}
                                            </option>
                                        );
                                    })}
                                </Input>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleAgregarCurso}>
                                Agregar
                            </Button>
                            <Button onClick={this.handleModalAgregarCurso}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEditarCurso}>
                        <ModalHeader>Editar Curso</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="nombreCurso" style={{ marginTop: "10px" }}>
                                    Nombre curso
                                </Label>
                                <Input type="text" name="nombreCurso" id="nombreCurso" value={this.state.nombreCurso} onChange={this.handleChange} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleEditarCurso}>
                                Modificar
                            </Button>
                            <Button onClick={this.handleModalEditarCurso}>Salir</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalEliminarCurso}>
                        <ModalHeader>¿Está seguro que desea eliminar el curso?</ModalHeader>
                        <ModalFooter>
                            <Button color="danger" type="submit" onClick={this.handleEliminarCurso}>
                                Eliminar
                            </Button>
                            <Button onClick={this.handleModalEliminarCurso}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalCargaMasiva}>
                        <ModalHeader>Carga masiva</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <CSVReader
                                    cssClass="csv-reader-input"
                                    label="Selecciona un archivo .csv"
                                    onFileLoaded={(data, fileInfo) => this.handleForceCursos(data, fileInfo)}
                                    parserOptions={papaparseOptions}
                                    inputId="cargaCursos"
                                    inputName="cargaCursos"
                                    inputStyle={{ color: "red" }}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleCargaMasiva}>
                                Cargar
                            </Button>
                            <Button onClick={this.handleModalCargaMasiva}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalCargaMasivaGrupos}>
                        <ModalHeader>Carga masiva</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <CSVReader
                                    cssClass="csv-reader-input"
                                    label="Selecciona un archivo .csv"
                                    onFileLoaded={(data, fileInfo) => this.handleForceGrupos(data, fileInfo)}
                                    parserOptions={papaparseOptions}
                                    inputId="cargaGrupos"
                                    inputName="cargaGrupos"
                                    inputStyle={{ color: "red" }}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit" onClick={this.handleCargaMasivaGrupos}>
                                Cargar
                            </Button>
                            <Button onClick={this.handleModalCargaMasivaGrupos}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                    <AlertsHandler onRef={(ref) => (this.AlertsHandler = ref)} />
                </div>
            );
        else return <LoadingPage />;
    }
}

export default Cursos;
