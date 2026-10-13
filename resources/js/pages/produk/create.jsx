import { Head, Link, useForm } from '@inertiajs/react';
import FormProduk from '@/Components/FormProduk';

export default function Create({ kategoris, satuans }) {
    const { data, setData, post, processing, errors } = useForm({
        kategori_id: '',
        satuan_id: '',
        nama: '',
        harga: '',
        stok: '',
        deskripsi: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/produk');
    }

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded border my-8">
            <Head title="Tambah Produk" />

            <Link href="/produk" className="text-blue-600 hover:underline text-sm">
                &larr; Kembali ke Daftar Produk
            </Link>
            <h1 className="text-xl font-bold my-4">Tambah Produk Sayur</h1>

            <FormProduk
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                kategoris={kategoris}
                satuans={satuans}
                onSubmit={handleSubmit}
                labelTombol="Simpan Produk"
                labelProses="Menyimpan..."
            />
        </div>
    );
}