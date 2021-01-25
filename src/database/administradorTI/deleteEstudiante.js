export function deleteEstudiante(token, idEstudiante) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-ti/estudiantes/${idEstudiante}`;

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
