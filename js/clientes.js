let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

function salvarClientes() {
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

function adicionarCliente() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  if (!nome || !email) return alert('Nome e email obrigatórios!');

  clientes.push({ id: Date.now(), nome, email, telefone, pago: false, valor: 150 });
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('telefone').value = '';
  salvarClientes();
  atualizarTudo();
}

function filtrarClientes() {
  const termo = document.getElementById('busca').value.toLowerCase();
  renderizarClientes(clientes.filter(c => c.nome.toLowerCase().includes(termo)));
}

function renderizarClientes(lista) {
  const container = document.getElementById('listaClientes');
  container.innerHTML = lista.map(c => `
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>${c.nome}</strong><br>
        <small>${c.email} | ${c.telefone || '—'}</small>
      </div>
      <button class="btn btn-sm ${c.pago ? 'btn-success' : 'btn-warning'}" onclick="togglePagamento(${c.id})">
        ${c.pago ? 'Pago' : 'Pendente'}
      </button>
    </div>
  `).join('');
}

function togglePagamento(id) {
  const cliente = clientes.find(c => c.id === id);
  cliente.pago = !cliente.pago;
  salvarClientes();
  atualizarTudo();
}

function exportarCSV() {
  const csv = 'Nome,Email,Telefone,Status,Valor\n' + 
    clientes.map(c => `${c.nome},"${c.email}",${c.telefone || ''},${c.pago ? 'Pago' : 'Pendente'},R$ ${c.valor}`).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'clientes.csv'; a.click();
}
