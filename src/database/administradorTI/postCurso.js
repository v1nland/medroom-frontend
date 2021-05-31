export function postCurso(token, newCurso, idPeriodo) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-ti/cursos/${idPeriodo}`;

    return fetch(FetchURL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
        },
        body: JSON.stringify(newCurso),
    })
        .then((response) => response.json())
        .then((resp) => {
            return resp;
        })
        .catch((err) => {
            return err;
        });
}
