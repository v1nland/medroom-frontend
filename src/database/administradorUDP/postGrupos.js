export function postGrupos(token, newGrupo, idPeriodo, siglaCurso) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-academica/me/cursos/${idPeriodo}/${siglaCurso}/grupos`;

    return fetch(FetchURL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
        },
        body: JSON.stringify(newGrupo),
    })
        .then((response) => response.json())
        .then((resp) => {
            return resp;
        })
        .catch((err) => {
            return err;
        });
}
