/* =========================================================
   PENGATURAN WEBSITE RIRIN CATERING
   Ubah data di file ini saja. Tidak perlu mengubah HTML.
   ========================================================= */

const BUSINESS = {
  name: "Ririn Catering",
  // Nomor WhatsApp: format 62xxxxxxxxxx (tanpa + dan tanpa 0 di depan)
  phone: "62000000000",
  city: "Denpasar",
  serviceArea: "Denpasar dan Sekitarnya",
  instagram: "Rin catering",
  minimumOrder: 20, // minimal pax untuk paket
};

/* PAKET CATERING
   image: nama file di folder images/
   tiers (opsional): harga turun sesuai jumlah pax */
const PACKAGES = [
  { id: "paket-hemat", name: "Paket Hemat", price: 25000, image: "hero.jpg",
    items: ["Nasi putih", "Ayam goreng", "Tumis sayur", "Sambal", "Kerupuk"] },
  { id: "paket-reguler", name: "Paket Reguler", price: 35000, image: "hero.jpg",
    items: ["Nasi putih", "Ayam bakar", "Tumis sayur", "Sambal", "Kerupuk"],
    tiers: [{ min: 50, price: 33000 }, { min: 100, price: 31000 }] },
  { id: "paket-premium", name: "Paket Premium", price: 50000, image: "premium.jpg",
    items: ["Nasi kuning", "Ayam bakar", "Beef teriyaki", "Sayur", "Sambal", "Buah", "Kerupuk"] },
  { id: "snack-box", name: "Snack Box", price: 22000, image: "snack.jpg",
    items: ["2 jajanan tradisional", "Pastry gurih", "Buah", "Minuman"] },
];

/* MENU SATUAN
   Tambah menu: salin satu baris dan ubah isinya.
   Hapus menu: hapus barisnya.
   category: kategori baru otomatis muncul sebagai tombol filter. */
const MENU_ITEMS = [
  { id: "ayam-kremes",  name: "Ayam Kremes",  category: "Makanan",      price: 28000, unit: "porsi", description: "Ayam gurih dengan taburan kremes renyah." },
  { id: "lele-kremes",  name: "Lele Kremes",  category: "Makanan",      price: 22000, unit: "porsi", description: "Lele goreng renyah dengan kremes gurih." },
  { id: "ayam-lalapan", name: "Ayam Lalapan", category: "Makanan",      price: 27000, unit: "porsi", description: "Ayam goreng, sambal, dan lalapan segar." },
  { id: "ayam-bakar",   name: "Ayam Bakar",   category: "Makanan",      price: 30000, unit: "porsi", description: "Ayam bakar berbumbu manis gurih." },
  { id: "tipat-cantok", name: "Tipat Cantok", category: "Makanan",      price: 15000, unit: "porsi", description: "Tipat dan sayuran dengan bumbu kacang." },
  { id: "kwetiau",      name: "Kwetiau",      category: "Makanan",      price: 22000, unit: "porsi", description: "Kwetiau gurih dengan sayur." },
  { id: "nasi-goreng",  name: "Nasi Goreng",  category: "Makanan",      price: 22000, unit: "porsi", description: "Nasi goreng rumahan yang gurih." },
  { id: "bakso",        name: "Bakso",        category: "Bakso & Soto", price: 20000, unit: "porsi", description: "Bakso kuah hangat dengan pelengkap." },
  { id: "soto",         name: "Soto",         category: "Bakso & Soto", price: 20000, unit: "porsi", description: "Soto hangat dengan kuah gurih." },
  { id: "rujak",        name: "Rujak",        category: "Camilan",      price: 15000, unit: "porsi", description: "Buah segar dengan bumbu rujak." },
  { id: "es-buah",      name: "Es Buah",      category: "Minuman",      price: 12000, unit: "gelas", description: "Campuran buah segar dan sirup." },
  { id: "es-jeruk",     name: "Es Jeruk",     category: "Minuman",      price: 8000,  unit: "gelas", description: "Jeruk segar dengan es." },
  { id: "es-teh",       name: "Es Teh",       category: "Minuman",      price: 7000,  unit: "gelas", description: "Teh manis dingin." },
  { id: "lemon-tea",    name: "Lemon Tea",    category: "Minuman",      price: 10000, unit: "gelas", description: "Teh segar dengan perasan lemon." },
  { id: "es-cokelat",   name: "Es Cokelat",   category: "Minuman",      price: 12000, unit: "gelas", description: "Minuman cokelat dingin." },
];

/* ULASAN PELANGGAN (contoh — ganti dengan ulasan asli) */
const REVIEWS = [
  { name: "Ibu Wayan", city: "Denpasar", text: "Masakannya enak seperti masakan rumah. Datang tepat waktu." },
  { name: "Pak Andi", city: "Renon", text: "Pesan untuk rapat kantor, porsinya pas dan kemasannya rapi." },
  { name: "Ibu Sari", city: "Sanur", text: "Pemesanan lewat WhatsApp mudah, dijawab dengan ramah." },
];
