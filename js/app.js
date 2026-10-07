/* Logika website. Biasanya tidak perlu diubah. */
const rp = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function pkgPrice(pkg, qty) {
  let p = pkg.price;
  (pkg.tiers || []).forEach((t) => { if (qty >= t.min) p = t.price; });
  return p;
}

/* ---------- Keranjang (tersimpan di browser) ---------- */
let cart = JSON.parse(localStorage.getItem("ririn-cart") || "[]");
function findProduct(id) {
  const pkg = PACKAGES.find((p) => p.id === id);
  if (pkg) return { name: pkg.name, unit: "pax", min: BUSINESS.minimumOrder, step: 5, price: (q) => pkgPrice(pkg, q) };
  const m = MENU_ITEMS.find((x) => x.id === id);
  if (m) return { name: m.name, unit: m.unit, min: 1, step: 1, price: () => m.price };
  return null;
}
function saveCart() {
  cart = cart.filter((c) => findProduct(c.id));
  localStorage.setItem("ririn-cart", JSON.stringify(cart));
  renderCart();
}
function addToCart(id, qty) {
  const ex = cart.find((c) => c.id === id);
  if (ex) ex.qty += qty; else cart.push({ id, qty });
  saveCart();
  toast(findProduct(id).name + " ditambahkan");
}
function changeQty(id, dir) {
  const c = cart.find((x) => x.id === id), p = findProduct(id);
  c.qty = Math.max(p.min, c.qty + dir * p.step);
  saveCart();
}
function removeItem(id) { cart = cart.filter((c) => c.id !== id); saveCart(); }
function total() { return cart.reduce((s, c) => s + findProduct(c.id).price(c.qty) * c.qty, 0); }

function renderCart() {
  const count = cart.length;
  document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = count ? "(" + count + ")" : ""));
  document.querySelectorAll("[data-total]").forEach((el) => (el.textContent = rp(total())));
  const list = $("#cart-list");
  if (!list) return;
  $("#cart-empty").hidden = count > 0;
  $("#cart-filled").hidden = count === 0;
  list.innerHTML = cart.map((c) => {
    const p = findProduct(c.id), price = p.price(c.qty);
    return `<div class="cart-row">
      <div><strong>${esc(p.name)}</strong><small>${rp(price)} / ${p.unit}</small>
        <div class="qty"><button type="button" onclick="changeQty('${c.id}',-1)" ${c.qty <= p.min ? "disabled" : ""} aria-label="Kurangi">−</button>
        <span>${c.qty} ${p.unit}</span><button type="button" onclick="changeQty('${c.id}',1)" aria-label="Tambah">+</button></div></div>
      <div class="right"><strong>${rp(price * c.qty)}</strong><button type="button" class="link" onclick="removeItem('${c.id}')">Hapus</button></div>
    </div>`;
  }).join("");
}

function openCart() { $("#cart").showModal(); }
function closeCart() { $("#cart").close(); }

function checkout(e) {
  e.preventDefault();
  const f = e.target, d = Object.fromEntries(new FormData(f));
  if (!/^\+?[0-9]{8,15}$/.test(d.phone.replace(/\s/g, ""))) { alert("Nomor WhatsApp belum benar."); return; }
  const lines = cart.map((c) => { const p = findProduct(c.id), pr = p.price(c.qty); return `${p.name}\n${c.qty} ${p.unit} × ${rp(pr)}\n= ${rp(pr * c.qty)}`; }).join("\n\n");
  const msg = `Halo ${BUSINESS.name}!\n\nSaya ingin memesan:\n\n${lines}\n\nTanggal: ${d.date}\nJam: ${d.time}\nAlamat: ${d.address}\n\nCatatan: ${d.note || "-"}\n\nEstimasi: ${rp(total())}\n\nNama: ${d.name}\nWhatsApp: ${d.phone}`;
  window.open(`https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}

let toastTimer;
function toast(t) {
  const el = $("#toast"); el.textContent = t; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

/* ---------- Halaman Menu ---------- */
function qtyControl(id, min, step) {
  return `<div class="add"><div class="qty"><button type="button" onclick="stepPick('${id}',-${step},${min})" aria-label="Kurangi">−</button>
    <span id="q-${id}">${min}</span><button type="button" onclick="stepPick('${id}',${step},${min})" aria-label="Tambah">+</button></div>
    <button type="button" class="btn" onclick="pickAdd('${id}',${min})">Tambah</button></div>`;
}
function stepPick(id, d, min) { const el = $("#q-" + id); el.textContent = Math.max(min, +el.textContent + d); }
function pickAdd(id, min) { const el = $("#q-" + id); addToCart(id, +el.textContent); el.textContent = min; }

let filter = "Semua";
function renderMenu() {
  const cats = ["Semua", "Paket", ...new Set(MENU_ITEMS.map((m) => m.category))];
  $("#filters").innerHTML = cats.map((c) => `<button type="button" class="chip ${c === filter ? "on" : ""}" onclick="filter='${c}';renderMenu()">${esc(c)}</button>`).join("");
  const showPkg = filter === "Semua" || filter === "Paket";
  $("#pkg-section").hidden = !showPkg;
  $("#pkg-min").textContent = BUSINESS.minimumOrder;
  $("#packages").innerHTML = PACKAGES.map((p) => `<article class="card pkg">
    <img src="images/${p.image}" alt="${esc(p.name)}" loading="lazy">
    <div class="body"><h3>${esc(p.name)}</h3><p class="price">${rp(p.price)} <small>/ pax</small></p>
    <ul>${p.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    ${p.tiers ? `<p class="muted small">${p.tiers.map((t) => `${t.min}+ pax: ${rp(t.price)}`).join(" · ")}</p>` : ""}
    ${qtyControl(p.id, BUSINESS.minimumOrder, 5)}</div></article>`).join("");
  const items = MENU_ITEMS.filter((m) => filter === "Semua" || m.category === filter);
  $("#menu-section").hidden = items.length === 0;
  $("#menu").innerHTML = items.map((m) => `<article class="card item">
    <div class="top"><div><h3>${esc(m.name)}</h3><p class="muted">${esc(m.description)}</p></div><strong class="price">${rp(m.price)}</strong></div>
    ${qtyControl(m.id, 1, 1)}</article>`).join("");
}

/* ---------- Beranda ---------- */
function renderHome() {
  $("#from-pkg").textContent = rp(Math.min(...PACKAGES.map((p) => p.price))) + "/pax";
  $("#from-menu").textContent = rp(Math.min(...MENU_ITEMS.map((m) => m.price)));
  $("#reviews").innerHTML = REVIEWS.map((r) => `<figure class="card review"><div class="stars">★★★★★</div><blockquote>"${esc(r.text)}"</blockquote><figcaption><strong>${esc(r.name)}</strong> · ${esc(r.city)}</figcaption></figure>`).join("");
}

/* ---------- Umum ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = BUSINESS.name));
  document.querySelectorAll("[data-area]").forEach((el) => (el.textContent = BUSINESS.serviceArea));
  document.querySelectorAll("[data-min]").forEach((el) => (el.textContent = BUSINESS.minimumOrder));
  document.querySelectorAll("[data-ig]").forEach((el) => (el.textContent = BUSINESS.instagram));
  document.querySelectorAll("[data-wa]").forEach((el) => (el.href = "https://wa.me/" + BUSINESS.phone));
  const d = $("input[name=date]"); if (d) d.min = new Date().toISOString().split("T")[0];
  $("#menu-btn").onclick = () => $("#nav").classList.toggle("open");
  if ($("#packages")) renderMenu();
  if ($("#reviews")) renderHome();
  renderCart();
});
