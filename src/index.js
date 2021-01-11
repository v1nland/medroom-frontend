import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login/Login.js";
// import Curso from "views/Estudiante/Curso";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/portal/login" component={Login} />
            {/* <Route path="/portal/estudiante/:idCurso" component={Curso} /> */}
            <Route path="/portal" render={(props) => <AdminLayout {...props} />} />
            <Redirect to="/portal/login" />
        </Switch>
    </Router>,
    document.getElementById("root")
);
