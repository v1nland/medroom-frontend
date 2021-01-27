export function loginAdministradorTI(user, password) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-ti/login`;

    var data = {
        correo_electronico_administrador_ti: user,
        hash_contrasena_administrador_ti: password,
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
