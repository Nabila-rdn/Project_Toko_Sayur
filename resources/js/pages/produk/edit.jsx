import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Edit({ produk }) {
    // Mengisi data awal dari props server ke useForm
    const { data, setData, put, processing, errors } = useForm({
        nama_produk: produk.nama_produk || '',
        harga: produk.harga || '',
        stok: produk.stok || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/produk/${produk.id}`);
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg border shadow-sm my-8">
            <Head title="Edit Produk Sayur" />
            
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Edit Produk Sayur</h1>
                <Link href="/produk" className="text-sm text-gray-500 hover:underline">Kembali</Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nama Produk</label>
                    <input
                        type="text"
                        value={data.nama_produk}
                        onChange={(e) => setData('nama_produk', e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                    />
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

                <div>
                    <label className="block text-sm font-medium">Stok</label>
                    <input
                        type="number"
                        value={data.stok}
                        onChange={(e) => setData('stok', e.target.value)}
                        className="w-full border p-2 rounded mt-1"
                    />
                    {errors.stok && <p className="text-red-500 text-xs mt-1">{errors.stok}</p>}
                </div>

                {/* Tombol Sibuk (D.2) */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 disabled:opacity-50 font-semibold"
                >
                    {processing ? 'Menyimpan...' : 'Perbarui Produk'}
                </button>
            </form>
        </div>
    );
}