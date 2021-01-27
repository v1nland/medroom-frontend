export function loginAdministradorUDP(user, password) {
    var FetchURL = `${process.env.REACT_APP_APIURL}/administracion-academica/login`;

    var data = {
        correo_electronico_administrador_academico: user,
        hash_contrasena_administrador_academico: password,
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
