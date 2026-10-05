import { Head, Link } from '@inertiajs/react';

export default function Index({ produks }) {
    return (
        <>
            <Head title="Daftar Produk" />
            <Link href="/">Menu Produk</Link>

            <h1>Daftar Produk</h1>

            <ul>
                {produks.length === 0 && (
                    <li>Belum ada data produk di database. Silakan jalankan seeder.</li>
                )}
                {produks.map((produk) => (
                    <li key={produk.id}>
                        <Link href={`/produk/${produk.id}`}>
                            {produk.nama} — Rp{produk.harga}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}