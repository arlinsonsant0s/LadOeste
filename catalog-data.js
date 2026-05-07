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
      { id: "h1", name: "Camisa Mouth Limited Edition", image: "assets/parte_cima/peita01.png", price: 197,    tag: "Novo" },
      { id: "h2", name: "Camisa NY Limited", image: "assets/parte_cima/peita02.png", price: 149,    tag: "" },
      { id: "h3", name: "Camisa Tyler The Creator Collab", image: "assets/parte_cima/peita03.png", price: 247,    tag: "" },
      { id: "h4", name: "HellStar long sleeved", image: "assets/parte_cima/peita04.png", price: 189,    tag: "" },
      { id: "h5", name: "Hold opium", image: "assets/parte_cima/cima05.png", price: 359,    tag: "" },
      { id: "h6", name: "t-shirt cross", image: "assets/parte_cima/cima06.png", price: 157,    tag: "" },
      { id: "h7", name: "hold two faces", image: "assets/parte_cima/cima07.png", price: 257,    tag: "" },
      { id: "h8", name: "t-shirt vigor limited", image: "assets/parte_cima/cima08.png", price: 149,    tag: "" },
      { id: "h9", name: "t-dhirt los angeles 2026", image: "assets/parte_cima/cima09.png", price: 249,    tag: "" },
    ],
  },
  lower: {
    title: "Lower",
    subtitle: "Parte de baixo",
    description: "Calças, shorts, bermudas e moletons",
    items: [
      { id: "l1", name: "Street Pants ", image: "assets/parte_baixo/calca_1.png", price: 189,    tag: "Novo" },
      { id: "l2", name: "Dark Pants ", image: "assets/parte_baixo/calca_2.png", price: 249,    tag: "" },
      { id: "l3", name: "Street Skirt ", image: "assets/parte_baixo/saia_1.png", price: 149,    tag: "" },
      { id: "l4", name: "balenciaga pants ", image: "assets/parte_baixo/calca_3.png", price: 1349,    tag: "" },
      { id: "l5", name: "Light-bright pants", image: "assets/parte_baixo/calca_4.png", price: 125,    tag: "" },
      { id: "l6", name: "zara limited pants ", image: "assets/parte_baixo/calca_5.png", price: 457,    tag: "" },
      { id: "l7", name: "jorts hard", image: "assets/parte_baixo/short_1.png", price: 147,    tag: "" },
      { id: "l8", name: "jorts", image: "assets/parte_baixo/short_2.png", price: 147,    tag: "" },
      { id: "l9", name: "star pants", image: "assets/parte_baixo/calca_6.png", price: 249,    tag: "" },
    ],
  },
  highlights: {
    title: "Highlights",
    subtitle: "Acessórios",
    description: "Bonés, bolsas, correntes e detalhes",
    items: [
      { id: "a1", name: "hat gray", image: "assets/bone_1.png", price: 49.90, tag: "Novo" },
      { id: "a2", name: "bucket destroyed", image: "assets/bucket_1.png", price: 49,    tag: "" },
      { id: "a3", name: "glengarry", image: "assets/gorro_1.png", price: 67,    tag: "" },
      { id: "a4", name: "belt star", image: "assets/cinto_1.png", price: 49,    tag: "" },
      { id: "a5", name: "", image: "", price: 0,    tag: "" },
      { id: "a6", name: "", image: "", price: 0,    tag: "" },
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
