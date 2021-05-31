export function formatCursos(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        table_data.push({});
        table_data[i]["id"] = data[i]["id"];
        table_data[i]["nombre_curso"] = data[i]["nombre_curso"];
        table_data[i]["id_periodo"] = data[i]["id_periodo"];
        table_data[i]["estado_curso"] = data[i]["estado_curso"];
        table_data[i]["sigla_curso"] = data[i]["sigla_curso"];
        table_data[i]["grupos_curso"] = data[i]["grupos_curso"].length - 1;
    }

    return table_data;
}
