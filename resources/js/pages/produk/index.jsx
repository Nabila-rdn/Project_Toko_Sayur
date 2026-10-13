import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PesanFlash from '@/Components/PesanFlash';
import Kosong from '@/Components/Kosong';

export default function Index({ produks = [] }) {
    // Memastikan dataProduk selalu berupa Array yang valid
    const dataProduk = Array.isArray(produks) ? produks : (produks?.data || []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Head title="Daftar Produk" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Daftar Produk Sayur</h1>
                <div className="space-x-4">
                    <Link href="/produk/create" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700">
                        + Tambah Produk
                    </Link>
                    <Link href="/" className="text-emerald-600 hover:underline text-sm font-semibold">
                        Menu Utama
                    </Link>
                </div>
            </div>

            {/* Umpan balik pesan berhasil dari server (Bagian D.3) */}
            <PesanFlash />

            {/* Umpan balik keadaan kosong (Bagian D.4) */}
            {dataProduk.length === 0 ? (
                <Kosong
                    pesan="Belum ada data produk di database."
                    aksi={
                        <Link href="/produk/create" className="text-emerald-600 font-semibold underline">
                            Silakan tambahkan produk terlebih dahulu.
                        </Link>
                    }
                />
            ) : (
                <ul className="space-y-3">
                    {dataProduk.map((produk) => (
                        /* Menggunakan key={produk.id} secara stabil (Bagian A.5) */
                        <BarisProduk key={produk.id} produk={produk} />
                    ))}
                </ul>
            )}
        </div>
    );
}

/**
 * Komponen Baris Produk dengan State Konfirmasi Hapus
 * Memenuhi materi Bagian B.2 (useState & peristiwa)
 */
function BarisProduk({ produk }) {
    // State lokal untuk menampilkan panel konfirmasi hapus (Bagian B.2)
    const [konfirmasi, setKonfirmasi] = useState(false);

    return (
        <li className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center">
            <div>
                <h2 className="font-semibold text-lg">{produk.nama_produk || 'Nama Produk'}</h2>
                <p className="text-gray-600">Rp {Number(produk.harga || 0).toLocaleString('id-ID')}</p>
                <p className="text-sm text-emerald-600 font-medium">Stok: {produk.stok || 0}</p>
            </div>

            <div className="flex items-center gap-2">
                {konfirmasi ? (
                    <div className="bg-red-50 p-2 rounded border border-red-200 flex items-center gap-2">
                        <span className="text-xs text-red-600 font-bold">Yakin hapus?</span>
                        <Link
                            href={`/produk/${produk.id}`}
                            method="delete"
                            as="button"
                            className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold"
                        >
                            Ya
                        </Link>
                        <button
                            onClick={() => setKonfirmasi(false)}
                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs font-semibold"
                        >
                            Batal
                        </button>
                    </div>
                ) : (
                    <>
                        <Link
                            href={`/produk/${produk.id}/edit`}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded text-xs font-semibold"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => setKonfirmasi(true)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs font-semibold"
                        >
                            Hapus
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}
