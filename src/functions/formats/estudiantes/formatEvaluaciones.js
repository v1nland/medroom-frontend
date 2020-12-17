export function formatEvaluaciones(data) {
    var table_data = [];
    for (var i = 0; i < data.length; i++) {
        table_data.push({});
        table_data[i]["id_evaluacion"] = i;
        table_data[i]["nombre_evaluacion"] = data[i]["nombre_evaluacion"];
        table_data[i]["puntajes_evaluacion"] = data[i]["puntajes_evaluacion"];
        table_data[i]["nombre_periodo"] = data[i]["periodo_evaluacion"]["nombre_periodo"];
        table_data[i]["promedio_evaluacion"] = 0;
        for (let index = 0; index < data[i]["puntajes_evaluacion"].length; index++) {
            table_data[i]["promedio_evaluacion"] += data[i]["puntajes_evaluacion"][index]["calificacion_puntaje"];
        }
        table_data[i]["promedio_evaluacion"] /= data[i]["puntajes_evaluacion"].length;
        table_data[i]["promedio_evaluacion"] = table_data[i]["promedio_evaluacion"].toFixed(1);
    }

    return table_data;
}
