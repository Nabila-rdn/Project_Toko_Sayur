import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PesanFlash from '@/Components/PesanFlash';
import Kosong from '@/Components/Kosong';

export default function Index({ produks = [] }) {
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

            <PesanFlash />

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
                        <BarisProduk key={produk.id} produk={produk} />
                    ))}
                </ul>
            )}
        </div>
    );
}

function BarisProduk({ produk }) {
    const [konfirmasi, setKonfirmasi] = useState(false);

    return (
        <li className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center">
            <div>
                <h2 className="font-semibold text-lg">
                    <Link href={`/produk/${produk.id}`} className="hover:underline">
                        {produk.nama}
                    </Link>
                </h2>
                <p className="text-xs text-gray-500">{produk.kategori?.nama ?? '-'}</p>
                <p className="text-gray-600">Rp {Number(produk.harga || 0).toLocaleString('id-ID')}</p>
                <p className="text-sm text-emerald-600 font-medium">Stok: {produk.stok ?? 0}</p>
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