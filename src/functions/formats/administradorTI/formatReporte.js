export function formatReporte(data) {
    var table_data = [];
    var contador_reportes = 0;

    data.forEach((estudiante) => {
        estudiante["evaluaciones"].forEach((evaluacion) => {
            table_data.push({});
            table_data[contador_reportes]["Nombres"] = estudiante["nombres"];
            table_data[contador_reportes]["Apellidos"] = estudiante["apellidos"];
            table_data[contador_reportes]["RUT"] = estudiante["rut"];
            table_data[contador_reportes]["Curso"] = estudiante["curso"];
            table_data[contador_reportes]["Grupo"] = estudiante["grupo"];
            table_data[contador_reportes]["Nombres evaluador"] = evaluacion["nombres_evaluador"];
            table_data[contador_reportes]["Apellidos evaluador"] = evaluacion["apellidos_evaluador"];
            table_data[contador_reportes]["Evaluacion"] = evaluacion["nombre_evaluacion"];
            table_data[contador_reportes]["Valoracion general"] = evaluacion["valoracion_general"];
            evaluacion["puntajes"].forEach((puntaje) => {
                if (puntaje["competencia"] === "ANAMNESIS") {
                    table_data[contador_reportes]["Anamnesis"] = puntaje["calificacion"];
                } else if (puntaje["competencia"] === "EXPLORACION FISICA") {
                    table_data[contador_reportes]["Exploración Física"] = puntaje["calificacion"];
                } else if (puntaje["competencia"] === "PROFESIONALISMO") {
                    table_data[contador_reportes]["Profesionalismo"] = puntaje["calificacion"];
                } else if (puntaje["competencia"] === "JUICIO CLINICO") {
                    table_data[contador_reportes]["Juicio Clínico"] = puntaje["calificacion"];
                } else if (puntaje["competencia"] === "HABILIDADES COMUNICATIVAS") {
                    table_data[contador_reportes]["Habilidades Comunicativas"] = puntaje["calificacion"];
                } else if (puntaje["competencia"] === "ORGANIZACION Y EFICIENCIA") {
                    table_data[contador_reportes]["Organización y eficiencia"] = puntaje["calificacion"];
                }
            });
            contador_reportes++;
        });
    });

    return table_data;
}
