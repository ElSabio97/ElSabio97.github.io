import { funciones, parse_calendar, build_type_subtype_map } from "./funciones.js";

const type_subtype_map = build_type_subtype_map();

console.log(type_subtype_map)

document.getElementById('pasteButton').addEventListener('click', async () => {
    try {
        // Solicita acceso al portapapeles y pega el contenido
        const text = await navigator.clipboard.readText();

        // Mostrar el contenido pegado
        document.getElementById('output').textContent = text;

        // Convertir el texto a formato ICS
        const icsData = convertToICS(text);

        // Crear un archivo descargable
        const blob = new Blob([icsData], { type: 'text/calendar' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'eventos.ics';

        // Agregar el enlace al DOM temporalmente y hacer click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
    }
});

// Función para convertir el texto pegado en formato ICS
function convertToICS(text) {
    // const lines = text.split('\n').filter(line => line.trim() !== '');
    const lines = parse_calendar(text);
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n`;

    lines.forEach(line => {

        const [code_ser, code_fun, startDate, endDate, from, to, tip_cur, flightNumber, loc] = line.map(item => item.trim());;

        const dbg = [code_ser, code_fun, startDate, endDate, from, to, tip_cur, flightNumber, loc];
        console.log(dbg);

        const start = formatICSTime(startDate);
        const end = formatICSTime(endDate);

        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `UID:${start}${end}\n`;
        icsContent += `DTSTAMP:${start}\n`;
        icsContent += `DTSTART:${start}\n`;
        icsContent += `DTEND:${end}\n`;
        if (code_fun) {
            icsContent += `DESCRIPTION:${funciones[code_fun]}\n`;
        }
        if (flightNumber) {
            icsContent += `SUMMARY:${flightNumber}\n`;
        } else if (code_ser === "CO") {
            icsContent += `SUMMARY:Vuelo\n`;
        } else {
            icsContent += `SUMMARY:${code_ser}\n`;
            icsContent += `DESCRIPTION:${type_subtype_map[code_ser].description.trim()}\n`
        }
        if (from === to) {
            icsContent += `LOCATION:${from}\n`;
        } else {
            icsContent += `LOCATION:${from} a ${to}\n`;

        }
        icsContent += `END:VEVENT\n`;

    });

    icsContent += `END:VCALENDAR`;
    return icsContent;
}

// Función para formatear fecha y hora en formato ICS (YYYYMMDDTHHMMSSZ)
function formatICSTime(datetime) {
    const date = datetime.split(' ')[0];
    const time = datetime.split(' ')[1]
    const [day, month, year] = date.split('/');
    const [hour, minute] = time.split(':');
    return `${year}${month}${day}T${hour}${minute}00Z`; // Ajustar según sea necesario
}
