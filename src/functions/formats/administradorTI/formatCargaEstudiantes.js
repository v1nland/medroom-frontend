import { sha256 } from "js-sha256";
export function formatCargaEstudiantes(data) {
    var estudiantes = [];
    var i = 0;
    data.forEach((estudiante) => {
        estudiantes.push({});
        estudiantes[i]["id_grupos"] = estudiante["id_grupos"];
        estudiantes[i]["rut_estudiante"] = String(estudiante["rut"]);
        estudiantes[i]["nombres_estudiante"] = estudiante["nombres"];
        estudiantes[i]["apellidos_estudiante"] = estudiante["apellidos"];
        estudiantes[i]["hash_contrasena_estudiante"] = sha256(String(estudiante["rut"]));
        estudiantes[i]["correo_electronico_estudiante"] = estudiante["correo"];
        estudiantes[i]["telefono_fijo_estudiante"] = String(estudiante["telefono_fijo"]) ?? "";
        estudiantes[i]["telefono_telefono_celular"] = String(estudiante["telefono_celular"]) ?? "";
        ++i;
    });
    return { estudiantes: estudiantes };
}
