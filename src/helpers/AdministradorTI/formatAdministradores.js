export function formatAdministradores(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        table_data.push({});
        table_data[i]["id"] = data[i]["id"];
        table_data[i]["nombres_administrador_academico"] = data[i]["nombres_administrador_academico"];
        table_data[i]["apellidos_administrador_academico"] = data[i]["apellidos_administrador_academico"];
        table_data[i]["correo_electronico_administrador_academico"] = data[i]["correo_electronico_administrador_academico"];
        table_data[i]["rut_administrador_academico"] = data[i]["rut_administrador_academico"];
        table_data[i]["telefono_celular_administrador_academico"] = data[i]["telefono_celular_administrador_academico"];
        table_data[i]["telefono_fijo_administrador_academico"] = data[i]["telefono_fijo_administrador_academico"];
    }

    return table_data;
}
