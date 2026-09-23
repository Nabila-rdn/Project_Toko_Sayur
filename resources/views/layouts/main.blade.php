<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toko Sayur</title>
</head>
<body>
    <nav>
        <!-- Tautan ini wajib memakai route(), bukan alamat harfiah -->
        <a href="{{ route('produk.index') }}">Menu Produk</a>
    </nav>

    <main>
        <!-- Bagian ini akan diisi oleh konten dari halaman lain -->
        @yield('content')
    </main>
</body>
</html>
