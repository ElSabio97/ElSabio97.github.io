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
    const lines = text.split('\n').filter(line => line.trim() !== '');
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n`;

    lines.forEach(line => {
        const [code, type, startDate, startTime, endDate, endTime, from, to, flightNumber] = line.trim().split(/\s+/);
        
        // Solo para eventos con código "CO" (vuelos en este caso)
        if (code === 'CO') {
            const start = formatICSTime(startDate, startTime);
            const end = formatICSTime(endDate, endTime);

            icsContent += `BEGIN:VEVENT\n`;
            icsContent += `UID:${start}\n`;
            icsContent += `DTSTAMP:${start}${end}\n`;
            icsContent += `DTSTART:${start}\n`;
            icsContent += `DTEND:${end}\n`;
            icsContent += `SUMMARY:Vuelo de ${from} a ${to}\n`;
            if (flightNumber) {
                icsContent += `DESCRIPTION:Numero de vuelo: ${flightNumber}\n`;
            }
            icsContent += `LOCATION:${from} a ${to}\n`;
            icsContent += `END:VEVENT\n`;
        }
    });

    icsContent += `END:VCALENDAR`;
    return icsContent;
}

// Formatear fecha y hora en formato ICS
function formatICSTime(date, time) {
    const [day, month, year] = date.split('/');
    const [hour, minute] = time.split(':');
    return `${year}${month}${day}T${hour}${minute}00Z`; // Usamos formato UTC
}

