import { useEffect, useRef } from 'react';

export default function KonfirmasiHapus({ produk, memproses, onBatal, onYa }) {
    const tombolBatal = useRef(null);

    useEffect(() => {
        tombolBatal.current?.focus();
        const tutupDenganEsc = (e) => e.key === 'Escape' && !memproses && onBatal();
        window.addEventListener('keydown', tutupDenganEsc);
        return () => window.removeEventListener('keydown', tutupDenganEsc);
    }, [memproses, onBatal]);

    return (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
            <div className="absolute inset-0 bg-daun-900/50" onClick={() => !memproses && onBatal()} aria-hidden="true" />

            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="judul-hapus"
                aria-describedby="isi-hapus"
                className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            >
                <h2 id="judul-hapus" className="text-lg font-bold text-daun-900">
                    Hapus {produk.nama}?
                </h2>
                <p id="isi-hapus" className="mt-2 text-sm text-daun-700">
                    Produk ini akan hilang dari daftar dan katalog. Tindakan ini tidak bisa dibatalkan dari layar ini.
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button ref={tombolBatal} type="button" onClick={onBatal} disabled={memproses} className="btn btn-ghost">
                        Batal
                    </button>
                    <button type="button" onClick={onYa} disabled={memproses} className="btn btn-danger">
                        {memproses ? 'Menghapus...' : 'Ya, hapus'}
                    </button>
                </div>
            </div>
        </div>
    );
}