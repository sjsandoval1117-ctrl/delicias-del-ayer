const url_sheets_delicias = "https://docs.google.com/spreadsheets/d/1HCSHwSnkFtoK-RkbXXPJCRziZ8QwVKCCeeBbBQLayhw/gviz/tq?tqx=out:json&gid=0";

async function cargarTablaDelicias() {
    try {
        const respuesta = await fetch(url_sheets_delicias);
        if (!respuesta.ok) throw new Error("Error en la solicitud");

        const textoCrudo = await respuesta.text();

        const jsonLimpio = textoCrudo
            .replace("/*O_o*/", "")
            .replace("google.visualization.Query.setResponse(", "")
            .slice(0, -2);

        const objetoDatos = JSON.parse(jsonLimpio);
        const filas = objetoDatos.table.rows;

        const contenedorTabla = document.getElementById("datos-tabla");
        contenedorTabla.innerHTML = "";

        filas.forEach(fila => {
   
            const idCelda = fila.c[0] ? fila.c[0].v : "";
            const nombreCelda = fila.c[1] ? fila.c[1].v : "";
            const ingredientesCelda = fila.c[2] ? fila.c[2].v : "";

            const filaHTML = `
                <tr>
                    <td>${idCelda}</td>
                    <td>${nombreCelda}</td>
                    <td>${ingredientesCelda}</td>
                </tr>
            `;

            contenedorTabla.innerHTML += filaHTML;
        });

    } catch (error) {
        console.error("Error cargando los datos de Delicias del Ayer:", error);
    }
}

document.getElementById("tabla-registros").addEventListener("click", cargarTablaDelicias);