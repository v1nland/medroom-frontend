export function formatGraficoCompetencias(data) {
    var graphic_data = {
        labels: [],
        datasets: [
            {
                label: "Puntaje Obtenido",
                data: [],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };

    var labels = [];
    var puntajes = [];

    for (let i = 0; i < data.length; i++) {
        labels.push(data[i]["competencia_puntaje"]["nombre_competencia"]);
        puntajes.push(data[i]["calificacion_puntaje"]);
    }
    graphic_data["labels"] = labels;
    graphic_data["datasets"][0]["data"] = puntajes;

    return graphic_data;
}
