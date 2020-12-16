export function loginEvaluador(user, password) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/login-evaluador`;

    var data = {
        correo_electronico_estudiante: user,
        hash_contrasena_estudiante: password,
    };

    return fetch(FetchURL, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((resp) => {
            return resp;
        })
        .catch((err) => {
            return err;
        });
}
