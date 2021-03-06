export function formatEstudiantes(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        table_data.push({});
        table_data[i]["id"] = data[i]["id"];
        table_data[i]["nombres_estudiante"] = data[i]["nombres_estudiante"];
        table_data[i]["apellidos_estudiante"] = data[i]["apellidos_estudiante"];
        table_data[i]["correo_electronico_estudiante"] = data[i]["correo_electronico_estudiante"];
        table_data[i]["rut_estudiante"] = data[i]["rut_estudiante"];
        table_data[i]["telefono_celular_estudiante"] = data[i]["telefono_celular_estudiante"];
        table_data[i]["telefono_fijo_estudiante"] = data[i]["telefono_fijo_estudiante"];
    }

    return table_data;
}
