export function putEvaluador(token, newEvaluador, idEvaluador) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-ti/evaluadores/${idEvaluador}`;

    return fetch(FetchURL, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
        },
        body: JSON.stringify(newEvaluador),
    })
        .then((response) => response.json())
        .then((resp) => {
            return resp;
        })
        .catch((err) => {
            return err;
        });
}
