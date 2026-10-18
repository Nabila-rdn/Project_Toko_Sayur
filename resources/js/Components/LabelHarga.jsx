import { rupiah } from '@/lib/format';

export default function LabelHarga({ harga, satuan, besar = false }) {
    return (
        <span className="relative inline-flex items-baseline gap-1 rounded-md bg-kunyit-100 py-1 pl-6 pr-3 text-kunyit-900">
            <span
                className="absolute left-2 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white ring-1 ring-kunyit-500/60"
                aria-hidden="true"
            />
            <span className={`font-display font-bold tabular-nums ${besar ? 'text-2xl' : 'text-base'}`}>
                {rupiah(harga)}
            </span>
            {satuan && <span className="text-xs font-medium text-kunyit-700">/{satuan}</span>}
        </span>
    );
}