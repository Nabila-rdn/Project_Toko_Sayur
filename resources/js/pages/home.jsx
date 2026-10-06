import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Beranda" />

            <h1>Toko Sayur Online</h1>
            <p>Selamat datang. Cek katalog sayur kami di bawah ini.</p>

            <Link href="/produk">Lihat Menu Produk</Link>
        </>
    );
}
