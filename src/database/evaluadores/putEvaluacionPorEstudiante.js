export function putEvaluacionPorEstudiante(token, idCurso, idGrupo, idEstudiante, idEvaluacion, newEvaluacion) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/evaluadores/me/cursos/${idCurso}/grupos/${idGrupo}/estudiantes/${idEstudiante}/evaluaciones/${idEvaluacion}/calificacion`;

    return fetch(FetchURL, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
        },
        body: JSON.stringify(newEvaluacion),
    })
        .then((response) => response.json())
        .then((resp) => {
            return resp;
        })
        .catch((err) => {
            return err;
        });
}
