import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import HeaderHalaman from '@/Components/HeaderHalaman';
import FormProduk from '@/Components/FormProduk';
import PratinjauProduk from '@/Components/PratinjauProduk';

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
        <AppLayout lebar="max-w-5xl">
            <Head title="Tambah Produk" />

            <HeaderHalaman
                posisi={[{ label: 'Beranda', href: '/' }, { label: 'Produk', href: '/produk' }, { label: 'Tambah produk' }]}
                judul="Tambah produk"
                deskripsi="Isi data sayur yang baru datang. Setelah disimpan, kamu kembali ke daftar produk."
            />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="kartu p-6 lg:col-span-2">
                    <FormProduk
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        kategoris={kategoris}
                        satuans={satuans}
                        onSubmit={handleSubmit}
                        labelTombol="Simpan produk"
                        labelProses="Menyimpan..."
                    />
                </div>
                <PratinjauProduk data={data} kategoris={kategoris} satuans={satuans} />
            </div>
        </AppLayout>
    );
}