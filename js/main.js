let chart;

// MOSTRAR ABA
function mostrarAba(aba) {
  document.querySelectorAll('.aba').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));
  document.getElementById(`aba-${aba}`).classList.add('active');
  document.querySelector(`a[href="#${aba}"]`).classList.add('active');
  if (aba === 'dashboard') atualizarDashboard();
  if (aba === 'clientes') renderizarClientes();
  if (aba === 'pagamentos') renderizarPagamentos();
}

// ADICIONAR CLIENTE
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

// RENDERIZAR CLIENTES
function renderizarClientes() {
  const lista = document.getElementById('lista-clientes');
  const termo = document.getElementById('busca-cliente').value.toLowerCase();
  const filtrados = clientes.filter(c => c.nome.toLowerCase().includes(termo));

  lista.innerHTML = filtrados.map(c => `
    <div class="list-group-item d-flex justify-content-between align-items-center">
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

// TOGGLE PAGO
function togglePago(id) {
  const c = clientes.find(x => x.id === id);
  c.pago = !c.pago;
  salvar();
}

// DELETAR CLIENTE
function deletarCliente(id) {
  clientes = clientes.filter(x => x.id !== id);
  salvar();
}

// FILTRAR
function filtrarClientes() {
  renderizarClientes();
}

// RENDERIZAR PAGAMENTOS
function renderizarPagamentos() {
  const container = document.getElementById('lista-pagamentos');
  const total = clientes.reduce((s, c) => s + (c.pago ? c.valor : 0), 0);
  const pagos = clientes.filter(c => c.pago).length;

  container.innerHTML = `
    <p><strong>Total Recebido:</strong> R$ ${total.toFixed(2)}</p>
    <p><strong>Pagos:</strong> ${pagos} / ${clientes.length}</p>
    <div class="mt-3">
      ${clientes.map(c => `
        <div class="d-flex justify-content-between p-2 border-bottom">
          <span><strong>${c.nome}</strong> - R$ ${c.valor}</span>
          <span class="badge ${c.pago ? 'bg-success' : 'bg-warning'}">${c.pago ? 'Pago' : 'Pendente'}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// LEMBRETE
function enviarLembrete() {
  const pendentes = clientes.filter(c => !c.pago).length;
  alert(pendentes > 0 ? `Lembrete enviado para ${pendentes} clientes!` : 'Todos em dia!');
}

// DASHBOARD
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

// CHAT IA
function enviarChat() {
  const input = document.getElementById('chat-input');
  const texto = input.value.trim();
  if (!texto) return;

  const msgs = document.getElementById('chat-mensagens');
  msgs.innerHTML += `<div class="msg-user">${texto}</div>`;
  input.value = '';

  setTimeout(() => {
    const respostas = ["Cliente salvo!", "Pagamento atualizado.", "Relatório pronto.", "Tudo certo!"];
    msgs.innerHTML += `<div class="msg-ia">${respostas[Math.floor(Math.random() * respostas.length)]}</div>`;
    msgs.scrollTop = msgs.scrollHeight;
  }, 800);
}

// EXPORTAR CSV
function exportarCSV() {
  const csv = 'Nome,Email,Telefone,Status,Valor\n' +
    clientes.map(c => `${c.nome},"${c.email}",${c.telefone || ''},${c.pago ? 'Pago' : 'Pendente'},${c.valor}`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'clientes.csv'; a.click();
}

// ATUALIZAR TUDO
function atualizarTudo() {
  renderizarClientes();
  renderizarPagamentos();
  atualizarDashboard();
}

// INICIAR
document.addEventListener('DOMContentLoaded', () => {
  mostrarAba('clientes');
  atualizarTudo();
});
