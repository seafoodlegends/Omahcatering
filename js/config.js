/* =========================================================
   PENGATURAN WEBSITE OMAH CATERING
   Ubah data di file ini saja. Tidak perlu mengubah HTML.
   ========================================================= */

const BUSINESS = {
  name: "Omah Catering",
  // Format WhatsApp: 62xxxxxxxxxx
  phone: "62881037424004",
  city: "Denpasar",
  serviceArea: "Denpasar dan Sekitarnya",
};

/* =========================================================
   LINK MEDIA SOSIAL & PLATFORM
   Kosongkan ("") jika belum tersedia.
   ========================================================= */

const LINKS = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  shopee: "",
  grab: "",
  gojek: "",
};

/* =========================================================
   DAFTAR MENU
   Harga menggunakan satuan rupiah tanpa titik.
   Contoh: 12000 = Rp12.000

   image: nama file di folder images/menu/
   category: nama kategori untuk filter menu.
   ========================================================= */

const MENU_ITEMS = [
  // -------------------------------------------------------
  // KATEGORI AYAM
  // -------------------------------------------------------

  {
    id: "ayam-kremes",
    name: "Ayam Kremes",
    category: "Ayam",
    price: 12000,
    image: "ayam-kremes.jpg",
    description: "Ayam gurih dengan taburan kremes renyah.",
  },
  {
    id: "ayam-bakar",
    name: "Ayam Bakar",
    category: "Ayam",
    price: 14000,
    image: "ayam-bakar.jpg",
    description: "Ayam bakar berbumbu dengan rasa gurih.",
  },
  {
    id: "ayam-geprek",
    name: "Ayam Geprek",
    category: "Ayam",
    price: 12000,
    image: "ayam-geprek.jpg",
    description: "Ayam goreng geprek dengan sambal.",
  },
  {
    id: "ayam-tempong",
    name: "Ayam Tempong",
    category: "Ayam",
    price: 14000,
    image: "ayam-tempong.jpg",
    description: "Ayam dengan sambal tempong bercita rasa khas.",
  },
  {
    id: "ayam-betutu",
    name: "Ayam Betutu",
    category: "Ayam",
    price: 17000,
    image: "ayam-betutu.jpg",
    description: "Ayam berbumbu khas Bali.",
  },

  // -------------------------------------------------------
  // KATEGORI IKAN
  // -------------------------------------------------------

  {
    id: "tempong-lele",
    name: "Tempong Lele",
    category: "Ikan",
    price: 12000,
    image: "tempong-lele.jpg",
    description: "Lele dengan sambal tempong.",
  },
  {
    id: "lele-bakar",
    name: "Lele Bakar",
    category: "Ikan",
    price: 14000,
    image: "lele-bakar.jpg",
    description: "Lele bakar dengan bumbu gurih.",
  },
  {
    id: "lele-kremes",
    name: "Lele Kremes",
    category: "Ikan",
    price: 12000,
    image: "lele-kremes.jpg",
    description: "Lele goreng dengan kremes renyah.",
  },

  // -------------------------------------------------------
  // KATEGORI NASI GORENG
  // -------------------------------------------------------

  {
    id: "nasi-goreng-telur",
    name: "Nasi Goreng Telur",
    category: "Nasi Goreng",
    price: 15000,
    image: "nasi-goreng-telur.jpg",
    description: "Nasi goreng gurih dengan telur.",
  },
  {
    id: "nasi-goreng-ayam",
    name: "Nasi Goreng Ayam",
    category: "Nasi Goreng",
    price: 15000,
    image: "nasi-goreng-ayam.jpg",
    description: "Nasi goreng dengan tambahan ayam.",
  },
  {
    id: "nasgor-sosis-bakso-telur",
    name: "Nasgor Sosis Bakso Telur",
    category: "Nasi Goreng",
    price: 17000,
    image: "nasgor-sosis-bakso-telur.jpg",
    description: "Nasi goreng dengan sosis, bakso, dan telur.",
  },
  {
    id: "nasgor-cumi",
    name: "Nasgor Cumi",
    category: "Nasi Goreng",
    price: 17000,
    image: "nasgor-cumi.jpg",
    description: "Nasi goreng dengan tambahan cumi.",
  },
  {
    id: "nasgor-udang",
    name: "Nasgor Udang",
    category: "Nasi Goreng",
    price: 17000,
    image: "nasgor-udang.jpg",
    description: "Nasi goreng dengan tambahan udang.",
  },

  // -------------------------------------------------------
  // KATEGORI MIE
  // -------------------------------------------------------

  {
    id: "mie-tektek-goreng",
    name: "Mie Tektek Goreng",
    category: "Mie",
    price: 15000,
    image: "mie-tektek-goreng.jpg",
    description: "Mie tektek goreng dengan bumbu gurih.",
  },
  {
    id: "mie-tektek-nyemek",
    name: "Mie Tektek Nyemek",
    category: "Mie",
    price: 15000,
    image: "mie-tektek-nyemek.jpg",
    description: "Mie tektek dengan kuah sedikit dan bumbu gurih.",
  },
  {
    id: "kwetiau",
    name: "Kwetiau",
    category: "Mie",
    price: 17000,
    image: "kwetiau.jpg",
    description: "Kwetiau dengan bumbu gurih.",
  },
  {
    id: "bihun",
    name: "Bihun",
    category: "Mie",
    price: 17000,
    image: "bihun.jpg",
    description: "Bihun berbumbu dengan cita rasa gurih.",
  },

  // -------------------------------------------------------
  // KATEGORI MINUMAN
  // -------------------------------------------------------

  {
    id: "teh",
    name: "Teh",
    category: "Minuman",
    price: 5000,
    image: "teh.jpg",
    description: "Minuman teh.",
  },
  {
    id: "cokelat",
    name: "Cokelat",
    category: "Minuman",
    price: 7000,
    image: "cokelat.jpg",
    description: "Minuman dengan rasa cokelat.",
  },
  {
    id: "lemon-tea",
    name: "Lemon Tea",
    category: "Minuman",
    price: 7000,
    image: "lemontea.jpg",
    description: "Teh dengan rasa lemon yang segar.",
  },
  {
    id: "kelapa",
    name: "Kelapa",
    category: "Minuman",
    price: 10000,
    image: "kelapa.jpg",
    description: "Minuman kelapa yang menyegarkan.",
  },
  {
    id: "jus-jeruk-peras",
    name: "Jus Jeruk Peras",
    category: "Minuman",
    price: 7000,
    image: "jerukperas.jpg",
    description: "Jus jeruk dari perasan jeruk segar.",
  },
  {
    id: "jus-alpukat",
    name: "Jus Alpukat",
    category: "Minuman",
    price: 14000,
    image: "alpukat.jpg",
    description: "Jus alpukat dengan tekstur lembut.",
  },
];

/* =========================================================
   ULASAN PELANGGAN
   Ganti dengan ulasan asli pelanggan jika tersedia.
   ========================================================= */

const REVIEWS = [
  {
    name: "Ibu Wayan",
    city: "Denpasar",
    text: "Masakannya enak seperti masakan rumah. Datang tepat waktu.",
  },
  {
    name: "Pak Andi",
    city: "Renon",
    text: "Pesan untuk rapat kantor, porsinya pas dan kemasannya rapi.",
  },
  {
    name: "Ibu Sari",
    city: "Sanur",
    text: "Pemesanan lewat WhatsApp mudah, dijawab dengan ramah.",
  },
];