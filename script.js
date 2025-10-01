// Config loja
const CONFIG = {
  shopName: "Pastelaria Antunes",
  address: "Rua Central, 123 - Jundiaí/SP",
  phone: "5511957805217" // formato DDI + DDD + número
};

// Formatação moeda
const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// Itens do menu
// === PASTEIS ===
const MENU_PASTEIS = [
  { id: 1, name: "Pastel de Carne", desc: "Carne moída temperada", price: 12, tag: "pastel" },
  { id: 2, name: "Pastel de Queijo", desc: "Mussarela derretida", price: 11, tag: "pastel" },
  { id: 3, name: "Pastel de Frango c/ Catupiry", desc: "Frango desfiado + requeijão", price: 14, tag: "pastel" },
  { id: 4, name: "Pastel de Calabresa", desc: "Calabresa fatiada + mussarela", price: 13, tag: "pastel" },
  { id: 5, name: "Pastel de Pizza", desc: "Mussarela, presunto, tomate e orégano", price: 14, tag: "pastel" },
  { id: 6, name: "Pastel de Camarão", desc: "Camarão ao alho + catupiry", price: 18, tag: "pastel" },
  { id: 7, name: "Pastel de Carne Seca", desc: "Carne seca com queijo coalho", price: 17, tag: "pastel" },
  { id: 8, name: "Pastel Vegetariano", desc: "Brócolis, milho, ervilha e queijo", price: 13, tag: "pastel" },
  { id: 9, name: "Pastel Doce de Chocolate", desc: "Chocolate derretido + granulado", price: 12, tag: "pastel-doce" },
  { id: 10, name: "Pastel de Banana c/ Canela", desc: "Banana, açúcar e canela", price: 11, tag: "pastel-doce" }
];

// === BEBIDAS REFRIGERANTES ===
const MENU_REFRIGERANTES = [
  { id: 20, name: "Coca-Cola Lata", desc: "350ml bem gelada", price: 6, tag: "bebida" },
  { id: 21, name: "Guaraná Antarctica Lata", desc: "350ml bem gelada", price: 6, tag: "bebida" },
  { id: 22, name: "Fanta Laranja Lata", desc: "350ml bem gelada", price: 6, tag: "bebida" },
  { id: 23, name: "Coca-Cola 2L", desc: "Garrafa 2 litros", price: 12, tag: "bebida" },
  { id: 24, name: "Guaraná 2L", desc: "Garrafa 2 litros", price: 11, tag: "bebida" }
];

// === CERVEJAS ===
const MENU_CERVEJAS = [
  { id: 30, name: "Skol Lata", desc: "Lata 350ml", price: 7, tag: "cerveja" },
  { id: 31, name: "Brahma Lata", desc: "Lata 350ml", price: 7, tag: "cerveja" },
  { id: 32, name: "Heineken Long Neck", desc: "330ml gelada", price: 10, tag: "cerveja" },
  { id: 33, name: "Stella Artois Long Neck", desc: "330ml gelada", price: 10, tag: "cerveja" },
  { id: 34, name: "Original 600ml", desc: "Garrafa 600ml", price: 12, tag: "cerveja" }
];

// === ESPETINHOS ===
const MENU_ESPETINHOS = [
  { id: 40, name: "Espetinho de Frango", desc: "Com farofa e vinagrete", price: 9, tag: "espetinho" },
  { id: 41, name: "Espetinho de Carne", desc: "Com farofa e vinagrete", price: 10, tag: "espetinho" },
  { id: 42, name: "Espetinho de Linguiça", desc: "Com farofa e vinagrete", price: 9, tag: "espetinho" },
  { id: 43, name: "Espetinho de Queijo Coalho", desc: "Assado na brasa", price: 8, tag: "espetinho" }
];

// === COMBOS / PROMOÇÕES ===
const MENU_COMBOS = [
  { id: 50, name: "Combo Pastel + Refri", desc: "Qualquer pastel + refrigerante lata", price: 16, tag: "promo" },
  { id: 51, name: "Combo 2 Pasteis + Refri 2L", desc: "2 pasteis + Coca 2L", price: 35, tag: "promo" },
  { id: 52, name: "Combo Espetinho + Cerveja", desc: "Espetinho à escolha + cerveja lata", price: 15, tag: "promo" }
];

// === CARDÁPIO GERAL ===
const MENU = [
  ...MENU_PASTEIS,
  ...MENU_REFRIGERANTES,
  ...MENU_CERVEJAS,
  ...MENU_ESPETINHOS,
  ...MENU_COMBOS
];


// Estado carrinho
let cart = [];

// Seletores
const shopName = document.getElementById("shopName");
const shopName2 = document.getElementById("shopName2");
const address = document.getElementById("address");
const year = document.getElementById("year");
const grid = document.getElementById("menuGrid");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

// Preenche infos da loja
shopName.textContent = CONFIG.shopName;
shopName2.textContent = CONFIG.shopName;
address.textContent = CONFIG.address;
year.textContent = new Date().getFullYear();

// Renderizar menu
function renderMenu(filter = "todos", search = "") {
  grid.innerHTML = "";
  MENU.filter(item => (filter === "todos" || item.tag === filter) &&
                      item.name.toLowerCase().includes(search.toLowerCase()))
      .forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <strong>${BRL.format(item.price)}</strong>
          <button class="btn-add" data-id="${item.id}">Adicionar</button>
        `;
        grid.appendChild(card);
      });
}
renderMenu();

// Evento de clique no grid (delegação)
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-add");
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const item = MENU.find(i => i.id === id);
  if (!item) return;
  cart.push(item);
  updateCart();
});

// Atualizar carrinho
function updateCart() {
  cartCount.textContent = cart.length;
  cartTotal.textContent = BRL.format(cart.reduce((sum, i) => sum + i.price, 0));
}

// Limpar carrinho
document.getElementById("clearBtn").addEventListener("click", () => {
  cart = [];
  updateCart();
});

// Filtros chips
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderMenu(chip.dataset.filter, document.getElementById("searchInput").value);
  });
});

// Busca
document.getElementById("searchInput").addEventListener("input", e => {
  const filter = document.querySelector(".chip.active").dataset.filter;
  renderMenu(filter, e.target.value);
});

// Enviar WhatsApp
document.getElementById("btnEnviar").addEventListener("click", () => {
  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.getElementById("pagamento").value;

  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = `📦 *Pedido - ${CONFIG.shopName}*\n\n`;
  mensagem += cart.map(i => `• ${i.name} - ${BRL.format(i.price)}`).join("\n");
  mensagem += `\n\n*Total:* ${BRL.format(cart.reduce((s, i) => s + i.price, 0))}`;
  mensagem += `\n\n👤 Cliente: ${nome || "Não informado"}`;
  if (endereco) mensagem += `\n🏠 Endereço: ${endereco}`;
  mensagem += `\n💳 Pagamento: ${pagamento}`;

  const url = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
});
