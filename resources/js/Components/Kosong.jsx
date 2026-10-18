export default function Kosong({ ikon = '🥬', judul, pesan, aksi }) {
    return (
        <div className="kartu flex flex-col items-center px-6 py-14 text-center">
            <div className="mb-3 text-5xl" aria-hidden="true">{ikon}</div>
            <h2 className="text-lg font-semibold text-daun-900">{judul}</h2>
            {pesan && <p className="mt-1 max-w-sm text-sm text-daun-700">{pesan}</p>}
            {aksi && <div className="mt-5">{aksi}</div>}
        </div>
    );
}