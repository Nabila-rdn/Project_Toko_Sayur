export function statusDariStok(stok) {
    if (stok === '' || stok === null || stok === undefined) return null;
    const n = Number(stok);
    if (!Number.isFinite(n)) return null;
    if (n === 0) return 'habis';
    return n <= 5 ? 'stok_menipis' : 'tersedia';
}

const GAYA = {
    tersedia: { label: 'Tersedia', badan: 'bg-daun-100 text-daun-800', titik: 'bg-daun-500' },
    stok_menipis: { label: 'Stok menipis', badan: 'bg-kunyit-100 text-kunyit-700', titik: 'bg-kunyit-500' },
    habis: { label: 'Habis', badan: 'bg-cabai-100 text-cabai-700', titik: 'bg-cabai-500' },
};

export default function StatusBadge({ status }) {
    const gaya = GAYA[status];
    if (!gaya) return null;

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${gaya.badan}`}>
            <span className={`size-1.5 rounded-full ${gaya.titik}`} aria-hidden="true" />
            {gaya.label}
        </span>
    );
}

export { GAYA as GAYA_STATUS };