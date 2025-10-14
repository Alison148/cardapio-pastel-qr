// =============================
// 🍔 CARDÁPIO HELPTECH ANTUNES COMPLETO
// =============================

// ===== CONFIGURAÇÕES =====
const PHONE_WHATSAPP = "5511957805217"; // número com DDI + DDD
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// =============================
// 📦 DADOS DO CARDÁPIO
// =============================

// --- Pastéis Salgados ---
const MENU_PASTEIS = [
  { id: 1, name: "Pastel de Carne", desc: "Carne moída temperada", price: 12, tag: "pastel" },
  { id: 2, name: "Pastel de Queijo", desc: "Mussarela derretida", price: 11, tag: "pastel" },
  { id: 3, name: "Pastel de Frango c/ Catupiry", desc: "Frango desfiado + requeijão", price: 14, tag: "pastel" },
  { id: 4, name: "Pastel de Calabresa", desc: "Calabresa fatiada + mussarela", price: 13, tag: "pastel" },
  { id: 5, name: "Pastel de Pizza", desc: "Mussarela, presunto, tomate e orégano", price: 14, tag: "pastel" },
  { id: 6, name: "Pastel de Camarão", desc: "Camarão ao alho + catupiry", price: 18, tag: "pastel" },
  { id: 7, name: "Pastel de Carne Seca", desc: "Carne seca com queijo coalho", price: 17, tag: "pastel" },
  { id: 8, name: "Pastel Vegetariano", desc: "Brócolis, milho, ervilha e queijo", price: 13, tag: "pastel" }
];

// --- Pastéis Doces ---
const MENU_PASTEIS_DOCES = [
  { id: 101, name: "Pastel Doce de Chocolate", desc: "Chocolate derretido + granulado", price: 12, tag: "pastel-doce" },
  { id: 102, name: "Pastel de Banana c/ Canela", desc: "Banana, açúcar e canela", price: 11, tag: "pastel-doce" },
  { id: 103, name: "Romeu & Julieta", desc: "Goiabada com queijo", price: 12, tag: "pastel-doce" }
];

// --- Refrigerantes ---
const MENU_REFRIGERANTES = [
  { id: 201, name: "Coca-Cola Lata", desc: "350ml gelada", price: 6, tag: "bebida" },
  { id: 202, name: "Guaraná Antarctica Lata", desc: "350ml gelada", price: 6, tag: "bebida" },
  { id: 203, name: "Fanta Laranja Lata", desc: "350ml gelada", price: 6, tag: "bebida" },
  { id: 204, name: "Coca-Cola 2L", desc: "Garrafa 2 litros", price: 12, tag: "bebida" },
  { id: 205, name: "Guaraná 2L", desc: "Garrafa 2 litros", price: 11, tag: "bebida" },
  { id: 206, name: "Água Mineral", desc: "Sem gás 500ml", price: 4, tag: "bebida" }
];

// --- Cervejas ---
const MENU_CERVEJAS = [
  { id: 301, name: "Skol Lata", desc: "Lata 350ml", price: 7, tag: "cerveja" },
  { id: 302, name: "Brahma Lata", desc: "Lata 350ml", price: 7, tag: "cerveja" },
  { id: 303, name: "Heineken Long Neck", desc: "330ml gelada", price: 10, tag: "cerveja" },
  { id: 304, name: "Stella Artois Long Neck", desc: "330ml gelada", price: 10, tag: "cerveja" },
  { id: 305, name: "Original 600ml", desc: "Garrafa 600ml", price: 12, tag: "cerveja" }
];

// --- Espetinhos ---
const MENU_ESPETINHOS = [
  { id: 401, name: "Espetinho de Frango", desc: "Com farofa e vinagrete", price: 9, tag: "espetinho" },
  { id: 402, name: "Espetinho de Carne", desc: "Com farofa e vinagrete", price: 10, tag: "espetinho" },
  { id: 403, name: "Espetinho de Linguiça", desc: "Com farofa e vinagrete", price: 9, tag: "espetinho" },
  { id: 404, name: "Queijo Coalho no Espeto", desc: "Assado na brasa", price: 8, tag: "espetinho" }
];

// --- Combos Promocionais ---
const MENU_COMBOS = [
  { id: 501, name: "Combo Pastel + Refri", desc: "Qualquer pastel + refri lata", price: 16, tag: "promo" },
  { id: 502, name: "Combo 2 Pasteis + Refri 2L", desc: "2 pasteis + Coca 2L", price: 35, tag: "promo" },
  { id: 503, name: "Combo Espetinho + Cerveja", desc: "Espetinho à escolha + cerveja lata", price: 15, tag: "promo" }
];

// Junta tudo no menu geral
const MENU = [
  ...MENU_PASTEIS,
  ...MENU_PASTEIS_DOCES,
  ...MENU_REFRIGERANTES,
  ...MENU_CERVEJAS,
  ...MENU_ESPETINHOS,
  ...MENU_COMBOS
];

// =============================
// 🧭 VARIÁVEIS E ELEMENTOS
// =============================
let cart = [];
const menuContainer = document.getElementById("menu-sections");
const cartList = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const searchInput = document.getElementById("searchInput");
const chips = Array.from(document.querySelectorAll(".chip"));
const checkoutBtn = document.getElementById("checkoutBtn");
const printBtn = document.getElementById("printBtn");

const clientNameEl = document.getElementById("clientName");
const orderTypeEl = document.getElementById("orderType");
const addressEl = document.getElementById("address");
const notesEl = document.getElementById("notes");

// =============================
// 🧾 RENDERIZAÇÃO DO CARDÁPIO
// =============================
function cardHTML(item) {
  return `
    <div class="col">
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="card-title mb-1 text-success">${item.name}</h5>
            <span class="badge bg-light text-dark">${item.tag}</span>
          </div>
          <p class="card-text text-muted mb-2">${item.desc}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div class="price fw-bold">${BRL.format(item.price)}</div>
            <button class="btn btn-success btn-sm" data-add="${item.id}">
              <i class="bi bi-plus-circle"></i> Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderMenu(list) {
  menuContainer.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      ${list.map(cardHTML).join("")}
    </div>
  `;

  // Eventos dos botões "Adicionar"
  menuContainer.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.add)));
  });
}

// =============================
// 🛒 CARRINHO
// =============================
function renderCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qtd;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <div>
        <strong>${item.qtd}x</strong> ${item.name}
        <small class="text-muted d-block">${BRL.format(item.price)} cada</small>
      </div>
      <div class="d-flex align-items-center">
        <button class="btn btn-sm btn-outline-secondary me-2" data-dec="${item.id}">−</button>
        <button class="btn btn-sm btn-outline-secondary me-2" data-inc="${item.id}">+</button>
        <span class="fw-bold me-2">${BRL.format(item.price * item.qtd)}</span>
        <button class="btn btn-sm btn-danger" data-del="${item.id}">✖</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  cartTotalEl.textContent = BRL.format(total);

  cartList.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => removeFromCart(Number(b.dataset.del))));
  cartList.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => changeQty(Number(b.dataset.inc), +1)));
  cartList.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => changeQty(Number(b.dataset.dec), -1)));
}

// =============================
// 🧮 LÓGICA DO CARRINHO
// =============================
function addToCart(id) {
  const item = MENU.find(x => x.id === id);
  if (!item) return;
  const found = cart.find(c => c.id === id);
  if (found) found.qtd++;
  else cart.push({ ...item, qtd: 1 });
  renderCart();
}

function changeQty(id, delta) {
  const i = cart.findIndex(c => c.id === id);
  if (i < 0) return;
  cart[i].qtd += delta;
  if (cart[i].qtd <= 0) cart.splice(i, 1);
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

// =============================
// 🔍 FILTROS E BUSCA
// =============================
function applyFilters() {
  const term = (searchInput.value || "").toLowerCase().trim();
  const activeChip = document.querySelector(".chip.active");
  const tag = activeChip ? activeChip.dataset.filter : "todos";

  const filtered = MENU.filter(it => {
    const matchTag = tag === "todos" ? true : it.tag === tag;
    const matchText = term
      ? it.name.toLowerCase().includes(term) || it.desc.toLowerCase().includes(term)
      : true;
    return matchTag && matchText;
  });

  renderMenu(filtered);
}

searchInput.addEventListener("input", applyFilters);
chips.forEach(ch => ch.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("active"));
  ch.classList.add("active");
  applyFilters();
}));

// =============================
// 🚚 ENDEREÇO DE ENTREGA
// =============================
orderTypeEl.addEventListener("change", () => {
  const entrega = orderTypeEl.value === "Entrega";
  addressEl.disabled = !entrega;
  if (!entrega) addressEl.value = "";
});

// =============================
// 💬 FINALIZAR PEDIDO (WhatsApp)
// =============================
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return alert("Carrinho vazio!");

  const clientName = clientNameEl.value.trim();
  if (!clientName) return alert("Digite seu nome antes de finalizar o pedido!");

  const orderType = orderTypeEl.value;
  const address = addressEl.value.trim();
  if (orderType === "Entrega" && !address) return alert("Informe o endereço para entrega.");

  const notes = notesEl.value.trim();

  // Montar mensagem WhatsApp
  let lines = [];
  lines.push("*Pedido HelpTech Antunes*");
  lines.push(`👤 Cliente: ${clientName}`);
  lines.push(`🧾 Tipo: ${orderType}`);
  if (orderType === "Entrega") lines.push(`📍 Endereço: ${address}`);
  if (notes) lines.push(`📝 Obs.: ${notes}`);
  lines.push("");

  cart.forEach(c => lines.push(`${c.qtd}x ${c.name} — ${BRL.format(c.price * c.qtd)}`));

  const total = cart.reduce((s, c) => s + c.price * c.qtd, 0);
  lines.push("");
  lines.push(`*Total: ${BRL.format(total)}*`);
  lines.push("");
  lines.push("Quero finalizar o pedido.");

  const msg = encodeURIComponent(lines.join("\n"));
  window.open(`https://wa.me/${PHONE_WHATSAPP}?text=${msg}`, "_blank");
});

// =============================
// 🖨️ IMPRESSÃO DO PEDIDO
// =============================
function buildReceiptHTML({ cliente, tipo, endereco, obs, itens, total }) {
  return `
  <html><head><meta charset="utf-8"><title>Pedido</title></head>
  <body>
    <h2>HelpTech Antunes – Pedido</h2>
    <p><b>Cliente:</b> ${cliente}</p>
    <p><b>Tipo:</b> ${tipo}</p>
    ${tipo === "Entrega" ? `<p><b>Endereço:</b> ${endereco}</p>` : ""}
    ${obs ? `<p><b>Obs:</b> ${obs}</p>` : ""}
    <hr>
    <ul>
      ${itens.map(c => `<li>${c.qtd}x ${c.name} — ${BRL.format(c.price * c.qtd)}</li>`).join("")}
    </ul>
    <h3>Total: ${BRL.format(total)}</h3>
    <script>window.print()</script>
  </body></html>`;
}

printBtn.addEventListener("click", () => {
  if (cart.length === 0) return alert("Carrinho vazio!");
  const clientName = clientNameEl.value.trim();
  if (!clientName) return alert("Digite seu nome!");
  const orderType = orderTypeEl.value;
  const address = addressEl.value.trim();
  if (orderType === "Entrega" && !address) return alert("Informe o endereço!");
  const notes = notesEl.value.trim();
  const total = cart.reduce((s, c) => s + c.price * c.qtd, 0);
  const html = buildReceiptHTML({ cliente: clientName, tipo: orderType, endereco: address, obs: notes, itens: cart, total });
  const w = window.open("", "_blank");
  w.document.open();
  w.document.write(html);
  w.document.close();
});

// =============================
// 🚀 INICIALIZAÇÃO
// =============================
renderMenu(MENU);
renderCart();
applyFilters();
