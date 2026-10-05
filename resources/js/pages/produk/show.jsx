import { Head, Link } from '@inertiajs/react';

export default function Show({ produk }) {
    return (
        <>
            <Head title={produk.nama} />
            <Link href="/produk">&larr; Kembali ke Daftar Produk</Link>

            <h1>{produk.nama}</h1>
            <p>Harga: Rp{produk.harga}</p>
            <p>Stok: {produk.stok}</p>
            <p>Status: {produk.status_ketersediaan}</p>
            {produk.kategori && <p>Kategori: {produk.kategori.nama}</p>}
            {produk.satuan && <p>Satuan: {produk.satuan.nama}</p>}
            {produk.deskripsi && <p>{produk.deskripsi}</p>}
        </>
    );
}