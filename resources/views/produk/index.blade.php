<a href="{{ url('/') }}">Menu Produk</a>

<h1>Daftar Produk</h1>

<ul>
    @forelse ($produks as $produk)
        <li>{{ $produk->nama }} — Rp{{ $produk->harga }}</li>
    @empty
        <li>Belum ada data produk di database. Silakan jalankan seeder.</li>
    @endforelse
</ul>
