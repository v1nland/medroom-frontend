export function asociarCursoEstudiante(token, idPeriodo, siglaCurso, idEstudiante) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-ti/cursos/${idPeriodo}/${siglaCurso}/estudiantes/${idEstudiante}`;

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
