export function getEvolucionPorCompetencia(token, idPeriodo, siglaCurso, siglaGrupo) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/evaluadores/me/cursos/${idPeriodo}/${siglaCurso}/grupos/${siglaGrupo}/estadisticas/evolucion-competencia`;

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
