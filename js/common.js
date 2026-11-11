/* Dùng chung cho cả 2 trang */

// Ảnh chưa có -> hiển thị khối màu thay thế
document.querySelectorAll("img[data-ph]").forEach((img) => {
  const swap = () => {
    const ph = document.createElement("div");
    ph.className = "ph";
    ph.textContent = img.dataset.ph;
    img.replaceWith(ph);
  };
  if (img.complete && img.naturalWidth === 0) swap();
  else img.addEventListener("error", swap);
});

// Đổ thông tin cửa hàng vào các phần tử data-shop
document.querySelectorAll("[data-shop]").forEach((el) => {
  const key = el.dataset.shop;
  el.textContent = SHOP[key] || "";
  if (key === "email") el.href = "mailto:" + SHOP.email;
});
document.querySelectorAll("[data-shop-link]").forEach((el) => (el.href = SHOP[el.dataset.shopLink]));
document.querySelectorAll("[data-tel]").forEach((el) => (el.href = "tel:" + SHOP.phone));
