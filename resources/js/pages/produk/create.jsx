import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama_produk: '',
        harga: '',
        stok: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/produk');
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded border my-8">
            <h1 className="text-xl font-bold mb-4">Tambah Produk Sayur</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nama Produk</label>
                    <input
                        type="text"
                        value={data.nama_produk}
                        onChange={(e) => setData('nama_produk', e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                    />
                    {/* Galat Validasi dari Server */}
                    {errors.nama_produk && <p className="text-red-500 text-xs mt-1">{errors.nama_produk}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Harga (Rp)</label>
                    <input
                        type="number"
                        value={data.harga}
                        onChange={(e) => setData('harga', e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                    />
                    {errors.harga && <p className="text-red-500 text-xs mt-1">{errors.harga}</p>}
                </div>

                {/* Tombol Sibuk (D.2) */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan Produk'}
                </button>
            </form>
        </div>
    );
}