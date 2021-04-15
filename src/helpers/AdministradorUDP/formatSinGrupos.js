export function formatSinGrupos(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i]["sigla_grupo"] === "SG") {
            return data[i];
        }
    }
    return table_data;
}
