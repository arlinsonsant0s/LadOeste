/* ============================================
   LADOESTE - Dados do catálogo
   ============================================
   EDITE AQUI: name, image e price de cada peça.
   - name:   nome do produto (string)
   - image:  caminho da imagem (ex: "assets/produtos/higher-1.jpg")
             deixe "" para mostrar placeholder
   - price:  preço em número (ex: 199.90)
   - tag:    texto opcional de destaque (ex: "Novo", "-20%") ou ""
   ============================================ */

const CATALOG = {
  higher: {
    title: "Higher",
    subtitle: "Parte de cima",
    description: "Camisetas, moletons, jaquetas e tops",
    items: [
      { id: "h1", name: "", image: "assets/peita01.png", price: 0,    tag: "Novo" },
      { id: "h2", name: "", image: "assets/peita02.png", price: 0,    tag: "" },
      { id: "h3", name: "", image: "assets/peita03.png", price: 0,    tag: "" },
      { id: "h4", name: "", image: "assets/peita04.png", price: 0,    tag: "" },
      { id: "h5", name: "", image: "assets/", price: 0,    tag: "" },
      { id: "h6", name: "", image: "assets/", price: 0,    tag: "" },
      { id: "h7", name: "", image: "", price: 0,    tag: "" },
      { id: "h8", name: "", image: "", price: 0,    tag: "" },
      { id: "h9", name: "", image: "", price: 0,    tag: "" },
    ],
  },
  lower: {
    title: "Lower",
    subtitle: "Parte de baixo",
    description: "Calças, shorts, bermudas e moletons",
    items: [
      { id: "l1", name: "", image: "assets/calca_1", price: 0,    tag: "Novo" },
      { id: "l2", name: "", image: "assets/calca_2", price: 0,    tag: "" },
      { id: "l3", name: "", image: "assets/saia_1", price: 0,    tag: "" },
      { id: "l4", name: "", image: "assets/", price: 0,    tag: "" },
      { id: "l5", name: "", image: "assets/", price: 0,    tag: "" },
      { id: "l6", name: "", image: "assets/", price: 0,    tag: "" },
      { id: "l7", name: "", image: "", price: 0,    tag: "" },
      { id: "l8", name: "", image: "", price: 0,    tag: "" },
      { id: "l9", name: "", image: "", price: 0,    tag: "" },
    ],
  },
  highlights: {
    title: "Highlights",
    subtitle: "Acessórios",
    description: "Bonés, bolsas, correntes e detalhes",
    items: [
      { id: "a1", name: "", image: "assets/bone_1.png", price: 49.90, tag: "Novo" },
      { id: "a2", name: "", image: "assets/bucket_1", price: 0,    tag: "" },
      { id: "a3", name: "", image: "assets/gorro_1", price: 0,    tag: "" },
      { id: "a4", name: "", image: "assets/cinto_1", price: 0,    tag: "" },
      { id: "a5", name: "", image: "assets/", price: 0,    tag: "" },
      { id: "a6", name: "", image: "assets/", price: 0,    tag: "" },
      { id: "a7", name: "", image: "", price: 0,    tag: "" },
      { id: "a8", name: "", image: "", price: 0,    tag: "" },
      { id: "a9", name: "", image: "", price: 0,    tag: "" },
    ],
  },
};

/* ----- Renderiza os cards no DOM ----- */
function renderCatalog() {
  Object.entries(CATALOG).forEach(([key, section]) => {
    const grid = document.getElementById(`grid-${key}`);
    const meta = document.getElementById(`meta-${key}`);
    if (!grid) return;

    grid.innerHTML = section.items.map((p, idx) => {
      const number = String(idx + 1).padStart(2, "0");
      const hasImage = p.image && p.image.trim() !== "";
      const hasName = p.name && p.name.trim() !== "";
      const priceVal = p.price || 0;

      return `
        <article class="product-card"
          data-product-id="${p.id}"
          data-product-name="${(p.name || "").replace(/"/g, "&quot;")}"
          data-product-price="${priceVal}"
          data-product-category="${section.title}"
          data-product-image="${p.image || ""}"
          data-testid="product-card-${p.id}">

          <div class="product-image-wrap">
            ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
            <span class="product-number">${section.title.charAt(0)}/${number}</span>
            ${hasImage
              ? `<img src="${p.image}" alt="${p.name || section.title}" />`
              : `<div class="product-image-placeholder">
                   <i class="fa-solid fa-image"></i>
                 </div>`}
          </div>

          <div class="product-info">
            <h4 class="product-name ${hasName ? "" : "placeholder"}">
              ${hasName ? p.name : "Nome do produto"}
            </h4>
            <div class="product-meta">
              <div>
                <span class="product-price">
                  <small>Preço</small>
                  ${formatPrice(priceVal)}
                </span>
              </div>
            </div>
            <button class="add-to-cart-btn" data-testid="add-to-cart-${p.id}">
              <i class="fa-solid fa-plus"></i> Adicionar ao carrinho
            </button>
          </div>
        </article>
      `;
    }).join("");

    if (meta) {
      meta.innerHTML = `
        <small>${section.subtitle}</small>
        <strong>${section.items.length}</strong>
        ${section.description}
      `;
    }
  });

  // Re-bind add-to-cart after dynamic render
  document.querySelectorAll(".add-to-cart-btn").forEach((b) => {
    b.addEventListener("click", () => handleAddToCart(b));
  });
}

document.addEventListener("DOMContentLoaded", renderCatalog);
