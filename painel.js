// PAINEL DE SENHAS – HELPTECH ANTUNES

const senhaAtualEl = document.getElementById("senhaAtual");
const ultimaSenhaEl = document.getElementById("ultimaSenha");
const listaHistoricoEl = document.getElementById("listaHistorico");
const somChamada = document.getElementById("somChamada");

// Lista de senhas já chamadas
let historico = JSON.parse(localStorage.getItem("painelHistorico")) || [];

// Atualiza painel imediatamente ao abrir
atualizarPainel();

/**
 * Escutar alterações no localStorage (quando o cardápio gera nova senha)
 */
window.addEventListener("storage", (event) => {
  if (event.key === "senhaChamada") {
    const novaSenha = event.newValue;
    if (novaSenha) chamarSenha(novaSenha);
  }
});

/**
 * Função principal: chamar senha no painel
 */
function chamarSenha(senha) {
  // Atualiza senha atual
  senhaAtualEl.textContent = senha;

  // Atualiza última senha
  if (historico.length > 0) {
    ultimaSenhaEl.textContent = "Última chamada: " + historico[historico.length - 1];
  }

  // Adiciona ao histórico
  historico.push(senha);
  localStorage.setItem("painelHistorico", JSON.stringify(historico));

  atualizarHistoricoVisual();

  // Toca som
  somChamada.currentTime = 0;
  somChamada.play();
}

/**
 * Atualiza histórico visual no painel
 */
function atualizarHistoricoVisual() {
  listaHistoricoEl.innerHTML = "";
  historico.slice(-12).reverse().forEach(s => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.textContent = s;
    listaHistoricoEl.appendChild(div);
  });
}

/**
 * Atualiza painel ao carregar ou atualizar
 */
function atualizarPainel() {
  if (historico.length > 0) {
    senhaAtualEl.textContent = historico[historico.length - 1];
    ultimaSenhaEl.textContent = "Última chamada: " +
      (historico.length > 1 ? historico[historico.length - 2] : "Nenhuma");
  }

  atualizarHistoricoVisual();
}
