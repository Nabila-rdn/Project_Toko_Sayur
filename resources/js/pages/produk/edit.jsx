import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import HeaderHalaman from '@/Components/HeaderHalaman';
import FormProduk from '@/Components/FormProduk';
import PratinjauProduk from '@/Components/PratinjauProduk';

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
        <AppLayout lebar="max-w-5xl">
            <Head title={`Ubah ${produk.nama}`} />

            <HeaderHalaman
                posisi={[
                    { label: 'Beranda', href: '/' },
                    { label: 'Produk', href: '/produk' },
                    { label: produk.nama, href: `/produk/${produk.id}` },
                    { label: 'Ubah' },
                ]}
                judul={`Ubah ${produk.nama}`}
                deskripsi="Perbarui harga atau stok. Setelah disimpan, kamu kembali ke daftar produk."
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
                        labelTombol="Simpan perubahan"
                        labelProses="Menyimpan..."
                    />
                </div>
                <PratinjauProduk data={data} kategoris={kategoris} satuans={satuans} />
            </div>
        </AppLayout>
    );
}