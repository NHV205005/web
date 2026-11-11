/* ---------- Ảnh sản phẩm + lưới sản phẩm ---------- */
const cardStyles = ["dark", "", "", "orange"];
const icons = ["🍋", "🍊", "🍑", "🐟"];

document.getElementById("product-grid").innerHTML = PRODUCTS.map(
  (p, i) => `
  <article class="card ${cardStyles[i % 4]}">
    <div class="thumb"><img src="${p.img}" alt="${p.name}" data-ph="${icons[i % 4]}" /></div>
    <div class="body">
      <h3>${p.name}</h3>
      <div class="price">${formatVND(p.price)}/1 cốc</div>
      <p class="desc">${p.desc}</p>
      <a href="#dat-hang" class="order-link" data-pick="${p.id}">Đặt món này →</a>
    </div>
  </article>`
).join("");

/* ---------- Bộ chọn số lượng ---------- */
document.getElementById("qty-list").innerHTML = PRODUCTS.map(
  (p) => `
  <div class="qty-row">
    <div class="name">${p.name}<small>${formatVND(p.price)}/cốc</small></div>
    <div class="stepper">
      <button type="button" data-step="-1" aria-label="Bớt">−</button>
      <input type="number" min="0" max="99" value="0" inputmode="numeric" data-id="${p.id}" aria-label="Số cốc ${p.name}" />
      <button type="button" data-step="1" aria-label="Thêm">+</button>
    </div>
  </div>`
).join("");

const qtyInputs = [...document.querySelectorAll("#qty-list input")];
const picker = document.getElementById("picker");

function getItems() {
  return PRODUCTS.map((p) => {
    const input = qtyInputs.find((i) => i.dataset.id === p.id);
    const qty = Math.max(0, Math.min(99, parseInt(input.value, 10) || 0));
    return { ...p, qty };
  }).filter((it) => it.qty > 0);
}

function updateTotal() {
  const total = getItems().reduce((s, it) => s + it.qty * it.price, 0);
  document.getElementById("subtotal").textContent = formatVND(total);
  if (total > 0) picker.classList.remove("invalid");
}

document.getElementById("qty-list").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-step]");
  if (!btn) return;
  const input = btn.parentElement.querySelector("input");
  input.value = Math.max(0, Math.min(99, (parseInt(input.value, 10) || 0) + Number(btn.dataset.step)));
  updateTotal();
});
qtyInputs.forEach((i) => i.addEventListener("input", updateTotal));

// "Đặt món này" -> tự +1 cốc
document.getElementById("product-grid").addEventListener("click", (e) => {
  const link = e.target.closest("[data-pick]");
  if (!link) return;
  const input = qtyInputs.find((i) => i.dataset.id === link.dataset.pick);
  if (input && +input.value === 0) input.value = 1;
  updateTotal();
});

/* ---------- Gửi đơn ---------- */
const form = document.getElementById("order-form");

function setInvalid(id, bad) {
  document.getElementById(id).closest(".field").classList.toggle("invalid", bad);
  return !bad;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.elements.name.value.trim();
  const phone = form.elements.phone.value.replace(/[\s.-]/g, "");
  const address = form.elements.address.value.trim();
  const note = form.elements.note.value.trim();
  const items = getItems();

  let ok = true;
  ok = setInvalid("name", !name) && ok;
  ok = setInvalid("phone", !/^(\+84|0)\d{9,10}$/.test(phone)) && ok;
  ok = setInvalid("address", !address) && ok;
  if (!items.length) { picker.classList.add("invalid"); ok = false; }
  if (!ok) {
    form.querySelector(".invalid")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const now = new Date();
  const code = "ND" + now.getTime().toString().slice(-6);
  const order = {
    code,
    name,
    phone,
    address,
    note,
    items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
    total: items.reduce((s, it) => s + it.qty * it.price, 0),
    createdAt: now.toISOString(),
  };

  try { localStorage.setItem("novadrink_order", JSON.stringify(order)); } catch (_) {}
  location.href = "order.html?code=" + code;
});

// Menu mobile
const nav = document.querySelector(".nav");
document.querySelector(".menu-toggle").addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", (e) => e.target.closest("a") && nav.classList.remove("open"));

document.getElementById("year").textContent = new Date().getFullYear();
