import { Head, Link } from '@inertiajs/react';

export default function Show({ produk }) {
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title={produk.nama} />

            <Link href="/produk" className="text-blue-600 hover:underline mb-4 inline-block">
                &larr; Kembali ke Daftar Produk
            </Link>

            <h1 className="text-2xl font-bold mb-2">{produk.nama}</h1>
            <div className="border p-6 rounded-lg shadow">
                <p className="text-gray-700 mb-2"><strong>Kategori:</strong> {produk.kategori?.nama ?? '-'}</p>
                <p className="text-gray-700 mb-2"><strong>Satuan:</strong> {produk.satuan?.nama ?? '-'}</p>
                <p className="text-gray-700 mb-2"><strong>Harga:</strong> Rp {Number(produk.harga).toLocaleString('id-ID')}</p>
                <p className="text-gray-700 mb-2"><strong>Stok:</strong> {produk.stok}</p>
                <p className="text-gray-700 mb-2"><strong>Status:</strong> {produk.status_ketersediaan}</p>
                <p className="text-gray-600 mt-4">{produk.deskripsi ?? 'Tidak ada deskripsi.'}</p>
            </div>
        </div>
    );
}