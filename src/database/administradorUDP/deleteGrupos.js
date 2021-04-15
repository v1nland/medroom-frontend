export function deleteGrupos(token, idCurso, idGrupo) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-academica/me/cursos/${idCurso}/grupos/${idGrupo}`;

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
