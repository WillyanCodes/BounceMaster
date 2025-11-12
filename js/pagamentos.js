function renderizarPagamentos() {
  const pagos = clientes.filter(c => c.pago);
  const total = clientes.reduce((s, c) => s + (c.pago ? c.valor : 0), 0);
  document.getElementById('totalValor').textContent = total.toFixed(2);
  document.getElementById('pagosCount').textContent = pagos.length;
  document.getElementById('totalCount').textContent = clientes.length;

  const container = document.getElementById('listaPagamentos');
  container.innerHTML = clientes.map(c => `
    <div class="d-flex justify-content-between align-items-center p-2 border-bottom">
      <div>
        <strong>${c.nome}</strong><br>
        <small>R$ ${c.valor}</small>
      </div>
      <span class="badge ${c.pago ? 'bg-success' : 'bg-warning'}">${c.pago ? 'Pago' : 'Pendente'}</span>
    </div>
  `).join('');
}

function enviarLembrete() {
  const pendentes = clientes.filter(c => !c.pago);
  if (pendentes.length === 0) return alert('Todos os clientes estão em dia!');
  alert(`Lembrete enviado para ${pendentes.length} clientes pendentes!`);
}
