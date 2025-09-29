import { CONFIG } from "./config.js";

const BRL = new Intl.NumberFormat('pt-BR',{ style:'currency', currency:'BRL' });

const MENU = [
  // Pastéis
  { id:'p1', name:'Pastel de Carne', desc:'Carne moída temperada', price:12.0, tag:'pastel' },
  { id:'p2', name:'Pastel de Queijo', desc:'Mussarela derretida', price:11.0, tag:'pastel' },
  { id:'p3', name:'Frango c/ Catupiry', desc:'Frango desfiado + requeijão', price:14.0, tag:'pastel' },
  { id:'p4', name:'Pizza', desc:'Mussarela, presunto, tomate, orégano', price:13.0, tag:'pastel' },
  { id:'p5', name:'Calabresa c/ Queijo', desc:'Calabresa fatiada + mussarela', price:13.0, tag:'pastel' },

  // Bebidas
  { id:'b1', name:'Refrigerante Lata', desc:'Coca, Guaraná, Fanta...', price:6.0, tag:'bebida' },
  { id:'b2', name:'Suco Natural 300ml', desc:'Laranja, limão, maracujá, abacaxi', price:8.0, tag:'bebida' },
  { id:'b3', name:'Água', desc:'C/ ou s/ gás', price:4.0, tag:'bebida' },

  // Cervejas
  { id:'c1', name:'Cerveja Lata', desc:'Skol, Brahma, Itaipava...', price:7.0, tag:'cerveja' },
  { id:'c2', name:'Cerveja Long Neck', desc:'Heineken, Budweiser...', price:10.0, tag:'cerveja' },

  // Espetinhos
  { id:'e1', name:'Espetinho de Carne', desc:'Carne bovina temperada no espeto', price:9.0, tag:'espetinho' },
  { id:'e2', name:'Espetinho de Frango', desc:'Frango temperado no espeto', price:8.0, tag:'espetinho' },
  { id:'e3', name:'Espetinho de Linguiça', desc:'Linguiça toscana no espeto', price:8.0, tag:'espetinho' },
  { id:'e4', name:'Espetinho Misto', desc:'Carne + Frango + Linguiça', price:12.0, tag:'espetinho' },

  // Promoções
  { id:'pm1', name:'Combo 2 Pastéis + Refri', desc:'Qualquer 2 + 1 lata', price:28.0, tag:'promo' },
  { id:'pm2', name:'Espetinho + Cerveja', desc:'1 espetinho à escolha + 1 lata', price:15.0, tag:'promo' }
];

let cart = {};

const dom = {
  shopName: document.getElementById("shopName"),
  shopName2: document.getElementById("shopName2"),
  address: document.getElementById("address"),
  year: document.getElementById("year"),
  grid: document.getElementById("menuGrid"),
  search: document.getElementById("searchInput"),
  filterChips: [...document.querySelectorAll(".chip")],
  cartCount: document.getElementById("cartCount"),
  cartTotal: document.getElementById("cartTotal"),
  clearBtn: document.getElementById("clearBtn"),
  checkout: document.getElementById("checkoutBtn")
};

// Init UI
dom.shopName.textContent = CONFIG.shopName;
dom.shopName2.textContent = CONFIG.shopName;
dom.address.textContent = CONFIG.address;
dom.year.textContent = new Date().getFullYear();

function render(items){
  dom.grid.innerHTML = "";
  for(const it of items){
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${it.name} ${it.tag==='promo' ? '<span class="badge">Promo</span>' : ''}</h3>
      <p>${it.desc ?? ""}</p>
      <div><span class="price">${BRL.format(it.price)}</span></div>
      <div class="actions">
        <button class="btn ghost" data-dec="${it.id}">–</button>
        <button class="btn" data-inc="${it.id}">Adicionar</button>
      </div>
    `;
    dom.grid.appendChild(card);
  }
}

function applyFilter(){
  const q = dom.search.value.trim().toLowerCase();
  const active = document.querySelector(".chip.active")?.dataset.filter ?? "todos";
  let items = MENU.filter(x =>
    (active==="todos" || x.tag===active) &&
    (x.name.toLowerCase().includes(q) || (x.desc||"").toLowerCase().includes(q))
  );
  render(items);
}

dom.search.addEventListener("input", applyFilter);
dom.filterChips.forEach(ch => ch.addEventListener("click", () => {
  dom.filterChips.forEach(x => x.classList.remove("active"));
  ch.classList.add("active");
  applyFilter();
}));

// Carrinho
function updateCart(){
  const entries = Object.entries(cart);
  const count = entries.reduce((s, [,q]) => s+q, 0);
  const total = entries.reduce((s, [id,q]) => {
    const item = MENU.find(m => m.id===id);
    return s + (item ? item.price*q : 0);
  }, 0);
  dom.cartCount.textContent = count;
  dom.cartTotal.textContent = BRL.format(total);
}

document.addEventListener("click", (e)=>{
  const inc = e.target.closest("[data-inc]")?.dataset.inc;
  const dec = e.target.closest("[data-dec]")?.dataset.dec;
  if(inc){
    cart[inc] = (cart[inc] || 0) + 1;
    updateCart();
  }
  if(dec){
    if(cart[dec]){
      cart[dec]--;
      if(cart[dec]<=0) delete cart[dec];
      updateCart();
    }
  }
});

dom.clearBtn.addEventListener("click", ()=>{
  cart = {};
  updateCart();
});

dom.checkout.addEventListener("click", ()=>{
  const entries = Object.entries(cart);
  if(entries.length===0){ alert("Seu carrinho está vazio."); return; }
  let msg = `*${CONFIG.shopName}*%0A`;
  msg += `Pedido:%0A`;
  let total = 0;
  for(const [id, q] of entries){
    const it = MENU.find(m => m.id===id);
    if(!it) continue;
    const line = `- ${it.name} x${q} = ${BRL.format(it.price*q)}`;
    total += it.price * q;
    msg += encodeURIComponent(line) + "%0A";
  }
  msg += `%0ATotal: ${encodeURIComponent(BRL.format(total))}%0A`;
  msg += `Entrega/Retirada? Endereço: ${encodeURIComponent(CONFIG.address)}%0A`;
  const url = `https://wa.me/${CONFIG.phoneE164}?text=${msg}`;
  window.open(url, "_blank");
});

applyFilter();
updateCart();
