🍴 Cardápio de Pastéis por QR Code

Um site estático e simples para exibir seu cardápio de pastéis, bebidas e combos, permitindo que seus clientes montem o pedido e finalizem pelo WhatsApp.
Inclui também um cartaz com QR Code para impressão e divulgação.

🚀 Como usar rapidamente

Abra index.html para visualizar o cardápio no navegador.

Abra poster.html para gerar e imprimir o cartaz com o QR Code.

Publique online gratuitamente com GitHub Pages ou Vercel.

🧩 Personalização

Edite o arquivo config.js conforme seu negócio:

export const CONFIG = {
  shopName: "HelpTech Antunes – Pastéis & Bebidas",
  phoneE164: "5511957805217",
  whatsappDisplay: "(11) 95780-5217",
  address: "Jundiaí/SP",
  qrUrl: "https://alison148.github.io/cardapio-pastel-qr/"
};


Campos importantes:

phoneE164: seu número WhatsApp sem o sinal “+” (formato DDI + DDD + número).

qrUrl: o link que o QR Code deve abrir (atualize após publicar).

shopName e address: aparecem no cabeçalho e no rodapé do cardápio.

🧾 Como funciona o pedido

O cliente escolhe os itens do cardápio e adiciona ao carrinho.

Ao clicar em “Fechar pedido”, o site gera uma mensagem automática.

O WhatsApp abre com o resumo do pedido + total, pronto para enviar.

Você recebe o pedido e combina entrega ou retirada diretamente.

💰 Alterar itens e preços

Abra o arquivo script.js e edite o array MENU.
Exemplo de item:

{ id: 'p1', name: 'Pastel de Carne', desc: 'Carne moída temperada', price: 12.00, tag: 'pastel' }


Tags possíveis:

pastel – para pastéis

bebida – para refrigerantes, sucos, cervejas

promo – para ofertas e combos promocionais

Essas tags são usadas nos filtros do cardápio.

🌐 Publicar no GitHub Pages

Crie um repositório chamado cardapio-pastel-qr no seu GitHub.

Envie todos os arquivos do projeto para o repositório.

Vá em Settings → Pages → Deploy from a branch

Branch: main

Pasta: / (root)

O site ficará disponível em:
👉 [cardapio-pastel-qr.vercel.app](https://cardapio-pastel-qr.vercel.app/)

Atualize o campo qrUrl no config.js com esse link.

⚡ Publicar na Vercel (alternativa mais rápida)

Crie um novo projeto na Vercel
.

Conecte ao repositório cardapio-pastel-qr.

Escolha “Projeto Estático (sem build)”.

Após o deploy, copie o link e atualize qrUrl no config.js.

🖨️ Imprimir o cartaz com QR

Abra poster.html no navegador.

Imprima em tamanho A4 (modo retrato ou paisagem).

Coloque o cartaz em locais visíveis — balcão, trailer, mesas etc.

✨ Créditos

Feito com ❤️ por HelpTech Antunes
📍 Jundiaí – SP
📞 WhatsApp: (11) 95780-5217
🌐 GitHub: ALISON148