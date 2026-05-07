# Dev LadOeste — Site StreetWear

Site estático em **HTML / CSS / JavaScript puro**.

## Estrutura de arquivos

```
public/
├── index.html         → Página inicial (landing, idêntica à sua original)
├── catalogo.html      → 🆕 Página de catálogo (Higher / Lower / Highlights)
├── style.css          → Estilos da landing
├── catalogo.css       → Estilos do catálogo + carrinho + checkout
├── cart.js            → Lógica do carrinho (localStorage, drawer, modal)
├── catalog-data.js    → 🆕 Dados dos produtos (EDITE AQUI nomes/imagens/preços)
└── assets/            → Coloque aqui as imagens
    ├── LadOeste.svg
    ├── sobre.svg
    ├── cima.png
    ├── baixo.png
    ├── acessorios.png
    ├── whatssapp.svg
    ├── bg.jpg
    ├── fundo.png
    └── produtos/      → 🆕 fotos das peças do catálogo (você cria)
        ├── higher-1.jpg
        ├── lower-1.jpg
        └── ...
```

## Como adicionar produtos

Abra `catalog-data.js` e edite o array `CATALOG`. Cada item tem:

```js
{ id: "h1", name: "Camiseta Oversized Black", image: "assets/produtos/higher-1.jpg", price: 199.90, tag: "Novo" }
```

- `id`     — único (ex.: h1, l3, a7) — não repita
- `name`   — nome do produto (string vazia mostra placeholder)
- `image`  — caminho da imagem (string vazia mostra placeholder)
- `price`  — número (ex.: 199.90)
- `tag`    — destaque opcional (ex.: "Novo", "-20%") ou ""

## Funcionalidades

- ✅ Catálogo com 3 categorias × 9 espaços = **27 itens**
- ✅ Carrinho de compras (drawer lateral) com persistência via localStorage
- ✅ Quantidade +/-, remover item, subtotal, total
- ✅ Modal de checkout com 4 formas de pagamento:
  - PayPal (placeholder)
  - Stripe — Cartão (placeholder)
  - Mercado Pago — Pix/Cartão/Boleto (placeholder)
  - **WhatsApp** — funcional, envia o resumo do pedido
- ✅ Animações AOS, hover effects, design dark + vermelho `#d94140`
- ✅ Totalmente responsivo (desktop, tablet, mobile)

## Próximos passos para você

1. Adicionar suas **imagens** em `assets/produtos/`
2. Editar `catalog-data.js` com **nomes** e **preços** reais
3. (Opcional) Configurar pagamento real:
   - PayPal: substituir handler `payWith("paypal")` em `cart.js` por integração com Smart Buttons
   - Stripe: usar Payment Links
   - Mercado Pago: integrar Checkout Pro

Tudo pronto! 🔥
