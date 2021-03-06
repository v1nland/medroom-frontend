export function asociarCursoAdministrador(token, idCurso, idAdministrador) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-ti/cursos/${idCurso}/administradores-academicos/${idAdministrador}`;

    return fetch(FetchURL, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
        },
    })
        .then((response) => response.json())
        .then((resp) => {
            return resp;
        })
        .catch((err) => {
            return err;
        });
}
