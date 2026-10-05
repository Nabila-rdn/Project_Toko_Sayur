import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ produks = [] }) {
    // Memastikan produks selalu dalam bentuk Array agar tidak crash
    const dataProduk = Array.isArray(produks) ? produks : (produks?.data || []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Head title="Daftar Produk" />
            
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Daftar Produk</h1>
                <Link href="/" className="text-blue-600 hover:underline">Menu Utama</Link>
            </div>

            <ul className="space-y-3">
                {dataProduk.length === 0 ? (
                    <li className="text-gray-500">Belum ada data produk di database. Silakan tambahkan produk terlebih dahulu.</li>
                ) : (
                    dataProduk.map((produk) => (
                        <li key={produk.id || Math.random()} className="border p-4 rounded-lg shadow-sm">
                            <h2 className="font-semibold text-lg">{produk.nama_produk || 'Nama Produk'}</h2>
                            <p className="text-gray-600">Rp {produk.harga || 0}</p>
                            <p className="text-sm text-green-600">Stok: {produk.stok || 0}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}