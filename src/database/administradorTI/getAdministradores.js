export function getAdministradores(token) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-ti/administradores-academicos`;

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
