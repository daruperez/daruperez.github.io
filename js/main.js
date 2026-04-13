import { cargarTitulo, cargarActualidad, cargarSeccionUnica } from './data.js';

const tabs = document.querySelectorAll('#tabs a');

tabs.forEach(tab => {
    tab.addEventListener('click', e => {
        e.preventDefault();

        document.querySelectorAll('#tabs a')
            .forEach(t => t.classList.remove('tab-activa'));

        tab.classList.add('tab-activa');

        const seccion = tab.dataset.seccion;

        seccion === 'actualidad'
            ? cargarActualidad()
            : cargarSeccionUnica(seccion);
    });
});

async function cargarVisitas() {
    const res = await fetch("visitas.php");
    const data = await res.json();

    document.getElementById("visitas").innerHTML = `
        Hoy: ${data.dia_count} · 
        Mes: ${data.mes_count} · 
        Año: ${data.anio_count}
    `;
}

// init
cargarTitulo();
cargarVisitas();
cargarActualidad();
