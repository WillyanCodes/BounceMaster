let chart;

function mostrarAba(aba) {
  // Remove active de todas as abas e links
  document.querySelectorAll('.aba').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));

  // Ativa a aba e o link
  document.getElementById(`aba-${aba}`).classList.add('active');
  const link = document.querySelector(`a[onclick="mostrarAba('${aba}')"]`);
  if (link) link.classList.add('active');

  // Atualiza conteúdo da aba
  if (aba === 'clientes') renderizarClientes();
  if (aba === 'pagamentos') renderizarPagamentos();
  if (aba === 'dashboard') atualizarDashboard();
  if (aba === 'chat') renderizarChat();
}

function adicionarCliente() {
  const nome = document.getElementById('novo-nome').value.trim();
  const email = document.getElementById('novo-email').value.trim();
  const tel = document.getElementById('novo-tel').value.trim();
  if (!nome || !email) return alert('Nome e email obrigatórios!');

  clientes.push({
    id: Date.now(),
    nome,
    email,
    telefone: tel,
    pago: false,
    valor: 150
  });

  document.getElementById('novo-nome').value = '';
  document.getElementById('novo-email').value = '';
  document.getElementById('novo-tel').value = '';

  salvar();
}

function renderizarClientes() {
  const lista = document.getElementById('lista-clientes');
  const termo = document.getElementById('busca-cliente').value.toLowerCase();
  const filtrados = clientes.filter(c => c.nome.toLowerCase().includes(termo));

  lista.innerHTML = filtrados.length === 0 
    ? '<p class="text-muted">Nenhum cliente cadastrado.</p>'
    : filtrados.map(c => `
      <div class="d-flex justify-content-between align-items-center p-2 border-bottom">
        <div>
          <strong>${c.nome}</strong><br>
          <small>${c.email} | ${c.telefone || '—'}</small>
        </div>
        <div>
          <button class="btn btn-sm ${c.pago ? 'btn-success' : 'btn-warning'}" onclick="togglePago(${c.id})">
            ${c.pago ? 'Pago' : 'Pendente'}
          </button>
          <button class="btn btn-sm btn-danger" onclick="deletarCliente(${c.id})">×</button>
        </div>
      </div>
    `).join('');
}

function togglePago(id) {
  const c = clientes.find(x => x.id === id);
  if (c) c.pago = !c.pago;
  salvar();
}

function deletarCliente(id) {
  clientes = clientes.filter(x => x.id !== id);
  salvar();
}

function filtrarClientes() {
  renderizarClientes();
}

function renderizarPagamentos() {
  const container = document.getElementById('lista-pagamentos');
  const total = clientes.reduce((s, c) => s + (c.pago ? c.valor : 0), 0);
  const pagos = clientes.filter(c => c.pago).length;

  container.innerHTML = `
    <div class="alert alert-info">
      <strong>Total Recebido:</strong> R$ ${total.toFixed(2)} | 
      <strong>Pagos:</strong> ${pagos} / ${clientes.length}
    </div>
    <div class="mt-3">
      ${clientes.length === 0 ? '<p class="text-muted">Nenhum cliente.</p>' : clientes.map(c => `
        <div class="d-flex justify-content-between p-2 border-bottom">
          <span><strong>${c.nome}</strong> - R$ ${c.valor}</span>
          <span class="badge ${c.pago ? 'bg-success' : 'bg-warning'}">${c.pago ? 'Pago' : 'Pendente'}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function enviarLembrete() {
  const pendentes = clientes.filter(c => !c.pago).length;
  alert(pendentes > 0 
    ? `Lembrete enviado para ${pendentes} clientes pendentes!` 
    : 'Todos os clientes estão em dia!'
  );
}

function atualizarDashboard() {
  document.getElementById('total-clientes').textContent = clientes.length;
  document.getElementById('clientes-pagos').textContent = clientes.filter(c => c.pago).length;
  document.getElementById('clientes-pendentes').textContent = clientes.filter(c => !c.pago).length;

  const ctx = document.getElementById('grafico').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pagos', 'Pendentes'],
      datasets: [{
        data: [clientes.filter(c => c.pago).length, clientes.filter(c => !c.pago).length],
        backgroundColor: ['#10B981', '#F59E0B']
      }]
    },
    options: { responsive: true }
  });
}

function renderizarChat() {
  const mensagens = document.getElementById('chat-mensagens');
  mensagens.innerHTML = `<div class="msg-ia">Olá! Sou o assistente virtual. Como posso ajudar?</div>`;
}

function enviarChat() {
  const input = document.getElementById('chat-input');
  const texto = input.value.trim();
  if (!texto) return;

  const mensagens = document.getElementById('chat-mensagens');
  mensagens.innerHTML += `<div class="msg-user">${texto}</div>`;
  input.value = '';

  setTimeout(() => {
    const respostas = [
      "Cliente salvo com sucesso!",
      "Pagamento atualizado.",
      "Relatório gerado.",
      "Tudo funcionando!"
    ];
    mensagens.innerHTML += `<div class="msg-ia">${respostas[Math.floor(Math.random() * respostas.length)]}</div>`;
    mensagens.scrollTop = mensagens.scrollHeight;
  }, 800);
}

function atualizarTudo() {
  renderizarClientes();
  renderizarPagamentos();
  if (document.getElementById('aba-dashboard').classList.contains('active')) {
    atualizarDashboard();
  }
  if (document.getElementById('aba-chat').classList.contains('active')) {
    renderizarChat();
  }
}

// INICIAR
document.addEventListener('DOMContentLoaded', () => {
  mostrarAba('clientes');
  atualizarTudo();
});
