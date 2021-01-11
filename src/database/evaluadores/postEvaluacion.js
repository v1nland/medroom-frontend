export function postEvaluacion(token, newEvaluacion, idCurso, idGrupo) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/evaluadores/me/cursos/${idCurso}/grupos/${idGrupo}/evaluaciones`;

    return fetch(FetchURL, {
        method: "POST",
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
