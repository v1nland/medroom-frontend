import EstudiantePerfil from "views/Estudiante/Perfil.js";
import EstudianteCursos from "views/Estudiante/Cursos.js";
import EstudianteCurso from "views/Estudiante/Curso.js";
import EvaluadorPerfil from "views/Evaluador/Perfil.js";
import EvaluadorEvaluacion from "views/Evaluador/Evaluacion.js";
import EvaluadorReporte from "views/Evaluador/Reporte.js";
import EvaluadorCurso from "views/Evaluador/Curso.js";
import EvaluadorCursos from "views/Evaluador/Cursos.js";
import AdministradorUDPPerfil from "views/AdministradorUDP/Perfil.js";
import AdministradorUDPGrupos from "views/AdministradorUDP/Grupos.js";
import AdministradorTIPerfil from "views/AdministradorTI/Perfil.js";
import AdministradorTICursos from "views/AdministradorTI/CrearCursos.js";
// import AdministradorTiCrearUsuarios from "views/AdministradorTI/CrearUsuarios.js";
// import AdministradorTiAdministrarUsuarios from "views/AdministradorTI/AdministrarUsuarios.js";
import AdministradorTIEstudiantes from "views/AdministradorTI/Estudiantes.js";
import AdministradorTIEvaluadores from "views/AdministradorTI/Evaluadores.js";
import AdministradorTIAdministradores from "views/AdministradorTI/Administradores.js";

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
        path: "/estudiante/cursos",
        name: "Tablero de cursos",
        icon: "nc-icon nc-badge",
        component: EstudianteCursos,
        layout: "/portal",
        perfil: "estudiante",
    },
    // {
    //     path: "/estudiante/evaluacion",
    //     name: "Mis evaluaciones",
    //     icon: "nc-icon nc-paper",
    //     component: EstudianteEvaluacion,
    //     layout: "/portal",
    //     perfil: "estudiante",
    // },
    {
        path: "/estudiante/curso/:idCurso/grupo/:idGrupo",
        name: "Mi Curso1",
        icon: "nc-icon nc-paper",
        component: EstudianteCurso,
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
        path: "/evaluador/curso/:idCurso",
        name: "Mi Curso2",
        icon: "nc-icon nc-single-copy-04",
        component: EvaluadorCurso,
        layout: "/portal",
        perfil: "evaluador",
    },
    {
        path: "/evaluador/cursos",
        name: "Tablero de cursos",
        icon: "nc-icon nc-badge",
        component: EvaluadorCursos,
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
        path: "/administradorUDP/grupos",
        name: "Grupos",
        icon: "nc-icon nc-vector",
        component: AdministradorUDPGrupos,
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
    // {
    //     path: "/administradorTI/crearUsuarios",
    //     name: "Crear Usuarios",
    //     icon: "nc-icon nc-tap-01",
    //     component: AdministradorTiCrearUsuarios,
    //     layout: "/portal",
    //     perfil: "administrado_ti",
    // },
    {
        path: "/administradorTI/crearCursos",
        name: "Crear Cursos",
        icon: "nc-icon nc-book-bookmark",
        component: AdministradorTICursos,
        layout: "/portal",
        perfil: "administrador_ti",
    },
    // {
    //     path: "/administradorTI/administrarUsuarios",
    //     name: "Administrar Usuarios",
    //     icon: "nc-icon nc-book-bookmark",
    //     component: AdministradorTiAdministrarUsuarios,
    //     layout: "/portal",
    //     perfil: "administrador_ti",
    // },
    {
        path: "/administradorTI/administrarEstudiantes",
        name: "Estudiantes",
        icon: "nc-icon nc-hat-3",
        component: AdministradorTIEstudiantes,
        layout: "/portal",
        perfil: "administrador_ti",
    },
    {
        path: "/administradorTI/administrarEvaluadores",
        name: "Evaluadores",
        icon: "nc-icon nc-ruler-pencil",
        component: AdministradorTIEvaluadores,
        layout: "/portal",
        perfil: "administrador_ti",
    },
    {
        path: "/administradorTI/administrarAdministradores",
        name: "Administradores",
        icon: "nc-icon nc-key-25",
        component: AdministradorTIAdministradores,
        layout: "/portal",
        perfil: "administrador_ti",
    },
];
export default routes;
