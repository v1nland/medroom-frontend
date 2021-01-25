export function formatEvaluadores(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        table_data.push({});
        table_data[i]["id"] = data[i]["id"];
        table_data[i]["nombres_evaluador"] = data[i]["nombres_evaluador"];
        table_data[i]["apellidos_evaluador"] = data[i]["apellidos_evaluador"];
        table_data[i]["correo_electronico_evaluador"] = data[i]["correo_electronico_evaluador"];
        table_data[i]["rut_evaluador"] = data[i]["rut_evaluador"];
        table_data[i]["telefono_celular_evaluador"] = data[i]["telefono_celular_evaluador"];
        table_data[i]["telefono_fijo_evaluador"] = data[i]["telefono_fijo_evaluador"];
        table_data[i]["cargo_evaluador"] = data[i]["cargo_evaluador"];
        table_data[i]["recinto_evaluador"] = data[i]["recinto_evaluador"];
    }

    return table_data;
}
