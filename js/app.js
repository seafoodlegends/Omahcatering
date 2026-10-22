/* Logika website. Biasanya tidak perlu diubah. */
const rp = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clampQty = (v) => Math.min(9999, Math.max(1, parseInt(v, 10) || 1));

/* ---------- Keranjang (tersimpan di browser) ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("omah-cart") || "[]"); } catch (e) { cart = []; }
const findProduct = (id) => MENU_ITEMS.find((x) => x.id === id);
function saveCart() {
  cart = cart.filter((c) => findProduct(c.id));
  try { localStorage.setItem("omah-cart", JSON.stringify(cart)); } catch (e) {}
  renderCart();
}
function addToCart(id, qty) {
  const ex = cart.find((c) => c.id === id);
  if (ex) ex.qty = clampQty(ex.qty + qty); else cart.push({ id, qty });
  saveCart();
  toast(findProduct(id).name + " ditambahkan");
}
function changeQty(id, dir) { const c = cart.find((x) => x.id === id); c.qty = clampQty(c.qty + dir); saveCart(); }
function setQty(id, v) { const c = cart.find((x) => x.id === id); c.qty = clampQty(v); saveCart(); }
function removeItem(id) { cart = cart.filter((c) => c.id !== id); saveCart(); }
function total() { return cart.reduce((s, c) => s + findProduct(c.id).price * c.qty, 0); }

function renderCart() {
  const count = cart.length;
  document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = count ? "(" + count + ")" : ""));
  document.querySelectorAll("[data-total]").forEach((el) => (el.textContent = rp(total())));
  const list = $("#cart-list");
  if (!list) return;
  $("#cart-empty").hidden = count > 0;
  $("#cart-filled").hidden = count === 0;
  list.innerHTML = cart.map((c) => {
    const p = findProduct(c.id);
    return `<div class="cart-row">
      <img src="images/menu/${esc(p.image)}" alt="" onerror="imgFallback(this)">
      <div class="grow"><strong>${esc(p.name)}</strong><small>${rp(p.price)}</small>
        <div class="qty"><button type="button" onclick="changeQty('${p.id}',-1)" ${c.qty <= 1 ? "disabled" : ""} aria-label="Kurangi">−</button>
        <input type="number" inputmode="numeric" min="1" max="9999" value="${c.qty}" aria-label="Jumlah ${esc(p.name)}" onchange="setQty('${p.id}',this.value)">
        <button type="button" onclick="changeQty('${p.id}',1)" aria-label="Tambah">+</button></div></div>
      <div class="right"><strong>${rp(p.price * c.qty)}</strong><button type="button" class="link" onclick="removeItem('${p.id}')">Hapus</button></div>
    </div>`;
  }).join("");
}

function openCart() { $("#cart").showModal(); }
function closeCart() { $("#cart").close(); }

function checkout(e) {
  e.preventDefault();
  const f = e.target, d = Object.fromEntries(new FormData(f));
  if (!/^\+?[0-9]{8,15}$/.test(d.phone.replace(/\s/g, ""))) { alert("Nomor WhatsApp belum benar."); return; }
  const lines = cart.map((c) => { const p = findProduct(c.id); return `${p.name}\n${c.qty} × ${rp(p.price)}\n= ${rp(p.price * c.qty)}`; }).join("\n\n");
  const msg = `Halo ${BUSINESS.name}!\n\nSaya ingin memesan:\n\n${lines}\n\nTanggal: ${d.date}\nJam: ${d.time}\nAlamat: ${d.address}\n\nCatatan: ${d.note || "-"}\n\nEstimasi: ${rp(total())}\n\nNama: ${d.name}\nWhatsApp: ${d.phone}`;
  window.open(`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

let toastTimer;
function toast(t) {
  const el = $("#toast"); el.textContent = t; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

/* Foto pengganti jika file foto menu belum ada */
function imgFallback(img) { img.onerror = null; img.src = "images/menu/placeholder.jpg"; }

/* ---------- Halaman Menu ---------- */
function qtyControl(id) {
  return `<div class="add"><div class="qty"><button type="button" onclick="stepPick('${id}',-1)" aria-label="Kurangi">−</button>
    <input type="number" inputmode="numeric" min="1" max="9999" value="1" id="q-${id}" aria-label="Jumlah porsi" onchange="this.value=clampQty(this.value)">
    <button type="button" onclick="stepPick('${id}',1)" aria-label="Tambah">+</button></div>
    <button type="button" class="btn" onclick="pickAdd('${id}')">Tambah</button></div>`;
}
function stepPick(id, d) { const el = $("#q-" + id); el.value = clampQty(clampQty(el.value) + d); }
function pickAdd(id) { const el = $("#q-" + id); addToCart(id, clampQty(el.value)); el.value = 1; }

let filter = "Semua";
function renderMenu() {
  const cats = ["Semua", ...new Set(MENU_ITEMS.map((m) => m.category))];
  $("#filters").innerHTML = cats.map((c) => `<button type="button" class="chip ${c === filter ? "on" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
  document.querySelectorAll(".chip").forEach((b) => (b.onclick = () => { filter = b.dataset.cat; renderMenu(); }));
  const items = MENU_ITEMS.filter((m) => filter === "Semua" || m.category === filter);
  $("#menu").innerHTML = items.map((m) => `<article class="card item">
    <img src="images/menu/${esc(m.image)}" alt="${esc(m.name)}" loading="lazy" onerror="imgFallback(this)">
    <div class="body"><span class="tag">${esc(m.category)}</span>
    <div class="top"><h3>${esc(m.name)}</h3><strong class="price">${rp(m.price)}</strong></div>
    <p class="muted">${esc(m.description)}</p>
    ${qtyControl(m.id)}</div></article>`).join("");
}

/* ---------- Beranda ---------- */
const ICONS = {
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5.04-1.58A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.34-2 1.4-.52.06-1.17.09-1.9-.12a17 17 0 0 1-1.72-.64c-3.02-1.3-4.99-4.35-5.14-4.55-.15-.2-1.23-1.64-1.23-3.12 0-1.49.78-2.22 1.06-2.52.28-.3.6-.38.8-.38l.58.01c.19.01.43-.07.68.52.25.6.85 2.08.93 2.23.07.15.12.33.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.09 1.31 2.39 1.46.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.74.82 2.04.97.3.15.5.22.57.35.08.12.08.72-.17 1.42Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.95.4-1.7 1.8-1.7h1.6V3.8A20 20 0 0 0 14.6 3.7c-2.6 0-4.4 1.6-4.4 4.5v2.3H7.3v3.3h2.9V22h3.3Z"/></svg>',
};
const PLATFORMS = [
  { key: "shopee", label: "ShopeeFood", color: "#ee4d2d" },
  { key: "grab", label: "GrabFood", color: "#00b14f" },
  { key: "gojek", label: "GoFood", color: "#ee2737" },
];
function renderHome() {
  $("#reviews").innerHTML = REVIEWS.map((r) => `<figure class="card review"><div class="stars">★★★★★</div><blockquote>"${esc(r.text)}"</blockquote><figcaption><strong>${esc(r.name)}</strong> · ${esc(r.city)}</figcaption></figure>`).join("");
  $("#platforms").innerHTML = PLATFORMS.map((p) => {
    const url = LINKS[p.key], inner = `<span class="dot" style="background:${p.color}"></span>${p.label}`;
    return url ? `<a class="plat" style="--c:${p.color}" href="${esc(url)}" target="_blank" rel="noopener">${inner}</a>` : `<span class="plat" style="--c:${p.color}">${inner}</span>`;
  }).join("");
}

/* ---------- Umum ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = BUSINESS.name));
  document.querySelectorAll("[data-area]").forEach((el) => (el.textContent = BUSINESS.serviceArea));
  document.querySelectorAll("[data-wa]").forEach((el) => (el.href = "https://wa.me/" + BUSINESS.phone));
  document.querySelectorAll("[data-link]").forEach((el) => { const u = LINKS[el.dataset.link]; if (u) el.href = u; else el.hidden = true; });
  document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = ICONS[el.dataset.icon]));
  const d = $("input[name=date]"); if (d) d.min = new Date().toISOString().split("T")[0];
  const btn = $("#menu-btn"), nav = $("#nav");
  btn.onclick = (e) => { e.stopPropagation(); const o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); };
  document.addEventListener("click", (e) => { if (!nav.contains(e.target)) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", false); } });
  if ($("#menu")) renderMenu();
  if ($("#reviews")) renderHome();
  renderCart();
});
