export function disociarGrupoEvaluador(token, idPeriodo, siglaCurso, siglaGrupo, idEvaluador) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-academica/me/cursos/${idPeriodo}/${siglaCurso}/grupos/${siglaGrupo}/evaluadores/${idEvaluador}`;

    return fetch(FetchURL, {
        method: "DELETE",
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
