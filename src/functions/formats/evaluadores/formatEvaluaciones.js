export function formatEvaluaciones(data) {
    var table_data = {
        labels: [],
        datasets: [],
    };

    if (data["eje_x"].length === 0) return table_data;

    table_data["labels"] = data["eje_x"];
    if (data === null) {
        return table_data;
    }

    var promedios = {
        data: [],
        fill: true,
        borderColor: "#fbc658",
        backgroundColor: "#fbc658",
        pointBorderColor: "#fbc658",
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
        label: "Promedio",
    };
    for (var valor in data["valores"]) {
        promedios["data"].push(data["valores"][valor][0]["promedio_grupo"].toFixed(2));
    }
    table_data["datasets"].push(promedios);

    return table_data;
}
