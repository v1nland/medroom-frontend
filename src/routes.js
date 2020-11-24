import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import EstudiantePerfil from "views/Estudiante/Perfil.js";
import EstudianteGrupo from "views/Estudiante/Grupo.js";
import EstudianteEvaluacion from "views/Estudiante/Evaluacion.js";
import EvaluadorPerfil from "views/Evaluador/Perfil.js";
import EvaluadorGrupo from "views/Evaluador/Grupo.js";
import EvaluadorEvaluacion from "views/Evaluador/Evaluacion.js";
import EvaluadorReporte from "views/Evaluador/Reporte.js";

var routes = [
    {
        path: "/estudiante/perfil",
        name: "Mi perfil",
        icon: "nc-icon nc-single-02",
        component: EstudiantePerfil,
        layout: "/portal",
    },
    {
        path: "/estudiante/grupo",
        name: "Mi grupo",
        icon: "nc-icon nc-badge",
        component: EstudianteGrupo,
        layout: "/portal",
    },
    {
        path: "/estudiante/evaluacion",
        name: "Mis evaluaciones",
        icon: "nc-icon nc-paper",
        component: EstudianteEvaluacion,
        layout: "/portal",
    },
    {
        path: "/evaluador/perfil",
        name: "Mi perfil",
        icon: "nc-icon nc-single-02",
        component: EvaluadorPerfil,
        layout: "/portal",
    },
    {
        path: "/evaluador/grupo",
        name: "Mi grupo",
        icon: "nc-icon nc-badge",
        component: EvaluadorGrupo,
        layout: "/portal",
    },
    {
        path: "/evaluador/evaluacion",
        name: "Realizar Evaluacion",
        icon: "nc-icon nc-ruler-pencil",
        component: EvaluadorEvaluacion,
        layout: "/portal",
    },
    {
        path: "/evaluador/reporte",
        name: "Ver reportes",
        icon: "nc-icon nc-single-copy-04",
        component: EvaluadorReporte,
        layout: "/portal",
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-bank",
        component: Dashboard,
        layout: "/portal",
    },
    {
        path: "/icons",
        name: "Icons",
        icon: "nc-icon nc-diamond",
        component: Icons,
        layout: "/portal",
    },
    {
        path: "/maps",
        name: "Maps",
        icon: "nc-icon nc-pin-3",
        component: Maps,
        layout: "/portal",
    },
    {
        path: "/notifications",
        name: "Notifications",
        icon: "nc-icon nc-bell-55",
        component: Notifications,
        layout: "/portal",
    },
    {
        path: "/user-page",
        name: "User Profile",
        icon: "nc-icon nc-single-02",
        component: UserPage,
        layout: "/portal",
    },
    {
        path: "/tables",
        name: "Table List",
        icon: "nc-icon nc-tile-56",
        component: TableList,
        layout: "/portal",
    },
    {
        path: "/typography",
        name: "Typography",
        icon: "nc-icon nc-caps-small",
        component: Typography,
        layout: "/portal",
    },
];
export default routes;
