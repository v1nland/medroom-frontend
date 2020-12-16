export function formatGrupo(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        table_data.push({});
        table_data[i]["id_grupo"] = data[i]["id_grupo"];
        table_data[i]["nombres_estudiante"] = data[i]["nombres_estudiante"];
        table_data[i]["apellidos_estudiante"] = data[i]["apellidos_estudiante"];
        table_data[i]["correo_electronico_estudiante"] = data[i]["correo_electronico_estudiante"];
    }

    return table_data;
}
