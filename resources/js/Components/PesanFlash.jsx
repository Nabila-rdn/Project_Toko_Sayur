import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const GAYA = {
    sukses: 'bg-daun-100 text-daun-900 ring-daun-200',
    galat: 'bg-cabai-100 text-cabai-700 ring-cabai-500/30',
};

export default function PesanFlash() {
    const { flash } = usePage().props;
    const [tampil, setTampil] = useState(true);

    // flash berganti objek setiap kunjungan, jadi pesan yang sama tetap muncul lagi
    useEffect(() => {
        setTampil(true);
        const timer = setTimeout(() => setTampil(false), 6000);
        return () => clearTimeout(timer);
    }, [flash]);

    const jenis = flash?.sukses ? 'sukses' : flash?.galat ? 'galat' : null;
    if (!jenis || !tampil) return null;

    return (
        <div
            role={jenis === 'galat' ? 'alert' : 'status'}
            className={`mb-6 flex items-start justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium ring-1 ${GAYA[jenis]}`}
        >
            <span>{flash[jenis]}</span>
            <button
                type="button"
                onClick={() => setTampil(false)}
                aria-label="Tutup pesan"
                className="-m-1 rounded p-1 text-lg leading-none opacity-60 hover:opacity-100"
            >
                &times;
            </button>
        </div>
    );
}