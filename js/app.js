let chart;

function atualizarTudo() {
  renderizarClientes(clientes);
  renderizarPagamentos();
  atualizarDashboard();
}

function atualizarDashboard() {
  document.getElementById('totalClientes').textContent = clientes.length;
  document.getElementById('clientesPagos').textContent = clientes.filter(c => c.pago).length;
  document.getElementById('clientesPendentes').textContent = clientes.filter(c => !c.pago).length;

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
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
}

// Chat IA
const mensagens = document.getElementById('mensagens');
const respostas = ["Cliente adicionado!", "Pagamento atualizado.", "Relatório gerado.", "Tudo salvo!"];

function enviarMensagem() {
  const input = document.getElementById('msgInput');
  const texto = input.value.trim();
  if (!texto) return;

  mensagens.innerHTML += `<div class="msg user">${texto}</div>`;
  setTimeout(() => {
    mensagens.innerHTML += `<div class="msg ia">${respostas[Math.floor(Math.random() * respostas.length)]}</div>`;
    mensagens.scrollTop = mensagens.scrollHeight;
  }, 800);
  input.value = '';
  mensagens.scrollTop = mensagens.scrollHeight;
}

// Inicializar
atualizarTudo();
