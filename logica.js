// logica.js

document.addEventListener('DOMContentLoaded', () => {

    // ===============================
    // TABS (Carros / Carrinhas)
    // ===============================
    const buttons = document.querySelectorAll('.tab');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // ===============================
    // BOOKING FIXO AO SCROLL
    // ===============================
    const bookingBox = document.querySelector('.booking-box');
    const bookingTrigger = window.innerHeight * 0.6;

    window.addEventListener('scroll', () => {
        if (window.scrollY > bookingTrigger) {
            bookingBox.classList.add('fixed');
        } else {
            bookingBox.classList.remove('fixed');
        }
    });

    // ===============================
    // MENU SANDUÍCHE (FUNCIONAL)
    // ===============================
    const hamburgerBtn = document.getElementById('hamburger');
    const sideMenu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');

    hamburgerBtn.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
    });

    document.querySelectorAll('.side-menu a').forEach(link => {
        link.addEventListener('click', () => {
            sideMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    });

    // ===============================
    // NOVAS FUNCIONALIDADES DE PESQUISA
    // ===============================

    let isDifferentReturn = false;
    let currentCategory = 'Carros'; // atualiza com as tabs
    let tarifaEmpresarialAtiva = false;

    // Elementos do formulário
    const pickupLocationInput = document.querySelector('.field-location input');
    const diffReturnToggle = document.querySelector('.diff-return');
    const showVehiclesBtn = document.querySelector('.field-button button');
    const enterpriseLink = document.querySelector('.enterprise-link');

    // Criar campo de devolução diferente
    const returnLocationField = document.createElement('div');
    returnLocationField.className = 'field field-location return-location-field';
    returnLocationField.style.display = 'none';
    returnLocationField.innerHTML = `
        <label>Local de devolução</label>
        <div class="field-main">
            <input type="text" placeholder="Aeroporto, cidade ou endereço">
            <span class="clear">X</span>
        </div>
    `;

    diffReturnToggle.parentNode.insertBefore(returnLocationField, diffReturnToggle.nextSibling);

    // Valor padrão
    pickupLocationInput.value = 'Porto Aeroporto';

    // Toggle devolução diferente
    diffReturnToggle.addEventListener('click', () => {
        isDifferentReturn = !isDifferentReturn;
        returnLocationField.style.display = isDifferentReturn ? 'block' : 'none';
        diffReturnToggle.querySelector('.mais').textContent = isDifferentReturn ? '−' : '+';
    });

    // Atualizar categoria quando muda tab
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.classList.contains('carros') ? 'Carros' : 'Carrinhas';
        });
    });

    // Tarifa empresarial (clicável)
    enterpriseLink.style.cursor = 'pointer';
    enterpriseLink.addEventListener('click', () => {
        tarifaEmpresarialAtiva = !tarifaEmpresarialAtiva;
        enterpriseLink.textContent = tarifaEmpresarialAtiva 
            ? 'Tarifa empresarial aplicada ✓' 
            : 'Aplicar a tarifa empresarial';
        enterpriseLink.style.color = tarifaEmpresarialAtiva ? '#ff6600' : '#0066cc';
    });

    // ===============================
    // DADOS DOS VEÍCULOS (8 carros + 8 carrinhas)
    // ===============================
    const veiculosDisponiveis = [
        // CARROS (índices 0 a 7)
        { marca: 'Fiat',         modelo: '500',          lugares: 4, portas: 3, transmissao: 'Manual',      ar: true },
        { marca: 'Volkswagen',   modelo: 'Polo',         lugares: 5, portas: 5, transmissao: 'Manual',      ar: true },
        { marca: 'Peugeot',      modelo: '208',          lugares: 5, portas: 5, transmissao: 'Automática',  ar: true },
        { marca: 'Opel',         modelo: 'Corsa',        lugares: 5, portas: 5, transmissao: 'Manual',      ar: true },
        { marca: 'Seat',         modelo: 'Ibiza',        lugares: 5, portas: 5, transmissao: 'Manual',      ar: true },
        { marca: 'Renault',      modelo: 'Clio',         lugares: 5, portas: 5, transmissao: 'Manual',      ar: true },
        { marca: 'Toyota',       modelo: 'Yaris',        lugares: 5, portas: 5, transmissao: 'Automática',  ar: true },
        { marca: 'Hyundai',      modelo: 'i20',          lugares: 5, portas: 5, transmissao: 'Manual',      ar: true },

        // CARRINHAS (índices 8 a 15)
        { marca: 'Citroën',      modelo: 'Berlingo',     lugares: 5, portas: 5, transmissao: 'Manual',      ar: true },
        { marca: 'Ford',         modelo: 'Transit Custom', lugares: 7, portas: 5, transmissao: 'Manual',    ar: true },
        { marca: 'Mercedes',     modelo: 'Vito',         lugares: 8, portas: 5, transmissao: 'Automática',  ar: true },
        { marca: 'Renault',      modelo: 'Trafic',       lugares: 9, portas: 5, transmissao: 'Manual',      ar: true },
        { marca: 'Volkswagen',   modelo: 'Transporter',  lugares: 9, portas: 5, transmissao: 'Manual',      ar: true },
        { marca: 'Peugeot',      modelo: 'Expert',       lugares: 8, portas: 5, transmissao: 'Automática',  ar: true },
        { marca: 'Fiat',         modelo: 'Ducato',       lugares: 9, portas: 5, transmissao: 'Manual',      ar: true },
        { marca: 'Opel',         modelo: 'Vivaro',       lugares: 9, portas: 5, transmissao: 'Automática',  ar: true },
    ];

    // Função para verificar fim de semana
    function isWeekend(date) {
        const day = date.getDay(); // 0 = Domingo, 6 = Sábado
        return day === 0 || day === 6;
    }

    // Cálculo do preço
    function calcularPreco(categoria, dataInicio, dataFim, devolucaoDiferente, empresarial) {
        const umDiaMs = 1000 * 60 * 60 * 24;
        const dias = Math.ceil((dataFim - dataInicio) / umDiaMs);

        const temFimDeSemana = isWeekend(dataInicio) || isWeekend(dataFim);
        const precoDiario = temFimDeSemana
            ? (categoria === 'Carros' ? 15 : 20)
            : (categoria === 'Carros' ? 6 : 12);

        let total = precoDiario * dias;

        if (empresarial) {
            const desconto = dias < 3 ? 0.10 : 0.20;
            total *= (1 - desconto);
        }

        if (devolucaoDiferente) {
            total += 30;
        }

        return {
            dias,
            precoDiario: precoDiario.toFixed(2),
            subtotalBase: (precoDiario * dias).toFixed(2),
            total: total.toFixed(2),
            descontoAplicado: empresarial ? (dias < 3 ? 10 : 20) : 0,
            taxaExtra: devolucaoDiferente ? 30 : 0
        };
    }

    // Botão Mostrar veículos
    showVehiclesBtn.addEventListener('click', () => {
        const recolhaDate = document.querySelectorAll('.field-date')[0].value;
        const recolhaTime = document.querySelectorAll('.field-time')[0].value || '10:00';
        const devolucaoDate = document.querySelectorAll('.field-date')[1].value;
        const devolucaoTime = document.querySelectorAll('.field-time')[1].value || '10:00';

        if (!recolhaDate || !devolucaoDate) {
            alert('Por favor, preencha as datas de recolha e devolução.');
            return;
        }

        const inicio = new Date(`${recolhaDate}T${recolhaTime}`);
        const fim = new Date(`${devolucaoDate}T${devolucaoTime}`);

        if (fim <= inicio) {
            alert('A data/hora de devolução deve ser posterior à de recolha.');
            return;
        }

        const localLevantamento = pickupLocationInput.value.trim() || 'Porto Aeroporto';
        const localDevolucao = isDifferentReturn
            ? returnLocationField.querySelector('input').value.trim() || localLevantamento
            : localLevantamento;

        // Selecionar 4 veículos aleatórios da categoria correta (de entre os 8 disponíveis)
        const inicioIdx = currentCategory === 'Carros' ? 0 : 8;
        const candidatos = veiculosDisponiveis.slice(inicioIdx, inicioIdx + 8);

        const selecionados = [...candidatos]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);

        const precoInfo = calcularPreco(currentCategory, inicio, fim, isDifferentReturn, tarifaEmpresarialAtiva);

        // Remover resultados anteriores
        const resultadosAnteriores = document.getElementById('resultados-veiculos');
        if (resultadosAnteriores) resultadosAnteriores.remove();

        // Criar secção de resultados
        const section = document.createElement('section');
        section.id = 'resultados-veiculos';
        section.className = 'veiculos-resultados';
        section.style.cssText = 'padding: 60px 20px; background: #f9f9f9;';

        let html = `
            <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; color: #ff6600; margin-bottom: 20px; font-size: 32px;">
                    Veículos Disponíveis
                </h2>
                <p style="text-align: center; margin-bottom: 40px; font-size: 18px;">
                    Levantamento: <strong>${localLevantamento}</strong> &nbsp;|&nbsp;
                    Devolução: <strong>${localDevolucao}</strong>
                </p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px;">
        `;

        selecionados.forEach((veiculo, index) => {
            const prefixo = currentCategory === 'Carros' ? 'Carro' : 'Carrinha';
            const numero = `${prefixo}-${index + 1}`;

            html += `
                <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 20px rgba(0,0,0,0.1);">
                    <div style="height: 220px; background: #e5e5e5; display: flex; align-items: center; justify-content: center; font-size: 80px; color: #bbb;">
                        ${veiculo.marca[0]}
                    </div>
                    <div style="padding: 25px;">
                        <h3 style="margin: 0 0 15px; color: #333;">${numero} - ${veiculo.marca} ${veiculo.modelo}</h3>
                        <ul style="list-style: none; padding: 0; margin: 15px 0; color: #555; line-height: 1.8;">
                            <li>👤 ${veiculo.lugares} lugares</li>
                            <li>🚪 ${veiculo.portas} portas</li>
                            <li>⚙️ ${veiculo.transmissao}</li>
                            <li>❄️ Ar condicionado</li>
                        </ul>
                        <div style="border-top: 1px solid #eee; padding-top: 20px;">
                            <p style="margin: 8px 0; color: #666;">Preço diário: <strong>${precoInfo.precoDiario}€</strong></p>
                            <p style="font-size: 28px; color: #ff6600; margin: 15px 0;">
                                <strong>Total: ${precoInfo.total}€</strong>
                                <span style="font-size: 16px; color: #0066cc; cursor: pointer; text-decoration: underline;"
                                      onclick="mostrarDetalhes(this, ${JSON.stringify(precoInfo)})">
                                    (ver detalhes)
                                </span>
                            </p>
                            <button style="width: 100%; padding: 14px; background: #ff6600; color: white; border: none; border-radius: 8px; font-size: 18px; font-weight: bold; cursor: pointer;">
                                Reservar Agora
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        section.innerHTML = html;
        document.querySelector('.hero').insertAdjacentElement('afterend', section);
    });
});

// Função global para mostrar detalhes do preço
function mostrarDetalhes(element, info) {
    const existente = element.parentNode.querySelector('.detalhes-preco');
    if (existente) existente.remove();

    const div = document.createElement('div');
    div.className = 'detalhes-preco';
    div.style.cssText = 'background: #f0f8ff; border: 1px solid #ff6600; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 14px;';

    let texto = `<strong>Detalhes do preço (${info.dias} dia${info.dias > 1 ? 's' : ''}):</strong><br>`;
    texto += `• ${info.dias} × ${info.precoDiario}€/dia = ${info.subtotalBase}€<br>`;

    if (info.descontoAplicado > 0) {
        texto += `• Desconto empresarial (${info.descontoAplicado}%): aplicado<br>`;
    }
    if (info.taxaExtra > 0) {
        texto += `• Taxa devolução em local diferente: +30€<br>`;
    }

    texto += `<strong>Total final: ${info.total}€</strong>`;

    div.innerHTML = texto;
    element.parentNode.appendChild(div);
}