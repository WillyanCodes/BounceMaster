let chart;

function mostrarAba(aba) {
  document.querySelectorAll('.aba').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));

  document.getElementById(`aba-${aba}`).classList.add('active');
  const link = document.querySelector(`a[onclick="mostrarAba('${aba}')"]`);
  if (link) link.classList.add('active');

  // FORÇA ATUALIZAÇÃO
  setTimeout(() => {
    if (aba === 'clientes') renderizarClientes();
    if (aba === 'pagamentos') renderizarPagamentos();
    if (aba === 'dashboard') atualizarDashboard();
    if (aba === 'chat') renderizarChat();
  }, 10);
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

  limparFormulario();
  salvar();
}

function limparFormulario() {
  document.getElementById('novo-nome').value = '';
  document.getElementById('novo-email').value = '';
  document.getElementById('novo-tel').value = '';
}

function renderizarClientes() {
  const lista = document.getElementById('lista-clientes');
  const termo = document.getElementById('busca-cliente').value.toLowerCase();
  const filtrados = clientes.filter(c => c.nome.toLowerCase().includes(termo));

  lista.innerHTML = filtrados.length === 0 
    ? '<p class="text-muted p-3">Nenhum cliente cadastrado.</p>'
    : filtrados.map(c => `
      <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
        <div class="flex-grow-1">
          <strong>${c.nome}</strong><br>
          <small class="text-muted">${c.email} | ${c.telefone || '—'}</small>
        </div>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-primary" onclick="abrirEdicao(${c.id})">Editar</button>
          <button class="btn btn-sm ${c.pago ? 'btn-success' : 'btn-warning'}" onclick="togglePago(${c.id})">
            ${c.pago ? 'Pago' : 'Pendente'}
          </button>
          <button class="btn btn-sm btn-danger" onclick="deletarCliente(${c.id})">×</button>
        </div>
      </div>
    `).join('');
}

function abrirEdicao(id) {
  const cliente = clientes.find(c => c.id === id);
  if (!cliente) return;

  const novoNome = prompt('Editar nome:', cliente.nome);
  if (novoNome === null) return;
  const novoEmail = prompt('Editar email:', cliente.email);
  if (novoEmail === null) return;
  const novoTel = prompt('Editar telefone:', cliente.telefone || '');

  cliente.nome = novoNome.trim() || cliente.nome;
  cliente.email = novoEmail.trim() || cliente.email;
  cliente.telefone = novoTel?.trim() || cliente.telefone;

  salvar();
}

function togglePago(id) {
  const c = clientes.find(x => x.id === id);
  if (c) c.pago = !c.pago;
  salvar();
}

function deletarCliente(id) {
  if (confirm('Tem certeza que deseja excluir este cliente?')) {
    clientes = clientes.filter(x => x.id !== id);
    salvar();
  }
}

function filtrarClientes() {
  renderizarClientes();
}

function renderizarPagamentos() {
  const container = document.getElementById('lista-pagamentos');
  const total = clientes.reduce((s, c) => s + (c.pago ? c.valor : 0), 0);
  const pagos = clientes.filter(c => c.pago).length;

  container.innerHTML = `
    <div class="alert alert-primary mb-3">
      <h5>Pagamentos - Novembro 2025</h5>
      <p class="mb-0"><strong>Total Recebido:</strong> R$ ${total.toFixed(2)}</p>
      <p class="mb-0"><strong>Clientes Pagos:</strong> ${pagos} / ${clientes.length}</p>
    </div>
    <div class="list-group">
      ${clientes.length === 0 
        ? '<div class="list-group-item text-center text-muted">Nenhum cliente.</div>'
        : clientes.map(c => `
          <div class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>${c.nome}</strong><br>
              <small>R$ ${c.valor.toFixed(2)}</small>
            </div>
            <span class="badge ${c.pago ? 'bg-success' : 'bg-warning'} fs-6 px-3 py-2">
              ${c.pago ? 'Pago' : 'Pendente'}
            </span>
          </div>
        `).join('')}
    </div>
    <button class="btn btn-warning mt-3 w-100" onclick="enviarLembrete()">
      Enviar Lembrete para Pendentes
    </button>
  `;
}

function enviarLembrete() {
  const pendentes = clientes.filter(c => !c.pago);
  if (pendentes.length === 0) {
    alert('Todos os clientes estão em dia!');
  } else {
    alert(`Lembrete enviado para ${pendentes.length} clientes pendentes!`);
  }
}

function atualizarDashboard() {
  const total = clientes.length;
  const pagos = clientes.filter(c => c.pago).length;
  const pendentes = total - pagos;

  document.getElementById('total-clientes').textContent = total;
  document.getElementById('clientes-pagos').textContent = pagos;
  document.getElementById('clientes-pendentes').textContent = pendentes;

  const ctx = document.getElementById('grafico').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pagos', 'Pendentes'],
      datasets: [{
        data: [pagos, pendentes],
        backgroundColor: ['#10B981', '#F59E0B'],
        borderWidth: 3,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

function renderizarChat() {
  const mensagens = document.getElementById('chat-mensagens');
  mensagens.innerHTML = `
    <div class="msg-ia p-3 rounded bg-light mb-2">Olá! Sou o assistente virtual. Como posso ajudar?</div>
  `;
}

function enviarChat() {
  const input = document.getElementById('chat-input');
  const texto = input.value.trim();
  if (!texto) return;

  const mensagens = document.getElementById('chat-mensagens');
  mensagens.innerHTML += `<div class="msg-user p-3 rounded bg-primary text-white mb-2 text-end">${texto}</div>`;
  input.value = '';

  setTimeout(() => {
    const respostas = [
      "Cliente atualizado com sucesso!",
      "Pagamento registrado.",
      "Relatório gerado.",
      "Tudo funcionando!"
    ];
    mensagens.innerHTML += `<div class="msg-ia p-3 rounded bg-light mb-2">${respostas[Math.floor(Math.random() * respostas.length)]}</div>`;
    mensagens.scrollTop = mensagens.scrollHeight;
  }, 800);
}

function salvar() {
  localStorage.setItem('bounce_clientes', JSON.stringify(clientes));
  atualizarTudo();
}

function atualizarTudo() {
  const abaAtiva = document.querySelector('.aba.active')?.id;
  if (abaAtiva === 'aba-clientes') renderizarClientes();
  if (abaAtiva === 'aba-pagamentos') renderizarPagamentos();
  if (abaAtiva === 'aba-dashboard') atualizarDashboard();
  if (abaAtiva === 'aba-chat') renderizarChat();
}

// INICIAR
document.addEventListener('DOMContentLoaded', () => {
  mostrarAba('clientes');
  atualizarTudo();
});
