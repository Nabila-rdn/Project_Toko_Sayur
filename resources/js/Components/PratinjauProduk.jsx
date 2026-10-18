import GambarSayur from '@/Components/GambarSayur';
import LabelHarga from '@/Components/LabelHarga';
import StatusBadge, { statusDariStok } from '@/Components/StatusBadge';

export default function PratinjauProduk({ data, kategoris = [], satuans = [] }) {
    const kategori = kategoris.find((k) => String(k.id) === String(data.kategori_id));
    const satuan = satuans.find((s) => String(s.id) === String(data.satuan_id));
    const status = statusDariStok(data.stok);

    return (
        <aside className="kartu p-5 lg:sticky lg:top-6">
            <h2 className="text-sm font-semibold text-daun-700">Begini tampilannya di daftar</h2>

            <div className="mt-4 flex items-start gap-3">
                <GambarSayur nama={data.nama} />
                <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-daun-900">{data.nama || 'Nama produk'}</p>
                    <p className="text-xs text-daun-700">{kategori?.nama ?? 'Belum pilih kategori'}</p>
                    <div className="mt-2 min-h-7">{status && <StatusBadge status={status} />}</div>
                </div>
            </div>

            <div className="mt-3 flex items-end justify-between gap-2">
                <LabelHarga harga={data.harga} satuan={satuan?.nama} />
                <p className="text-sm text-daun-700">
                    Stok <span className="font-bold tabular-nums text-daun-900">{data.stok === '' ? 0 : data.stok}</span>
                </p>
            </div>
        </aside>
    );
}