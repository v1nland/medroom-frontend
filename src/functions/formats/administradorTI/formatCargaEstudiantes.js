export function formatCargaEstudiantes(data) {
    var estudiantes = [];
    var i = 0;
    data.forEach((estudiante) => {
        estudiantes.push({});
        estudiantes[i]["grupo"] = {
            id_periodo: estudiante["id_periodo"],
            sigla_curso: estudiante["sigla_curso"],
            sigla_grupo: estudiante["sigla_grupo"],
        };
        estudiantes[i]["rut_estudiante"] = String(estudiante["rut"]);
        estudiantes[i]["nombres_estudiante"] = estudiante["nombres"];
        estudiantes[i]["apellidos_estudiante"] = estudiante["apellidos"];
        estudiantes[i]["correo_electronico_estudiante"] = estudiante["correo"];
        estudiantes[i]["telefono_fijo_estudiante"] = String(estudiante["telefono_fijo"]) ?? "";
        estudiantes[i]["telefono_celular_estudiante"] = String(estudiante["telefono_celular"]) ?? "";
        ++i;
    });
    return { estudiantes: estudiantes };
}
