# Cardápio de Pastéis por QR Code

Um site estático simples para você exibir seu cardápio, os clientes montarem o pedido e fecharem pelo WhatsApp. Inclui um **cartaz com QR** para imprimir.

## Como usar (rápido)
1. Abra `index.html` para ver o cardápio no navegador.
2. Abra `poster.html` e imprima o cartaz do QR.
3. Para publicar online grátis, use **GitHub Pages** ou **Vercel**.

## Personalizar
Edite **config.js**:
```js
export const CONFIG = {
  shopName: "HelpTech Antunes – Pastéis & Bebidas",
  phoneE164: "5511957805217",
  whatsappDisplay: "(11) 95780-5217",
  address: "Jundiaí/SP",
  qrUrl: "https://alison148.github.io/cardapio-pastel-qr/"
};
```
- `phoneE164`: seu WhatsApp sem o `+` (DDI + DDD + número).
- `qrUrl`: link que o QR vai abrir (mude após publicar).

## Publicar no GitHub Pages
1. Crie o repositório **cardapio-pastel-qr** na sua conta.
2. Envie todos os arquivos deste projeto.
3. No GitHub: *Settings → Pages → Deploy from a branch*, branch `main`, pasta `/ (root)`.
4. O site ficará em `https://SEUUSUARIO.github.io/cardapio-pastel-qr/`.
5. Atualize `qrUrl` em `config.js` com esse link.

## Publicar na Vercel
1. Crie um novo projeto a partir deste repositório.
2. Projeto estático (sem build). Deploy automático.
3. Atualize `qrUrl` com a URL gerada pela Vercel.

## Como o pedido funciona
O cliente adiciona itens, e ao clicar **Fechar pedido** abre o WhatsApp com o resumo e total. Você recebe a mensagem e combina entrega/retirada.

## Alterar itens e preços
Abra `script.js` e edite o array `MENU`. Exemplo:
```js
{ id:'p1', name:'Pastel de Carne', desc:'Carne moída', price:12.0, tag:'pastel' }
```
Tags válidas: `pastel`, `bebida`, `promo` (usada nos filtros).

---

Feito para a HelpTech Antunes. Qualquer dúvida, me chame! 🍽️
