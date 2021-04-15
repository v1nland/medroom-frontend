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
    for (var i = 0; i < 6; i++) {
        table_data["datasets"].push({
            data: [],
            fill: false,
            borderColor: "#fbc658",
            backgroundColor: "transparent",
            pointBorderColor: "#fbc658",
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            label: "",
        });
    }
    for (i = 0; i < data["valores"]["ANAM"].length; i++) {
        table_data["datasets"][0]["data"].push(data["valores"]["ANAM"][i]["puntaje_estudiante"]);
        table_data["datasets"][0]["borderColor"] = "#072AC8";
        table_data["datasets"][0]["pointBorderColor"] = "#072AC8";
        table_data["datasets"][0]["label"] = "ANAMNESIS";
    }
    for (i = 0; i < data["valores"]["EXFI"].length; i++) {
        table_data["datasets"][1]["data"].push(data["valores"]["EXFI"][i]["puntaje_estudiante"]);
        table_data["datasets"][1]["borderColor"] = "#048A81";
        table_data["datasets"][1]["pointBorderColor"] = "#048A81";
        table_data["datasets"][1]["label"] = "EXPLORACION FISICA";
    }
    for (i = 0; i < data["valores"]["HACO"].length; i++) {
        table_data["datasets"][2]["data"].push(data["valores"]["HACO"][i]["puntaje_estudiante"]);
        table_data["datasets"][2]["borderColor"] = "#F58A07";
        table_data["datasets"][2]["pointBorderColor"] = "#F58A07";
        table_data["datasets"][2]["label"] = "HABILIDADES COMUNICATIVAS";
    }
    for (i = 0; i < data["valores"]["JUCL"].length; i++) {
        table_data["datasets"][3]["data"].push(data["valores"]["JUCL"][i]["puntaje_estudiante"]);
        table_data["datasets"][3]["borderColor"] = "#6F1A07";
        table_data["datasets"][3]["pointBorderColor"] = "#6F1A07";
        table_data["datasets"][3]["label"] = "JUICIO CLINICO";
    }
    for (i = 0; i < data["valores"]["OREF"].length; i++) {
        table_data["datasets"][4]["data"].push(data["valores"]["OREF"][i]["puntaje_estudiante"]);
        table_data["datasets"][4]["borderColor"] = "#A4031F";
        table_data["datasets"][4]["pointBorderColor"] = "#A4031F";
        table_data["datasets"][4]["label"] = "ORGANIZACION Y EFICIENCIA";
    }
    for (i = 0; i < data["valores"]["PROF"].length; i++) {
        table_data["datasets"][5]["data"].push(data["valores"]["PROF"][i]["puntaje_estudiante"]);
        table_data["datasets"][5]["borderColor"] = "#5A0B4D";
        table_data["datasets"][5]["pointBorderColor"] = "#5A0B4D";
        table_data["datasets"][5]["label"] = "PROFESIONALISMO";
    }
    // for (i = 0; i < data["valores"]["VAGL"].length; i++) {
    //     table_data["datasets"][6]["data"].push(data["valores"]["VAGL"][i]["puntaje_estudiante"]);
    //     table_data["datasets"][6]["borderColor"] = "#F90093";
    //     table_data["datasets"][6]["pointBorderColor"] = "#F90093";
    //     table_data["datasets"][6]["label"] = "VALORACION GLOBAL";
    // }

    return table_data;
}
