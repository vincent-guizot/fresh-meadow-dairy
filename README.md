<p align="center">
  <img src="./screenshots/main-logo.png" alt="Fresh Meadow Dairy Logo" width="260" />
</p>

# 🥛 Fresh Meadow Dairy Platform

**Fresh Meadow Dairy** adalah platform manajemen peternakan susu terintegrasi dari hulu ke hilir (*farm-to-table*) sekaligus etalase toko digital langsung ke konsumen (*direct-to-consumer*). Platform ini menyatukan sistem operasional internal (Content Management System / CMS), server backend RESTful API berantai dingin (*cold-chain*), dan aplikasi toko daring (*e-commerce storefront*) bagi pelanggan.

---

## 🌐 Layanan Lokal (Localhost Development URLs)

Setiap aplikasi berjalan secara mandiri pada port lokalnya masing-masing:

| Aplikasi / Direktori | Localhost URL | Port | Deskripsi & Tech Stack |
| :--- | :--- | :---: | :--- |
| **`apps/server`** | [http://localhost:3120](http://localhost:3120) | `3120` | **Core RESTful API & Cold-Chain Engine**<br>Express.js 4.x, Sequelize ORM, PostgreSQL, JWT Auth, Cloudinary (opsional) |
| **`apps/cms`** | [http://localhost:3125](http://localhost:3125) | `3125` | **Dairy Operations & Admin Portal**<br>React 18, Vite, Tailwind CSS v4, Context/Custom Hooks, Modal Dialogs |
| **`apps/web-user`** | [http://localhost:3130](http://localhost:3130) | `3130` | **Customer E-Commerce Storefront**<br>Next.js 14 (App Router), Base UI, Zustand, Framer Motion, Axios |

> **Catatan Database:** PostgreSQL berjalan secara lokal pada port `1000` dengan nama basis data `cms-fmd`.

---

## 🏗️ Struktur & Arsitektur Proyek

```
fresh-meadow-dairy/
├── apps/
│   ├── cms/              # Dashboard operasional & inventaris peternakan (Port 3125)
│   ├── server/           # Backend REST API & manajemen cold-chain (Port 3120)
│   └── web-user/         # Toko e-commerce pelanggan berbasis Next.js 14 (Port 3130)
├── screenshots/          # Dokumentasi visual antarmuka CMS & E-Commerce
└── README.md
```

---

## 📦 Detail Aplikasi & Tech Stack

### 1. `apps/cms` — Dairy Operations & Management Portal
* **Framework:** React 18 dengan Vite bundler.
* **Styling:** Tailwind CSS v4 dengan variabel desain kustom di `src/styles/`.
* **Arsitektur:** Hirarki komponen modular dengan custom hooks (`useAuth`, `useProducts`), service layers terisolasi, dan React Portal confirmation modal untuk aksi kritikal (Tambah/Edit Produk, Tambah/Edit Kategori, Catat Stok, Tambah Staff, Tambah Pelanggan).
* **Fitur Utama:**
  * Overview dashboard dengan metrik suhu pendingin & peringatan stok menipis.
  * Manajemen katalog produk dengan parameter rantai dingin (*storage temperature*, masa simpan).
  * Pencatatan stok batch & penyesuaian inventaris waktu-nyata.
  * Taksonomi kategori susu & produk olahan.
  * Pelacakan pesanan, status pemenuhan (*fulfillment*), dan pembayaran.
  * Manajemen peran staf (*Role-Based Access Control*) & registri pelanggan.
  * Antarmuka login bertema pastoral (*dual-panel branded login*).

### 2. `apps/server` — REST API & Business Logic Engine
* **Framework:** Express.js 4.x
* **Port Server:** `3120`
* **ORM & Database:** Sequelize ORM dengan PostgreSQL (Port: `1000`, DB: `cms-fmd`)
* **Arsitektur:** Refactored MVC structure (`controllers/`, `routes/`, `middlewares/`, `helpers/`)
* **Autentikasi & Keamanan:** JWT (JSON Web Tokens), enkripsi kata sandi Bcrypt, serta proteksi otorisasi kepemilikan data.
* **Integrasi Unggah Fleksibel (Cloudinary & Local Fallback):**
  * Terpasang *smart fallback logic*: jika variabel environment Cloudinary tersedia, berkas diunggah ke Cloudinary; jika tidak disetel, sistem secara otomatis dan aman beralih menyimpan berkas di folder lokal `/uploads`.
* **Pengujian Otomatis:** 100% lulus pada seluruh suite pengujian otomatis (`jest` & `supertest`) untuk autentikasi dan siklus Product CRUD.

### 3. `apps/web-user` — Customer-Facing E-Commerce Storefront
* **Framework:** Next.js 14 (App Router)
* **Port Web:** `3130`
* **Bahasa:** JavaScript murni (`.js` / `.jsx`)
* **Styling & Desain:** Tailwind CSS yang diselaraskan 100% dengan identitas CMS Fresh Meadow Dairy:
  * `fmd-blue` (`#2563A6` & hover `#1C4E86`)
  * `fmd-green` (`#356B4B` & hover `#2A573B`)
  * `fmd-navy` (`#17324D` deep navy typography)
  * `fmd-cream` (`#FAF7EF` canvas & `#FAF8F3` warm card)
  * `fmd-yellow` (`#F4C95D` butter gold accent)
* **Fitur Utama:**
  * Header bernavigasi pastoral dengan sensor temperatur rantai dingin aktif (*2°C - 4°C Live Sensor*) & live search.
  * Hero section padang rumput bersertifikasi *100% Sapi Jersey Grass-Fed*.
  * Katalog produk dengan filter kategori interaktif, pengurutan harga/rating, dan kartu produk berindikator suhu.
  * Detail produk interaktif dengan Base UI Dialog & multi-tab spesifikasi (Cerita & Sumber, Nutrisi, Rantai Dingin).
  * Slide-over troli belanja (*cart drawer*) dengan opsi kemasan insulasi termal foil ganda & pemilihan slot pengantaran subuh (*06:00 - 08:00 WIB*).
  * Autentikasi pelanggan terintegrasi (*Modal Masuk & Daftar Pelanggan*).
  * Alur checkout terproteksi login dengan pilihan metode pembayaran (QRIS, Virtual Account, COD).
  * Riwayat pesanan pelanggan (*Order History Modal*) yang melacak status rantai dingin setiap pesanan.
  * Edukasi 4 pilar rantai dingin tanpa putus dan insentif pengembalian botol kaca ramah lingkungan (Rp 5.000/botol).

---

## 🚀 Panduan Memulai Cepat (Getting Started)

### Prasyarat
* **Node.js:** v18.x atau v20+
* **Package Manager:** `yarn`
* **Database:** PostgreSQL (berjalan di port `1000`)

---

### Langkah 1: Pengaturan Basis Data (Database Setup)
Pastikan PostgreSQL telah aktif pada port `1000`. Buka terminal dan jalankan migrasi:

```bash
# Masuk ke direktori server
cd apps/server

# Pasang dependensi
yarn install

# Buat database, jalankan migrasi, dan isi data awal (seeding)
yarn run db:create
yarn run db:migrate
yarn run db:seed:all
```

---

### Langkah 2: Menjalankan Server Backend API (Port 3120)
```bash
cd apps/server
yarn dev
# Server aktif di: http://localhost:3120
```

---

### Langkah 3: Menjalankan Dashboard Operasional CMS (Port 3125)
```bash
cd apps/cms
yarn install
yarn dev
# CMS aktif di: http://localhost:3125
```

---

### Langkah 4: Menjalankan Toko E-Commerce Pelanggan (Port 3130)
```bash
cd apps/web-user
yarn install
yarn dev
# Web Storefront aktif di: http://localhost:3130
```

---

## 🧪 Pengujian Otomatis (Automated Testing)

API backend dilengkapi dengan test suite otomatis menggunakan Jest & Supertest:

```bash
cd apps/server
yarn test
```

**Ringkasan Cakupan Pengujian:**
* ✅ `POST /users/login` — Autentikasi berhasil, email tidak terdaftar, sandi salah, validasi kolom wajib (401 / 400).
* ✅ `POST /users/register` — Registrasi pengguna baru, pencegahan duplikasi email, validasi format data.
* ✅ `GET /products` — Pengambilan seluruh daftar produk aktif.
* ✅ `POST /products` — Pembuatan produk baru lengkap dengan parameter penyimpanan rantai dingin.
* ✅ `PUT /products/:id` — Pembaruan rincian produk dan validasi hak akses kepemilikan.
* ✅ `DELETE /products/:id` — Penghapusan aman produk dan pembersihan inventaris terkait.

---

## 🎨 Aset Visual & Dokumentasi Antarmuka

Tangkapan layar antarmuka CMS dan etalase toko tersedia di folder [`screenshots/`](./screenshots):
* `Overview.png` — Dashboard utama dan metrik operasional harian
* `Products.png` & `Add Product.png` — Katalog produk dan formulir pembuatan produk
* `Categories.png` & `Add Category.png` — Formulir taksonomi kategori
* `Inventory.png` & `Record Stock.png` — Manajemen stok ruang pendingin (*cold-storage*)
* `Orders.png` & `Payments.png` — Pencatatan logistik & status pelunasan transaksi
* `Staff.png` & `Add Staff.png` — Manajemen akun staf & hak akses
* `Customers.png` & `Add Customer.png` — Registri pelanggan terdaftar
* `Login.png` — Antarmuka login bertema padang rumput alami

---

## 📄 Lisensi
MIT © Vincent Guizot
