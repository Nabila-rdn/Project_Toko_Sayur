import { Head, Link, useForm } from '@inertiajs/react';
import FormProduk from '@/Components/FormProduk';

export default function Edit({ produk, kategoris, satuans }) {
    const { data, setData, put, processing, errors } = useForm({
        kategori_id: produk.kategori_id ?? '',
        satuan_id: produk.satuan_id ?? '',
        nama: produk.nama ?? '',
        harga: produk.harga ?? '',
        stok: produk.stok ?? '',
        deskripsi: produk.deskripsi ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/produk/${produk.id}`);
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded border my-8">
            <Head title={`Edit ${produk.nama}`} />

            <Link href="/produk" className="text-blue-600 hover:underline text-sm">
                &larr; Kembali ke Daftar Produk
            </Link>
            <h1 className="text-xl font-bold my-4">Edit Produk Sayur</h1>

            <FormProduk
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                kategoris={kategoris}
                satuans={satuans}
                onSubmit={handleSubmit}
                labelTombol="Simpan Perubahan"
                labelProses="Menyimpan..."
            />
        </div>
    );
}