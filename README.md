# Sistem Informasi Toko Sayur Online

Website company profile toko sayur yang menampilkan katalog, harga, dan ketersediaan stok secara real-time. Pelanggan dapat memantau produk melalui website, sementara transaksi pemesanan tetap dilakukan melalui WhatsApp.

## Tech Stack

| Komponen | Teknologi |
|---|---|
| Backend | Laravel 11 (PHP >= 8.1) |
| Frontend | React (via Inertia.js) |
| Styling | Tailwind CSS |
| Autentikasi | Laravel Breeze |
| Basis Data | PostgreSQL |

## Struktur Basis Data

Proyek ini memiliki 7 tabel utama: `users`, `kategoris`, `satuans`, `produks`, `riwayat_hargas`, `testimonis`, dan `profil_tokos`. Detail lengkap skema (atribut, kunci, relasi, alasan tipe data, dan batasan integritas) ada di **Dokumen Rancangan** pada folder `docs/`.

---

## Panduan Instalasi dari Nol

### 1. Prasyarat

Pastikan sudah terinstall di komputer:

| Kebutuhan | Cek dengan |
|---|---|
| PHP >= 8.1 | `php -v` |
| Composer | `composer -v` |
| Node.js & npm | `node -v` dan `npm -v` |
| PostgreSQL | `psql --version` |
| Git | `git --version` |

Jika belum ada, install dari situs resmi masing-masing: php.net, getcomposer.org, nodejs.org, postgresql.org.

### 2. Clone Repository

```bash
git clone <alamat-repository-ini>
cd toko-sayur-online
```

### 3. Install Dependency PHP

```bash
composer install
```

### 4. Install Dependency JavaScript

```bash
npm install
```

### 5. Konfigurasi Environment

Salin file environment contoh, lalu generate application key:

```bash
cp .env.example .env
php artisan key:generate
```

Buka file `.env`, sesuaikan bagian koneksi database:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=toko_sayur
DB_USERNAME=postgres
DB_PASSWORD=isi_password_postgres_kamu
```

> Pastikan extension `pdo_pgsql` dan `pgsql` sudah aktif di `php.ini`.

### 6. Buat Database PostgreSQL

Masuk ke PostgreSQL:

```bash
psql -U postgres
```

Buat database baru, lalu keluar:

```sql
CREATE DATABASE toko_sayur;
\q
```

### 7. Jalankan Migrasi

Perintah ini akan membuat seluruh tabel (`users`, `kategoris`, `satuans`, `produks`, `riwayat_hargas`, `testimonis`, `profil_tokos`) sesuai skema pada Dokumen Rancangan:

```bash
php artisan migrate
```

Jika muncul error urutan foreign key, pastikan tidak ada file migration yang diedit manual timestamp-nya sehingga urutannya menjadi salah (kategoris & satuans harus lebih dulu dari produks; produks harus lebih dulu dari riwayat_hargas & testimonis).

### 8. Jalankan Seeder (Data Contoh)

```bash
php artisan db:seed
```

Atau untuk migrasi ulang dari kosong sekaligus mengisi data contoh dalam satu perintah:

```bash
php artisan migrate:fresh --seed
```

Seeder akan mengisi beberapa kategori, satuan, produk contoh, satu akun admin, dan satu baris profil toko — cukup untuk keperluan demo/presentasi.

### 9. Build Asset Frontend

Untuk mode pengembangan (hot reload):

```bash
npm run dev
```

Untuk build produksi:

```bash
npm run build
```

### 10. Jalankan Aplikasi

Buka **dua terminal terpisah**:

```bash
# Terminal 1 — backend Laravel
php artisan serve
```

```bash
# Terminal 2 — frontend React/Vite
npm run dev
```

Akses di `http://127.0.0.1:8000`.

### 11. Akun Login Admin (Contoh dari Seeder)

| Email | Password |
|---|---|
| admin@tokosayur.test | password |

> Segera ganti password ini setelah login pertama kali, terutama sebelum dipakai untuk demo/presentasi ke pengguna nyata.

---

## Troubleshooting Umum

| Masalah | Solusi |
|---|---|
| `SQLSTATE[08006] could not connect to server` | Pastikan service PostgreSQL sudah berjalan (`sudo service postgresql start` di Linux, atau cek aplikasi PostgreSQL di Windows/Mac). |
| `password authentication failed for user` | Cocokkan `DB_USERNAME` dan `DB_PASSWORD` di `.env` dengan kredensial PostgreSQL di komputer kamu. |
| Halaman blank / error Vite | Pastikan `npm run dev` sedang berjalan di terminal terpisah selagi `php artisan serve` aktif. |
| `Class "Pgsql" not found` / driver error | Aktifkan extension `pdo_pgsql` dan `pgsql` di `php.ini`, lalu restart server PHP. |
| Migration gagal karena tabel sudah ada | Jalankan `php artisan migrate:fresh` untuk drop semua tabel lalu migrasi ulang dari awal (data lama akan hilang). |

---

## Struktur Folder Penting

```
app/Models/            → Model Kategori, Satuan, Produk, RiwayatHarga, Testimoni, ProfilToko
app/Http/Controllers/  → Controller untuk tiap modul
database/migrations/   → Skema tabel PostgreSQL
database/seeders/      → Data contoh untuk demo
resources/js/Pages/    → Halaman React
resources/js/Layouts/  → Layout React
routes/web.php         → Definisi routing
docs/                  → Dokumen rancangan
```

## Tim & Pembagian Peran

| Nama | Peran Utama |
|---|---|
| Nabila Rahmadiani | Basis data dan model |
| Intan Safitri | Antarmuka dan komponen |
| Nova Arundyna Inzani | Autentikasi dan otorisasi |
| Ghea Putri Nashirah | Uji kebergunaan dan dokumentasi |
| Rachel Inaya Allantama | Uji kebergunaan dan dokumentasi |
