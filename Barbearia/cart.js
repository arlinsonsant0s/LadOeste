/* ============================================
   LADOESTE - Shopping Cart (vanilla JS)
   ============================================ */

const CART_STORAGE_KEY = "ladoeste_cart_v1";

// ----- Cart state -----
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartUI();
}

function formatPrice(value) {
  return "R$ " + value.toFixed(2).replace(".", ",");
}

// ----- Add / remove / update -----
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast("Item adicionado ao carrinho");
}

function removeFromCart(id) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}

function getCartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

// ----- UI updates -----
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  document.querySelectorAll(".js-cart-count").forEach((el) => (el.textContent = count));
  document.querySelectorAll(".js-cart-total").forEach((el) => (el.textContent = formatPrice(total)));
  document.querySelectorAll(".js-cart-subtotal").forEach((el) => (el.textContent = formatPrice(total)));

  const drawerItems = document.getElementById("cart-items");
  if (drawerItems) renderCartItems(drawerItems);

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.disabled = count === 0;
}

function renderCartItems(container) {
  const cart = getCart();
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty" data-testid="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Carrinho vazio</p>
        <small>Adicione peças do catálogo</small>
      </div>`;
    return;
  }
  container.innerHTML = cart.map((item) => `
    <div class="cart-item" data-testid="cart-item-${item.id}">
      <div class="cart-item-img">
        ${item.image
          ? `<img src="${item.image}" alt="${item.name}" />`
          : `<i class="fa-solid fa-shirt"></i>`}
      </div>
      <div class="cart-item-body">
        <span class="cart-item-cat">${item.category}</span>
        <span class="cart-item-name">${item.name || "Produto " + item.id}</span>
        <div class="cart-item-controls">
          <button class="qty-btn" data-testid="qty-decrease-${item.id}" onclick="updateQty('${item.id}', -1)">−</button>
          <span class="qty-display" data-testid="qty-display-${item.id}">${item.qty}</span>
          <button class="qty-btn" data-testid="qty-increase-${item.id}" onclick="updateQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
        <button class="cart-item-remove" data-testid="remove-${item.id}" onclick="removeFromCart('${item.id}')">Remover</button>
      </div>
    </div>
  `).join("");
}

// ----- Drawer / Modal handling -----
function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function openCheckout() {
  if (getCartCount() === 0) return;
  closeCart();
  document.getElementById("checkout-modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  document.getElementById("checkout-modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ----- Payment handlers (placeholders) -----
function payWith(method) {
  const cart = getCart();
  if (cart.length === 0) return;
  const total = getCartTotal();
  const summary = cart
    .map((i) => `${i.qty}x ${i.name || "Item " + i.id} - ${formatPrice(i.price * i.qty)}`)
    .join("%0A");

  switch (method) {
    case "whatsapp": {
      const msg = `Olá! Quero finalizar este pedido:%0A%0A${summary}%0A%0A*Total: ${formatPrice(total)}*`;
      window.open(`https://api.whatsapp.com/send?phone=5561992385579&text=${msg}`, "_blank");
      break;
    }
    case "paypal":
      showToast("PayPal: integração em breve. Pedido registrado.");
      break;
    case "stripe":
      showToast("Stripe: integração em breve. Pedido registrado.");
      break;
    case "mercadopago":
      showToast("Mercado Pago: integração em breve. Pedido registrado.");
      break;
  }
}

// ----- Toast -----
let toastTimer;
function showToast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.querySelector("span").textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}

// ----- Add-to-cart from product card -----
function handleAddToCart(btn) {
  const card = btn.closest("[data-product-id]");
  if (!card) return;
  const product = {
    id: card.dataset.productId,
    name: card.dataset.productName || "",
    price: parseFloat(card.dataset.productPrice) || 0,
    category: card.dataset.productCategory || "",
    image: card.dataset.productImage || "",
  };
  addToCart(product);
  btn.classList.add("added");
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado';
  setTimeout(() => {
    btn.classList.remove("added");
    btn.innerHTML = original;
  }, 1400);
}

// ----- Init -----
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  // Bind: open cart
  document.querySelectorAll('[data-action="open-cart"]').forEach((b) =>
    b.addEventListener("click", openCart)
  );
  // Bind: close cart
  document.querySelectorAll('[data-action="close-cart"]').forEach((b) =>
    b.addEventListener("click", closeCart)
  );
  // Bind: open checkout
  const ck = document.getElementById("checkout-btn");
  if (ck) ck.addEventListener("click", openCheckout);
  // Bind: close checkout
  document.querySelectorAll('[data-action="close-checkout"]').forEach((b) =>
    b.addEventListener("click", closeCheckout)
  );
  // Bind: payment
  document.querySelectorAll("[data-payment]").forEach((b) =>
    b.addEventListener("click", () => payWith(b.dataset.payment))
  );
  // Bind: add to cart
  document.querySelectorAll(".add-to-cart-btn").forEach((b) =>
    b.addEventListener("click", () => handleAddToCart(b))
  );
});
