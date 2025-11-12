let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let ordemAtual = "nome";
let ordemAsc = true;

const form = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
const pesquisa = document.getElementById("pesquisa");

function salvarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

function renderizarClientes(filtro = "") {
    listaClientes.innerHTML = "";
    let dados = clientes
        .filter(c =>
            c.nome.toLowerCase().includes(filtro) ||
            c.empresa.toLowerCase().includes(filtro)
        )
        .sort((a, b) => {
            let valA = a[ordemAtual].toLowerCase();
            let valB = b[ordemAtual].toLowerCase();
            return ordemAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        });

    dados.forEach((c, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>${c.telefone}</td>
            <td>${c.empresa}</td>
            <td>${c.observacoes}</td>
            <td class="acoes">
                <button class="editar" onclick="editarCliente(${i})">Editar</button>
                <button class="excluir" onclick="excluirCliente(${i})">Excluir</button>
            </td>
        `;
        listaClientes.appendChild(tr);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const novoCliente = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        empresa: document.getElementById("empresa").value,
        observacoes: document.getElementById("observacoes").value
    };
    clientes.push(novoCliente);
    salvarClientes();
    renderizarClientes();
    form.reset();
});

function editarCliente(index) {
    const c = clientes[index];
    document.getElementById("nome").value = c.nome;
    document.getElementById("email").value = c.email;
    document.getElementById("telefone").value = c.telefone;
    document.getElementById("empresa").value = c.empresa;
    document.getElementById("observacoes").value = c.observacoes;
    clientes.splice(index, 1);
    salvarClientes();
    renderizarClientes();
}

function excluirCliente(index) {
    if (confirm("Deseja realmente excluir este cliente?")) {
        clientes.splice(index, 1);
        salvarClientes();
        renderizarClientes();
    }
}

pesquisa.addEventListener("input", () => renderizarClientes(pesquisa.value.toLowerCase()));

function ordenarPor(campo) {
    if (ordemAtual === campo) {
        ordemAsc = !ordemAsc;
    } else {
        ordemAtual = campo;
        ordemAsc = true;
    }
    renderizarClientes(pesquisa.value.toLowerCase());
}

function exportarCSV() {
    if (clientes.length === 0) {
        alert("Não há clientes para exportar.");
        return;
    }

    const cabecalho = "Nome,Email,Telefone,Empresa,Observações\n";
    const linhas = clientes.map(c =>
        `${c.nome},${c.email},${c.telefone},${c.empresa},${c.observacoes.replace(/,/g, ";")}`
    );
    const conteudo = cabecalho + linhas.join("\n");

    const blob = new Blob([conteudo], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "clientes.csv";
    link.click();
}

renderizarClientes();
