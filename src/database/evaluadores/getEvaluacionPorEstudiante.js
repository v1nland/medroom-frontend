export function getEvaluacionPorEstudiante(token, idPeriodo, siglaCurso, siglaGrupo, idEstudiante) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/evaluadores/me/cursos/${idPeriodo}/${siglaCurso}/grupos/${siglaGrupo}/estudiantes/${idEstudiante}/evaluaciones-rendidas`;

    return fetch(FetchURL, {
        method: "GET",
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
