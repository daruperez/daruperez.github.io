import { renderizarPDF } from './pdf.js';

export function crearCard(item, contenedor, escapeHTML) {
    const { titulo, archivo, fecha, descripcion } = item;

    const card = document.createElement('div');
    card.className = 'pdf-card colapsado';

    card.innerHTML = `
        <div class="info-pdf">
            <div>
                <div class="titulo-archivo">${titulo}</div>
                <div style="font-size:11px;opacity:0.6;">
                    ${new Date(fecha).toLocaleString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
            <button class="btn-leer-mas">Leer</button>
        </div>

        <div class="descripcion">${escapeHTML(descripcion || '')}</div>
        <div class="visor-pdf"></div>
    `;

    contenedor.appendChild(card);

    const visor = card.querySelector('.visor-pdf');
    const btn = card.querySelector('.btn-leer-mas');

    let cargado = false;

    btn.onclick = async () => {
        const abierto = card.classList.contains('expandido');

        document.querySelectorAll('.pdf-card.expandido').forEach(c => {
            c.classList.replace('expandido', 'colapsado');
            c.querySelector('button').innerText = 'Leer';
        });

        if (!abierto) {
            btn.disabled = true;
            btn.innerText = 'Cargando...';

            card.classList.replace('colapsado', 'expandido');

            if (!cargado) {
                await renderizarPDF(archivo, visor);
                cargado = true;
            }

            btn.disabled = false;
            btn.innerText = 'Cerrar';

            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth' });
            }, 50);

        } else {
            card.classList.replace('expandido', 'colapsado');
            btn.innerText = 'Leer';
        }
    };
}