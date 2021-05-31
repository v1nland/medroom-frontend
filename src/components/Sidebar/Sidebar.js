import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, FormGroup, Button, ModalFooter, Modal, ModalHeader, Label, ModalBody, Input, FormText } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
// import { getCursos } from "../../database/estudiantes/getCursos";
import { getCursos } from "../../database/evaluadores/getCursos";

import logo from "../../images/logo_udp.png";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
// import { preProcessFile } from "typescript";

const cookies = new Cookies();

var token = cookies.get("token");
var decoded = token ? jwt_decode(token) : "";

var ps;

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursos: [],
            modalNewEvaluacion: false,
            idCurso: 0,
            idGrupo: 0,
            nombreEvaluacion: "",
        };
        this.activeRoute.bind(this);
        this.sidebar = React.createRef();
        this.handleModalNewEvaluacion = this.handleModalNewEvaluacion.bind(this);
        this.handleNewEvaluacion = this.handleNewEvaluacion.bind(this);
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.sidebar.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
        }
    }
    handleModalNewEvaluacion(event) {
        this.setState({
            modalNewEvaluacion: !this.state.modalNewEvaluacion,
        });
    }
    handleNewEvaluacion() {
        Promise.all([getCursos(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    cursos: values[0].data,
                    modalNewEvaluacion: !this.state.modalNewEvaluacion,
                });
            })
            .catch((err) => console.log(err));
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }
    }
    render() {
        return (
            <div className="sidebar" data-color={this.props.bgColor} data-active-color={this.props.activeColor}>
                <div className="logo">
                    <a href="/#/dashboard" className="simple-text logo-mini">
                        <div className="logo-img">
                            <img src={logo} alt="react-logo" />
                        </div>
                    </a>
                    <a href="/#/dashboard" className="simple-text logo-normal">
                        Med MiniCex
                    </a>
                </div>
                <div className="sidebar-wrapper" ref={this.sidebar}>
                    <Nav>
                        {this.props.routes.map((prop, key) => {
                            // if (prop.perfil === decoded.perfil && prop.perfil === "evaluador" && prop.name.search("Agregar evaluación") !== -1) {
                            //     return (
                            //         <li onClick={this.handleNewEvaluacion} key={"/evaluador/agregar"}>
                            //             <NavLink to="/portal/evaluador/evaluacion" className="nav-link">
                            //                 <i className="nc-icon nc-simple-add" />
                            //                 <p>Agregar Evaluación</p>
                            //             </NavLink>
                            //         </li>
                            //     );
                            // } else
                            if (
                                prop.name.search("No mostrar") === -1 &&
                                prop.name.search("Modificar Evaluacion") === -1 &&
                                prop.perfil === decoded.perfil
                            ) {
                                return (
                                    <li className={this.activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={prop.path}>
                                        <NavLink to={prop.layout + prop.path} className="nav-link" activeClassName="active">
                                            <i className={prop.icon} />
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            } else return <li key={prop.path}></li>;
                        })}
                    </Nav>
                </div>
                <Modal aria-labelledby="contained-modal-title-vcenter" centered isOpen={this.state.modalNewEvaluacion}>
                    <ModalHeader>Agregar nueva evaluación</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="idGrupo">Curso</Label>
                            <Input type="select" name="idCurso" value={this.state.idCurso} onChange={this.handleChange} required>
                                <option disabled value={0}>
                                    -- Elija un curso --
                                </option>
                                {/* {this.state.grupos.map((grupo) => {
                                    return (
                                        <option key={grupo["id"]} value={grupo["id"]}>
                                            {grupo["nombre_grupo"]}
                                        </option>
                                    );
                                })} */}
                            </Input>
                            <Label for="idGrupo">Grupo</Label>
                            <Input type="select" name="idGrupo" value={this.state.idGrupo} onChange={this.handleChange} required>
                                <option disabled value={0}>
                                    -- Elija un grupo --
                                </option>
                                {/* {this.state.grupos.map((grupo) => {
                                    return (
                                        <option key={grupo["id"]} value={grupo["id"]}>
                                            {grupo["nombre_grupo"]}
                                        </option>
                                    );
                                })} */}
                            </Input>
                            <Label for="nombreEvaluacion" style={{ marginTop: "10px" }}>
                                Nombre nueva evaluación
                            </Label>
                            <Input type="text" name="nombreEvaluacion" id="nombreEvaluacion" placeholder="CONTROL 1" onChange={this.handleChange} />
                            <FormText color="muted">Se recomienda mantener consistencia en los nombres de las evaluaciones.</FormText>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" type="submit" onClick={this.handleSubmitNewEvaluacion}>
                            Agregar
                        </Button>
                        <Button onClick={this.handleNewEvaluacion}>Salir</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Sidebar;
