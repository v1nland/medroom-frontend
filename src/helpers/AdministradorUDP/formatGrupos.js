export function formatGrupos(data) {
    var table_data = [];
    var non_SG = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i]["sigla_grupo"] !== "SG") {
            table_data.push({});
            table_data[i - non_SG]["id"] = data[i]["id"];
            table_data[i - non_SG]["nombre_grupo"] = data[i]["nombre_grupo"];
            table_data[i - non_SG]["sigla_grupo"] = data[i]["sigla_grupo"];
            table_data[i - non_SG]["id_curso"] = data[i]["id_curso"];
        } else non_SG++;
    }

    return table_data;
}
