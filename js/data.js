// DADOS GLOBAIS
let clientes = JSON.parse(localStorage.getItem('bounce_clientes')) || [];

// SALVAR AUTOMÁTICO
function salvar() {
  localStorage.setItem('bounce_clientes', JSON.stringify(clientes));
  atualizarTudo();
}
