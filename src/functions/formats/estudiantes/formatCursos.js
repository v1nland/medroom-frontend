export function formatCursos(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        table_data.push({});
        table_data[i]["id"] = data[i]["id"];
        table_data[i]["key"] = i;
        table_data[i]["grupos_curso"] = data[i]["grupos_curso"];
        table_data[i]["nombre_curso"] = data[i]["nombre_curso"];
        table_data[i]["periodo_curso"] = data[i]["id_periodo"];
        table_data[i]["sigla_curso"] = data[i]["sigla_curso"];
    }

    return table_data;
}
