// app.js
import { CONFIG } from "./config.js";

// Formatação de moeda
const BRL = new Intl.NumberFormat('pt-BR',{ style:'currency', currency:'BRL' });

// Seu menu (se já tiver em outro arquivo, pode remover daqui e importar)
const MENU = window.MENU || [
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

// DOM (bate com os IDs do seu HTML)
const el = {
  shopName: document.getElementById("shopName"),
  shopName2: document.getElementById("shopName2"),
  address: document.getElementById("address"),
  year: document.getElementById("year"),
  grid: document.getElementById("menuGrid"),
  search: document.getElementById("searchInput"),
  chips: [...document.querySelectorAll(".chip")],
  cartCount: document.getElementById("cartCount"),
  cartTotal: document.getElementById("cartTotal"),
  clearBtn: document.getElementById("clearBtn"),
  checkout: document.getElementById("checkoutBtn"),
};

// Header/rodapé
if (el.shopName) el.shopName.textContent = CONFIG.shopName || 'Loja';
if (el.shopName2) el.shopName2.textContent = CONFIG.shopName || 'Loja';
if (el.address) el.address.textContent = CONFIG.address || '';
if (el.year) el.year.textContent = String(new Date().getFullYear());

// --- Carrinho ---
let cart = loadCart();

// Carrega do localStorage (se existir)
function loadCart(){
  try {
    const saved = localStorage.getItem('ht_cart');
    if (saved) {
      const parsed = JSON.parse(saved);
      // aceita {items:[{name, qty, total}]}
      if (parsed && parsed.items && Array.isArray(parsed.items)) {
        // reconstruir como {id:qty}? Não temos id -> guardamos como name.
        // aqui vamos manter um mapa por id, se não tiver id vamos p/ name.
        const map = {};
        parsed.items.forEach(it=>{
          // tenta casar pelo nome no MENU pra achar id/preço
          const m = MENU.find(x => x.name === it.name);
          if (m) map[m.id] = (map[m.id]||0) + (it.qty||1);
        });
        return map;
      }
    }
  } catch {}
  return {};
}

// Salva em localStorage (e expõe para outros scripts)
function persistCart(){
  const items = Object.entries(cart).map(([id, qty])=>{
    const it = MENU.find(m=>m.id===id);
    return it ? { name: it.name, qty, total: it.price * qty } : null;
  }).filter(Boolean);
  const total = items.reduce((s,i)=>s+(i?.total||0),0);
  window.__CART__ = { items, total };
  try { localStorage.setItem('ht_cart', JSON.stringify(window.__CART__)); } catch {}
}

// Atualiza contadores na UI
function updateCartUI(){
  const entries = Object.entries(cart);
  const count = entries.reduce((s, [,q]) => s+q, 0);
  const total = entries.reduce((s, [id,q]) => {
    const it = MENU.find(m => m.id===id);
    return s + (it ? it.price*q : 0);
  }, 0);

  if (el.cartCount) el.cartCount.textContent = count;
  if (el.cartTotal) el.cartTotal.textContent = BRL.format(total);

  persistCart();
}

// Adiciona / remove
function add(id){ cart[id] = (cart[id]||0) + 1; updateCartUI(); }
function dec(id){
  if(!cart[id]) return;
  cart[id]--;
  if(cart[id] <= 0) delete cart[id];
  updateCartUI();
}

// --- Renderização do grid ---
function cardHTML(it){
  return `
    <article class="card">
      <h3>${it.name} ${it.tag==='promo' ? '<span class="badge">Promo</span>' : ''}</h3>
      <p>${it.desc ?? ''}</p>
      <div><span class="price">${BRL.format(it.price)}</span></div>
      <div class="actions">
        <button class="btn ghost" data-dec="${it.id}" type="button">–</button>
        <button class="btn" data-inc="${it.id}" type="button">Adicionar</button>
      </div>
    </article>
  `;
}

function renderList(list){
  if (!el.grid) return;
  el.grid.innerHTML = list.map(cardHTML).join('');
}

// Filtro/busca
function applyFilter(){
  const q = (el.search?.value || '').trim().toLowerCase();
  const active = document.querySelector(".chip.active")?.dataset.filter ?? "todos";
  const list = MENU.filter(x =>
    (active === "todos" || x.tag === active) &&
    (x.name.toLowerCase().includes(q) || (x.desc||"").toLowerCase().includes(q))
  );
  renderList(list);
}

// Delegação de clique para botões Adicionar/– (funciona em HTML estático)
document.addEventListener('click', (ev)=>{
  const inc = ev.target.closest?.('[data-inc]')?.dataset.inc;
  const decId = ev.target.closest?.('[data-dec]')?.dataset.dec;
  if (inc){ add(inc); }
  if (decId){ dec(decId); }
});

// Limpar carrinho
el.clearBtn?.addEventListener('click', ()=>{
  cart = {};
  updateCartUI();
});

// Chips e busca
el.chips.forEach(ch => ch.addEventListener('click', ()=>{
  el.chips.forEach(x=>x.classList.remove('active'));
  ch.classList.add('active');
  applyFilter();
}));
el.search?.addEventListener('input', applyFilter);

// Primeira renderização
applyFilter();
updateCartUI();
