import EstudiantePerfil from "views/Estudiante/Perfil.js";
import EstudianteGrupo from "views/Estudiante/Grupo.js";
import EstudianteEvaluacion from "views/Estudiante/Evaluacion.js";
import EvaluadorPerfil from "views/Evaluador/Perfil.js";
import EvaluadorGrupo from "views/Evaluador/Grupo.js";
import EvaluadorEvaluacion from "views/Evaluador/Evaluacion.js";
import EvaluadorReporte from "views/Evaluador/Reporte.js";
import AdministradorUDPPerfil from "views/AdministradorUDP/Perfil.js";
import AdministradorUDPCursos from "views/AdministradorUDP/Cursos.js";
import AdministradorTIPerfil from "views/AdministradorTI/Perfil.js";
import AdministradorTICursos from "views/AdministradorTI/CrearCursos.js";
import AdministradorTiCrearUsuarios from "views/AdministradorTI/CrearUsuarios.js";
import AdministradorTiAdministrarUsuarios from "views/AdministradorTI/AdministrarUsuarios.js";

var routes = [
    {
        path: "/estudiante/perfil",
        name: "Mi perfil",
        icon: "nc-icon nc-single-02",
        component: EstudiantePerfil,
        layout: "/portal",
        perfil: "estudiante",
    },
    {
        path: "/estudiante/grupo",
        name: "Mi grupo",
        icon: "nc-icon nc-badge",
        component: EstudianteGrupo,
        layout: "/portal",
        perfil: "estudiante",
    },
    {
        path: "/estudiante/evaluacion",
        name: "Mis evaluaciones",
        icon: "nc-icon nc-paper",
        component: EstudianteEvaluacion,
        layout: "/portal",
        perfil: "estudiante",
    },
    {
        path: "/evaluador/perfil",
        name: "Mi perfil",
        icon: "nc-icon nc-single-02",
        component: EvaluadorPerfil,
        layout: "/portal",
        perfil: "evaluador",
    },
    {
        path: "/evaluador/grupo",
        name: "Mi grupo",
        icon: "nc-icon nc-badge",
        component: EvaluadorGrupo,
        layout: "/portal",
        perfil: "evaluador",
    },
    {
        path: "/evaluador/evaluacion",
        name: "Realizar Evaluacion",
        icon: "nc-icon nc-ruler-pencil",
        component: EvaluadorEvaluacion,
        layout: "/portal",
        perfil: "evaluador",
    },
    {
        path: "/evaluador/reporte",
        name: "Ver reportes",
        icon: "nc-icon nc-single-copy-04",
        component: EvaluadorReporte,
        layout: "/portal",
        perfil: "evaluador",
    },
    {
        path: "/administradorUDP/perfil",
        name: "Mi perfil",
        icon: "nc-icon nc-single-02",
        component: AdministradorUDPPerfil,
        layout: "/portal",
        perfil: "administrador_academico",
    },
    {
        path: "/administradorUDP/cursos",
        name: "Curso",
        icon: "nc-icon nc-vector",
        component: AdministradorUDPCursos,
        layout: "/portal",
        perfil: "administrador_academico",
    },
    {
        path: "/administradorTI/perfil",
        name: "Mi perfil",
        icon: "nc-icon nc-single-02",
        component: AdministradorTIPerfil,
        layout: "/portal",
        perfil: "administrador_ti",
    },
    {
        path: "/administradorTI/crearUsuarios",
        name: "Crear Usuarios",
        icon: "nc-icon nc-tap-01",
        component: AdministradorTiCrearUsuarios,
        layout: "/portal",
        perfil: "administrado_ti",
    },
    {
        path: "/administradorTI/crearCursos",
        name: "Crear Cursos",
        icon: "nc-icon nc-hat-3",
        component: AdministradorTICursos,
        layout: "/portal",
        perfil: "administrado_ti",
    },
    {
        path: "/administradorTI/administrarUsuarios",
        name: "Administrar Usuarios",
        icon: "nc-icon nc-book-bookmark",
        component: AdministradorTiAdministrarUsuarios,
        layout: "/portal",
        perfil: "administrado_ti",
    },
];
export default routes;
