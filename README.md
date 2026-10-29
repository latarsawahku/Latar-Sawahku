# ☕ KopiKita POS - Web Kasir Cafe Mobile (PWA)

Aplikasi Web Kasir (Point of Sale) khusus Cafe & Coffee Shop yang dioptimalkan untuk perangkat **Android Mobile**, ringan, modern, dan siap dihosting gratis di **GitHub Pages**.

---

## ✨ Fitur Utama

1. **Mobile-First & PWA Ready**:
   - Tampilan native Android modern dengan tema warm cafe dark aesthetic.
   - Navigasi bawah (Bottom Navigation) yang mudah dijangkau satu tangan.
   - Dapat diinstall langsung ke layar utama HP Android (Add to Home Screen) tanpa download Play Store.
   - Mendukung **Offline-First** via Service Worker (bisa digunakan saat koneksi cafe terputus).

2. **Katalog & Kustomisasi Menu (Barista Notes)**:
   - Kategori menu (Coffee, Non-Coffee, Makanan, Snack, Mocktail).
   - Pencarian menu instan & filter kategori.
   - Pengaturan suhu (Hot / Iced), tingkat kemanisan (Normal / Less / No Sugar), topping / extra shot, serta catatan pesanan khusus untuk barista.

3. **Metode Pembayaran Sederhana & Cepat**:
   - **Tunai (Cash)**: Otomatis hitung kembalian dengan tombol cepat pecahan uang (Pas, 20.000, 50.000, 100.000, 200.000).
   - **Transfer Bank**: Nomor rekening BCA & Mandiri dengan tombol 1-klik salin nomor rekening.

4. **Struk Thermal 58mm & WhatsApp Share**:
   - Preview struk ala printer thermal 58mm.
   - Cetak langsung via printer bluetooth / browser (`window.print()`).
   - Kirim struk langsung ke nomor WhatsApp pelanggan atau kasir.

5. **Riwayat & Manajemen Pesanan**:
   - Daftar transaksi hari ini lengkap dengan nomor struk, rincian item, dan status meja.
   - Ekspor data transaksi ke file Excel / CSV.

6. **Kelola Menu & Stok (Admin POS)**:
   - Tambah menu baru, edit harga, nama, kategori, dan emoji.
   - Toggle saklar stok (Ready / Sold Out).
   - Hapus menu.

7. **Laporan Keuangan & Best Seller**:
   - Ringkasan omset harian, total transaksi, perincian Tunai vs Transfer Bank.
   - Ranking menu terlaris (Top 5 Best Seller).
   - Fitur tutup buku / reset transaksi harian.

8. **Pengaturan Profil Cafe**:
   - Kustomisasi Nama Cafe, Tagline, Alamat, No. Telp / WA, Pajak PB1/PPN, dan Footer Struk.

---

## 🚀 Panduan Upload & Menjalankan di GitHub Pages

Aplikasi ini 100% Client-Side (HTML, CSS, JavaScript) tanpa perlu backend server, sehingga bisa langsung dijalankan gratis di GitHub Pages.

### Langkah 1: Buat Repository Baru di GitHub
1. Buka [github.com](https://github.com) dan login ke akun Anda.
2. Klik tombol **New** (Repository Baru).
3. Beri nama repository, misalnya: `kasir-cafe-mobile`.
4. Pilih **Public**, jangan centang Initialize with README, lalu klik **Create repository**.

### Langkah 2: Upload File dari Komputer
Buka terminal / PowerShell di folder proyek ini (`d:\KASIRMOBILE`), lalu jalankan perintah berikut:

```bash
# Inisialisasi Git
git init

# Tambahkan semua file
git add .

# Simpan commit pertama
git commit -m "Inisialisasi Web Kasir Cafe Mobile"

# Ubah branch ke main
git branch -M main

# Sambungkan ke repository GitHub Anda (ganti USERNAME dan NAMA-REPO)
git remote add origin https://github.com/USERNAME/kasir-cafe-mobile.git

# Upload ke GitHub
git push -u origin main
```

---

### Langkah 3: Aktifkan GitHub Pages (Live Online)
1. Di halaman repository GitHub Anda, klik tab **Settings** (di sebelah kanan atas).
2. Di menu sidebar kiri, klik **Pages**.
3. Pada bagian **Build and deployment** -> **Source**, pilih **Deploy from a branch**.
4. Di bagian **Branch**, pilih **main** dan folder **/(root)**, lalu klik tombol **Save**.
5. Tunggu sekitar 1 - 2 menit, lalu refresh halaman.
6. Anda akan melihat link website kasir Anda, contohnya:
   ```
   https://USERNAME.github.io/kasir-cafe-mobile/
   ```

---

## 📱 Cara Membuka & Menginstall di HP Android

1. Buka browser **Google Chrome** di HP Android Anda.
2. Masukkan link GitHub Pages yang sudah aktif (misal: `https://USERNAME.github.io/kasir-cafe-mobile/`).
3. Ketuk ikon titik tiga **(⋮)** di pojok kanan atas browser Chrome.
4. Pilih **"Tambahkan ke Layar Utama"** atau **"Instal Aplikasi"** (Add to Home screen).
5. Ikon **KopiKita POS** akan muncul di menu aplikasi HP Android Anda dan dapat dibuka fullscreen seperti aplikasi native playstore tanpa bilah URL browser!
