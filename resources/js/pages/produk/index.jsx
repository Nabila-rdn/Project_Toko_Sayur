import { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import HeaderHalaman from '@/Components/HeaderHalaman';
import ProdukCard from '@/Components/ProdukCard';
import Kosong from '@/Components/Kosong';
import KonfirmasiHapus from '@/Components/KonfirmasiHapus';

const FILTER_STATUS = [
    { nilai: 'semua', label: 'Semua' },
    { nilai: 'tersedia', label: 'Tersedia' },
    { nilai: 'stok_menipis', label: 'Stok menipis' },
    { nilai: 'habis', label: 'Habis' },
];

export default function Index({ produks = [], can = {} }) {
    const dataProduk = Array.isArray(produks) ? produks : produks?.data || [];

    const [cari, setCari] = useState('');
    const [status, setStatus] = useState('semua');
    const [kategori, setKategori] = useState('');
    const [yangDihapus, setYangDihapus] = useState(null);
    const [menghapus, setMenghapus] = useState(false);

    const daftarKategori = useMemo(
        () => [...new Map(dataProduk.filter((p) => p.kategori).map((p) => [p.kategori.id, p.kategori])).values()],
        [dataProduk],
    );

    const jumlahPerStatus = useMemo(() => {
        const hitung = { semua: dataProduk.length, tersedia: 0, stok_menipis: 0, habis: 0 };
        dataProduk.forEach((p) => { hitung[p.status_ketersediaan] += 1; });
        return hitung;
    }, [dataProduk]);

    const tampil = useMemo(() => {
        const kata = cari.trim().toLowerCase();
        return dataProduk.filter(
            (p) =>
                (status === 'semua' || p.status_ketersediaan === status) &&
                (!kategori || String(p.kategori_id) === kategori) &&
                p.nama.toLowerCase().includes(kata),
        );
    }, [dataProduk, cari, status, kategori]);

    function hapus() {
        router.delete(`/produk/${yangDihapus.id}`, {
            preserveScroll: true,
            onStart: () => setMenghapus(true),
            onFinish: () => {
                setMenghapus(false);
                setYangDihapus(null);
            },
        });
    }

    function resetFilter() {
        setCari('');
        setStatus('semua');
        setKategori('');
    }

    return (
        <AppLayout>
            <Head title="Daftar Produk" />

            <HeaderHalaman
                posisi={[{ label: 'Beranda', href: '/' }, { label: 'Produk' }]}
                judul="Produk sayur"
                deskripsi={`${dataProduk.length} jenis sayur di katalog.`}
                aksi={
                    can.create && (
                        <Link href="/produk/create" className="btn btn-primary">
                            + Tambah produk
                        </Link>
                    )
                }
            />

            {dataProduk.length === 0 ? (
                <Kosong
                    judul="Belum ada produk"
                    pesan="Katalog masih kosong. Tambahkan sayur pertama untuk mulai memantau harga dan stok."
                    aksi={
                        can.create ? (
                            <Link href="/produk/create" className="btn btn-primary">Tambah produk pertama</Link>
                        ) : (
                            <p className="text-sm text-daun-700">Minta admin untuk menambahkan produk.</p>
                        )
                    }
                />
            ) : (
                <>
                    <div className="mb-6 space-y-4">
                        <div className="flex flex-wrap gap-3">
                            <div className="min-w-56 flex-1">
                                <label htmlFor="cari" className="sr-only">Cari nama sayur</label>
                                <input
                                    id="cari"
                                    type="search"
                                    value={cari}
                                    onChange={(e) => setCari(e.target.value)}
                                    placeholder="Cari nama sayur"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label htmlFor="kategori" className="sr-only">Filter kategori</label>
                                <select id="kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} className="input">
                                    <option value="">Semua kategori</option>
                                    {daftarKategori.map((k) => (
                                        <option key={k.id} value={k.id}>{k.nama}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter status stok">
                            {FILTER_STATUS.map((f) => (
                                <button
                                    key={f.nilai}
                                    type="button"
                                    aria-pressed={status === f.nilai}
                                    onClick={() => setStatus(f.nilai)}
                                    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                                        status === f.nilai
                                            ? 'bg-daun-800 text-white'
                                            : 'bg-white text-daun-800 ring-1 ring-inset ring-daun-200 hover:bg-daun-50'
                                    }`}
                                >
                                    {f.label} <span className="tabular-nums opacity-70">{jumlahPerStatus[f.nilai]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {tampil.length === 0 ? (
                        <Kosong
                            ikon="🔍"
                            judul="Tidak ada sayur yang cocok"
                            pesan="Coba kata kunci lain, atau hapus filter yang sedang dipakai."
                            aksi={<button type="button" onClick={resetFilter} className="btn btn-ghost">Hapus semua filter</button>}
                        />
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {tampil.map((produk) => (
                                <ProdukCard key={produk.id} produk={produk} onHapus={setYangDihapus} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {yangDihapus && (
                <KonfirmasiHapus
                    produk={yangDihapus}
                    memproses={menghapus}
                    onBatal={() => setYangDihapus(null)}
                    onYa={hapus}
                />
            )}
        </AppLayout>
    );
}