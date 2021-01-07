import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import { getCursos } from "../../database/estudiantes/getCursos";

import logo from "logo.svg";
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
        };
        this.activeRoute.bind(this);
        this.sidebar = React.createRef();
        this.handleCursosEstudiante = this.handleCursosEstudiante.bind(this);
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
        if (decoded.perfil === "estudiante") this.handleCursosEstudiante();
    }
    handleCursosEstudiante() {
        Promise.all([getCursos(cookies.get("token"))])
            .then((values) => {
                this.setState({
                    cursos: values[0].data,
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
                        MedRoom
                    </a>
                </div>
                <div className="sidebar-wrapper" ref={this.sidebar}>
                    <Nav>
                        {this.props.routes.map((prop, key) => {
                            // if (prop.perfil === decoded.perfil)
                            if (prop.name.search("Mi Curso") === -1 && prop.perfil === decoded.perfil) {
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
                        {/* {this.state.cursos.map((curso, key) => {
                            return (
                                <li className={this.activeRoute("/portal/estudiante/curso/") + curso["id"]} key={1}>
                                    <NavLink to={"/portal/estudiante/curso/" + curso["id"]} className="nav-link" activeClassName="active">
                                        <p>{curso["nombre_curso"]}</p>
                                    </NavLink>
                                </li>
                            );
                        })} */}
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;
