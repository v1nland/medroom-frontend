export function cargarEstudiantes(token, archivoCSV) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-ti/carga-masiva/estudiantes`;

    return fetch(FetchURL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
        },
        body: JSON.stringify(archivoCSV),
    })
        .then((response) => response.json())
        .then((resp) => {
            return resp;
        })
        .catch((err) => {
            return err;
        });
}
