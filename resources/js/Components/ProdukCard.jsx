import { Link } from '@inertiajs/react';
import GambarSayur from '@/Components/GambarSayur';
import LabelHarga from '@/Components/LabelHarga';
import StatusBadge from '@/Components/StatusBadge';

export default function ProdukCard({ produk, onHapus }) {
    const boleh = produk.can ?? {};

    return (
        <article className="kartu flex flex-col p-4">
            <div className="flex items-start gap-3">
                <GambarSayur nama={produk.nama} />
                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-bold text-daun-900">
                        <Link href={`/produk/${produk.id}`} className="hover:underline">
                            {produk.nama}
                        </Link>
                    </h2>
                    <p className="text-xs text-daun-700">{produk.kategori?.nama ?? 'Tanpa kategori'}</p>
                    <div className="mt-2">
                        <StatusBadge status={produk.status_ketersediaan} />
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-2">
                <LabelHarga harga={produk.harga} satuan={produk.satuan?.nama} />
                <p className="text-sm text-daun-700">
                    Stok <span className="font-bold tabular-nums text-daun-900">{produk.stok}</span>
                </p>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-daun-100 pt-3">
                <Link href={`/produk/${produk.id}`} className="btn btn-ghost btn-sm">
                    Lihat rincian
                </Link>
                {boleh.update && (
                    <Link href={`/produk/${produk.id}/edit`} className="btn btn-ghost btn-sm">
                        Ubah
                    </Link>
                )}
                {boleh.delete && (
                    <button type="button" onClick={() => onHapus(produk)} className="btn btn-sm ml-auto text-cabai-600 hover:bg-cabai-100">
                        Hapus
                    </button>
                )}
            </div>
        </article>
    );
}