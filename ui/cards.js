export function renderCard(item, onOpen) {

    const card = document.createElement('div');
    card.className = 'pdf-card colapsado';

    const visor = document.createElement('div');
    visor.className = 'visor-pdf';

    card.innerHTML = `
        <div class="info-pdf">
            <div>
                <div class="titulo-archivo"></div>
                <div style="font-size:11px;opacity:0.6;">
                    ${new Date(item.fecha).toLocaleString('es-ES')}
                </div>
            </div>
            <button>Abrir</button>
        </div>
    `;

    card.querySelector('.titulo-archivo').textContent = item.titulo;

    const btn = card.querySelector('button');

    let open = false;
    let loaded = false;

    btn.onclick = async () => {

        document.querySelectorAll('.pdf-card').forEach(c => {
            c.classList.remove('expandido');
            c.classList.add('colapsado');
            c.querySelector('button').innerText = 'Abrir';
            c.querySelector('.visor-pdf').style.display = 'none';
        });

        open = !open;

        if (open) {
            card.classList.add('expandido');
            card.classList.remove('colapsado');

            btn.innerText = 'Cerrar';
            visor.style.display = 'block';

            if (!loaded) {
                await onOpen(item.archivo, visor);
                loaded = true;
            }
        }
    };

    card.appendChild(visor);

    return card;
}