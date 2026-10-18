import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import GambarSayur from '@/Components/GambarSayur';
import StatusBadge from '@/Components/StatusBadge';
import Kosong from '@/Components/Kosong';

const SEGMEN = [
    { kunci: 'tersedia', label: 'Tersedia', warna: 'bg-daun-500' },
    { kunci: 'menipis', label: 'Stok menipis', warna: 'bg-kunyit-500' },
    { kunci: 'habis', label: 'Habis', warna: 'bg-cabai-500' },
];

export default function Home({ ringkasan, perluPerhatian = [] }) {
    const { auth } = usePage().props;
    const { total, menipis, habis } = ringkasan;
    const perluIsiUlang = menipis + habis;

    const kalimat =
        total === 0
            ? 'Belum ada produk di katalog.'
            : perluIsiUlang === 0
              ? `Semua ${total} jenis sayur stoknya aman hari ini.`
              : `Dari ${total} jenis sayur, ${perluIsiUlang} perlu diisi ulang.`;

    return (
        <AppLayout>
            <Head title="Beranda" />

            <header className="mb-8">
                <h1 className="text-4xl font-extrabold">Halo, {auth.user.name}</h1>
                <p className="mt-1 text-lg text-daun-700">{kalimat}</p>
            </header>

            {total === 0 ? (
                <Kosong
                    judul="Katalog masih kosong"
                    pesan="Tambahkan sayur pertama supaya stok dan harga bisa dipantau di sini."
                    aksi={
                        auth.can.buatProduk ? (
                            <Link href="/produk/create" className="btn btn-primary">Tambah produk pertama</Link>
                        ) : (
                            <p className="text-sm text-daun-700">Minta admin untuk menambahkan produk.</p>
                        )
                    }
                />
            ) : (
                <div className="grid gap-6 lg:grid-cols-5">
                    <section className="kartu p-6 lg:col-span-3" aria-labelledby="judul-stok">
                        <h2 id="judul-stok" className="text-lg font-bold">Kondisi stok</h2>

                        <div className="mt-5 flex h-4 overflow-hidden rounded-full bg-daun-50" role="img"
                             aria-label={`Tersedia ${ringkasan.tersedia}, menipis ${menipis}, habis ${habis}`}>
                            {SEGMEN.map((s) => (
                                <div key={s.kunci} className={s.warna} style={{ width: `${(ringkasan[s.kunci] / total) * 100}%` }} />
                            ))}
                        </div>

                        <dl className="mt-5 grid grid-cols-3 gap-4">
                            {SEGMEN.map((s) => (
                                <div key={s.kunci}>
                                    <dt className="flex items-center gap-2 text-sm text-daun-700">
                                        <span className={`size-2.5 rounded-full ${s.warna}`} aria-hidden="true" />
                                        {s.label}
                                    </dt>
                                    <dd className="mt-1 font-display text-3xl font-bold tabular-nums">{ringkasan[s.kunci]}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section className="kartu p-6 lg:col-span-2" aria-labelledby="judul-isi-ulang">
                        <h2 id="judul-isi-ulang" className="text-lg font-bold">Perlu diisi ulang</h2>

                        {perluPerhatian.length === 0 ? (
                            <p className="mt-4 text-sm text-daun-700">Tidak ada. Semua stok di atas batas aman.</p>
                        ) : (
                            <ul className="mt-4 divide-y divide-daun-100">
                                {perluPerhatian.map((p) => (
                                    <li key={p.id}>
                                        <Link href={`/produk/${p.id}`} className="flex items-center gap-3 py-3 hover:bg-daun-50">
                                            <GambarSayur nama={p.nama} ukuran="sm" />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate font-semibold">{p.nama}</p>
                                                <p className="text-xs text-daun-700">Sisa {p.stok} {p.satuan?.nama ?? ''}</p>
                                            </div>
                                            <StatusBadge status={p.status_ketersediaan} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            )}

            <section className="mt-10" aria-labelledby="judul-arah">
                <h2 id="judul-arah" className="mb-4 text-lg font-bold">Mau ke mana?</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Link href="/produk" className="kartu group flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
                        <span className="text-4xl" aria-hidden="true">🧺</span>
                        <span>
                            <span className="block font-display text-lg font-bold group-hover:underline">Lihat semua produk</span>
                            <span className="text-sm text-daun-700">Cari sayur, cek harga, dan lihat rincian.</span>
                        </span>
                    </Link>

                    {auth.can.buatProduk && (
                        <Link href="/produk/create" className="kartu group flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
                            <span className="text-4xl" aria-hidden="true">🌱</span>
                            <span>
                                <span className="block font-display text-lg font-bold group-hover:underline">Tambah produk baru</span>
                                <span className="text-sm text-daun-700">Masukkan sayur yang baru datang.</span>
                            </span>
                        </Link>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}