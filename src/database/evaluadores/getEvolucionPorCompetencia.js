export function getEvolucionPorCompetencia(token, idCurso, idGrupo) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/evaluadores/me/cursos/${idCurso}/grupos/${idGrupo}/estadisticas/evolucion-competencia`;

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
