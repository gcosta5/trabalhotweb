/* =========================
   TABS (Carros / Carrinhas)
   ========================= */
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {

        // Remove active de todas
        tabs.forEach(t => t.classList.remove('active'));

        // Ativa a clicada
        tab.classList.add('active');
    });
});

/* =========================
   VALIDAÇÃO DO FORMULÁRIO
   ========================= */
const form = document.getElementById('booking-form');
const msg = document.getElementById('mensagem');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura de valores
    const local = document.getElementById('local').value;
    const recolha = document.getElementById('data-recolha').value;
    const devolucao = document.getElementById('data-devolucao').value;

    // Validação simples
    if (!local || !recolha || !devolucao) {
        msg.textContent = 'Por favor, preencha todos os campos.';
        msg.style.color = 'red';
        return;
    }

    // Sucesso
    msg.textContent = 'Pesquisa efetuada com sucesso!';
    msg.style.color = 'green';
});
