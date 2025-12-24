/* =========================================================
   1) Sandwich menu toggle (hamburger)
   - Em mobile, o CSS esconde o menu.
   - Ao clicar, alterna a classe "active" na lista.
   ========================================================= */
document.getElementById('hamburger').addEventListener('click', function () {
  document.querySelector('.nav-list').classList.toggle('active');
});

/* =========================================================
   2) Show/hide return location
   - O campo "return-loc" começa oculto.
   - Só aparece quando a checkbox está ativa (enunciado).
   ========================================================= */
document.getElementById('different-return').addEventListener('change', function () {
  const returnLabel = document.getElementById('return-label');
  const returnInput = document.getElementById('return-loc');

  if (this.checked) {
    returnLabel.style.display = 'block';
    returnInput.style.display = 'block';
  } else {
    returnLabel.style.display = 'none';
    returnInput.style.display = 'none';
  }
});

/* =========================================================
   3) Tabs Carros/Carrinhas (UI)
   - Atualiza visual (classe .active)
   - Atualiza o <select> categoria (Carro/Carrinha)
   ========================================================= */
const tabs = document.querySelectorAll('.tab');
const categorySelect = document.getElementById('category');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    // Se a tab tiver data-category, atualiza o select
    const cat = tab.getAttribute('data-category');
    if (cat === 'Carro' || cat === 'Carrinha') {
      categorySelect.value = cat;
    }
  });
});

/* =========================================================
   4) Shuffle function (seleção aleatória de 4 de 8 veículos)
   - Opção mais valorizada no enunciado.
   ========================================================= */
function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Troca de posições
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

/* =========================================================
   5) Mostrar veículos (geração dinâmica)
   Regras do enunciado:
   - 4 veículos
   - Número: CATEGORIA-X
   - Preço: fim de semana / semana
   - Desconto empresarial: 10% (<3 dias) ou 20% (>=3 dias)
   - Taxa devolução diferente: +30€ (único)
   - "ver detalhes" mostra breakdown do cálculo
   ========================================================= */
document.getElementById('show-vehicles').addEventListener('click', function () {
  const category = document.getElementById('category').value;
  const pickup = document.getElementById('pickup').value.trim();
  const differentReturn = document.getElementById('different-return').checked;
  const returnLoc = differentReturn ? document.getElementById('return-loc').value.trim() : pickup;

  const pickupDate = document.getElementById('pickup-date').value;
  const pickupTime = document.getElementById('pickup-time').value;
  const returnDate = document.getElementById('return-date').value;
  const returnTime = document.getElementById('return-time').value;

  // Tarifa empresarial (checkbox no layout)
  const enterpriseChecked = document.getElementById('enterprise').checked;

  // Validar campos mínimos
  if (!pickup) {
    alert('Por favor, indique o local de levantamento.');
    return;
  }

  // Construir DateTime a partir de inputs
  const pickupDatetime = new Date(`${pickupDate}T${pickupTime}`);
  const returnDatetime = new Date(`${returnDate}T${returnTime}`);

  // Validar datas (devolução após recolha)
  if (isNaN(pickupDatetime) || isNaN(returnDatetime) || returnDatetime <= pickupDatetime) {
    alert('Por favor, insira datas e horas válidas, com devolução após levantamento.');
    return;
  }

  // Calcular número de dias (arredondado para cima)
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.ceil((returnDatetime - pickupDatetime) / msPerDay);

  // Cálculo do preço dia a dia (breakdown)
  let total = 0;
  const breakdown = [];
  const isVan = category === 'Carrinha';

  let currentDate = new Date(pickupDatetime);

  while (currentDate < returnDatetime) {
    const dayOfWeek = currentDate.getDay();               // 0=domingo, 6=sábado
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // fim de semana?

    // Taxas do enunciado
    const dailyRate = isVan
      ? (isWeekend ? 20 : 12)  // carrinha: 20€ fim de semana; 12€ semana
      : (isWeekend ? 15 : 6);  // carro: 15€ fim de semana; 6€ semana

    total += dailyRate;

    breakdown.push(
      `${currentDate.toLocaleDateString('pt-PT')}: ${dailyRate}€ (${isWeekend ? 'fim de semana' : 'durante a semana'})`
    );

    // Avança 1 dia
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Desconto empresarial (aplica apenas se checkbox estiver ativa)
  if (enterpriseChecked) {
    const discountRate = days < 3 ? 0.1 : 0.2;
    const discount = total * discountRate;

    total -= discount;

    breakdown.push(`Desconto empresarial (${discountRate * 100}%): -${discount.toFixed(2)}€`);
  }

  // Taxa devolução diferente (+30€) se locais diferentes
  if (differentReturn && pickup !== returnLoc) {
    total += 30;
    breakdown.push('Taxa de devolução em local diferente: +30€');
  }

  // Preço final
  const averageDaily = (total / days).toFixed(2);
  const totalPrice = total.toFixed(2);

  // Conjunto de 8 veículos (conforme enunciado)
  const allVehicles = isVan
    ? ['VW Transporter', 'Mercedes Vito', 'Ford Transit', 'Renault Trafic', 'Citroen Jumpy', 'Peugeot Expert', 'Toyota Proace', 'Fiat Ducato']
    : ['Fiat 500', 'VW Polo', 'Toyota Corolla', 'BMW 3 Series', 'Mercedes C-Class', 'Audi A4', 'Ford Focus', 'Renault Clio'];

  // Seleciona 4 aleatórios
  const selectedVehicles = shuffle([...allVehicles]).slice(0, 4);

  // Render dos cards
  const vehiclesContainer = document.getElementById('vehicles');
  vehiclesContainer.innerHTML = '';

  selectedVehicles.forEach((model, index) => {
    // Número do veículo (CATEGORIA-X)
    const vehicleNum = `${category}-${index + 1}`;


    
// =========================
// MENU SANDWICH LATERAL
// =========================
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');

hamburger.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
});


    // Card
    const card = document.createElement('div');
    card.classList.add('vehicle-card');

    // HTML do card (sem imagens reais; estrutura)
    card.innerHTML = `
      <h3>${vehicleNum}</h3>
      <p><strong>Marca e modelo:</strong> ${model}</p>
      <p><strong>Local levantamento/entrega:</strong> ${pickup} / ${returnLoc}</p>
      <p>
        <strong>Diário médio:</strong> ${averageDaily}€ |
        <strong>Total:</strong> ${totalPrice}€
        <a href="#" class="ver-detalhes">(ver detalhes)</a>
      </p>
      <div class="details">${breakdown.join('<br>')}</div>
    `;

    // Toggle de detalhes
    card.querySelector('.ver-detalhes').addEventListener('click', function (e) {
      e.preventDefault();

      const details = card.querySelector('.details');
      details.style.display = details.style.display === 'block' ? 'none' : 'block';
    });

    vehiclesContainer.appendChild(card);
  });
});
