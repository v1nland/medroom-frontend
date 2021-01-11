export function formatPeriodos(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        table_data.push({});
        table_data[i]["key"] = i;
        table_data[i]["id"] = data[i]["id"];
        table_data[i]["nombre_periodo"] = data[i]["nombre_periodo"];
    }
    return table_data;
}
