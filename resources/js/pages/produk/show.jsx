import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import HeaderHalaman from '@/Components/HeaderHalaman';
import GambarSayur from '@/Components/GambarSayur';
import LabelHarga from '@/Components/LabelHarga';
import StatusBadge from '@/Components/StatusBadge';
import KonfirmasiHapus from '@/Components/KonfirmasiHapus';
import { tanggal } from '@/lib/format';

function Baris({ label, children }) {
    return (
        <div className="grid grid-cols-3 gap-3 py-3 text-sm">
            <dt className="text-daun-700">{label}</dt>
            <dd className="col-span-2 font-semibold">{children}</dd>
        </div>
    );
}

export default function Show({ produk, can = {} }) {
    const [konfirmasi, setKonfirmasi] = useState(false);
    const [menghapus, setMenghapus] = useState(false);

    function hapus() {
        router.delete(`/produk/${produk.id}`, {
            onStart: () => setMenghapus(true),
            onFinish: () => setMenghapus(false),
        });
    }

    return (
        <AppLayout lebar="max-w-4xl">
            <Head title={produk.nama} />

            <HeaderHalaman
                posisi={[{ label: 'Beranda', href: '/' }, { label: 'Produk', href: '/produk' }, { label: produk.nama }]}
                judul={produk.nama}
                aksi={
                    <>
                        {can.update && (
                            <Link href={`/produk/${produk.id}/edit`} className="btn btn-primary">Ubah produk</Link>
                        )}
                        {can.delete && (
                            <button type="button" onClick={() => setKonfirmasi(true)} className="btn btn-ghost text-cabai-600">
                                Hapus
                            </button>
                        )}
                    </>
                }
            />

            <div className="kartu p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-5">
                    <GambarSayur nama={produk.nama} ukuran="lg" />
                    <div className="space-y-3">
                        <StatusBadge status={produk.status_ketersediaan} />
                        <div>
                            <LabelHarga harga={produk.harga} satuan={produk.satuan?.nama} besar />
                        </div>
                    </div>
                </div>

                <dl className="mt-6 divide-y divide-daun-100 border-t border-daun-100">
                    <Baris label="Kategori">{produk.kategori?.nama ?? '-'}</Baris>
                    <Baris label="Satuan">{produk.satuan?.nama ?? '-'}</Baris>
                    <Baris label="Stok"><span className="tabular-nums">{produk.stok}</span></Baris>
                    <Baris label="Deskripsi">
                        <span className="font-normal">{produk.deskripsi || 'Belum ada deskripsi.'}</span>
                    </Baris>
                    <Baris label="Diperbarui"><span className="font-normal">{tanggal(produk.updated_at)}</span></Baris>
                </dl>
            </div>

            <div className="mt-6">
                <Link href="/produk" className="text-sm font-semibold text-daun-700 hover:underline">
                    &larr; Kembali ke daftar produk
                </Link>
            </div>

            {konfirmasi && (
                <KonfirmasiHapus
                    produk={produk}
                    memproses={menghapus}
                    onBatal={() => setKonfirmasi(false)}
                    onYa={hapus}
                />
            )}
        </AppLayout>
    );
}