import EstudiantePerfil from "views/Estudiante/Perfil.js";
import EstudianteCursos from "views/Estudiante/Cursos.js";
import EstudianteCurso from "views/Estudiante/Curso.js";
import EvaluadorPerfil from "views/Evaluador/Perfil.js";
import EvaluadorEvaluacion from "views/Evaluador/Evaluacion.js";
import EvaluadorModificarEvaluacion from "views/Evaluador/ModificarEvaluacion.js";
// import EvaluadorReporte from "views/Evaluador/Reporte.js";
import EvaluadorCurso from "views/Evaluador/Curso.js";
import EvaluadorCursos from "views/Evaluador/Cursos.js";
import AdministradorUDPPerfil from "views/AdministradorUDP/Perfil.js";
import AdministradorUDPCursos from "views/AdministradorUDP/Cursos.js";
import AdministradorUDPCurso from "views/AdministradorUDP/Curso.js";
import AdministradorTIPerfil from "views/AdministradorTI/Perfil.js";
import AdministradorTICursos from "views/AdministradorTI/CrearCursos.js";
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
        path: "/estudiante/tablero",
        name: "Tablero de cursos",
        icon: "nc-icon nc-badge",
        component: EstudianteCursos,
        layout: "/portal",
        perfil: "estudiante",
    },
    {
        path: "/estudiante/periodos/:idPeriodo/cursos/:siglaCurso/grupo/:siglaGrupo",
        name: "No mostrar1",
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
        path: "/evaluador/cursos/:idCurso",
        name: "No mostrar2",
        icon: "nc-icon nc-single-copy-04",
        component: EvaluadorCurso,
        layout: "/portal",
        perfil: "evaluador",
    },
    {
        path: "/evaluador/tablero",
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
        path: "/evaluador/modificar/evaluacion",
        name: "Modificar Evaluacion",
        icon: "nc-icon nc-ruler-pencil",
        component: EvaluadorModificarEvaluacion,
        layout: "/portal",
        perfil: "evaluador",
    },
    // {
    //     path: "/evaluador/reporte",
    //     name: "Ver reportes",
    //     icon: "nc-icon nc-single-copy-04",
    //     component: EvaluadorReporte,
    //     layout: "/portal",
    //     perfil: "evaluador",
    // },
    // {
    //     path: "/evaluador/agregar",
    //     name: "Agregar evaluación",
    //     icon: "nc-icon nc-single-copy-04",
    //     layout: "/portal",
    //     perfil: "evaluador",
    // },
    {
        path: "/administradorUDP/perfil",
        name: "Mi perfil",
        icon: "nc-icon nc-badge",
        component: AdministradorUDPPerfil,
        layout: "/portal",
        perfil: "administrador_academico",
    },
    {
        path: "/administradorUDP/tablero",
        name: "Tablero de cursos",
        icon: "nc-icon nc-vector",
        component: AdministradorUDPCursos,
        layout: "/portal",
        perfil: "administrador_academico",
    },
    {
        path: "/administradorUDP/cursos/:idCurso",
        name: "No mostrar3",
        icon: "nc-icon nc-single-copy-04",
        component: AdministradorUDPCurso,
        layout: "/portal",
        perfil: "evaluador",
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
        path: "/administradorTI/crearCursos",
        name: "Crear Cursos",
        icon: "nc-icon nc-book-bookmark",
        component: AdministradorTICursos,
        layout: "/portal",
        perfil: "administrador_ti",
    },
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
