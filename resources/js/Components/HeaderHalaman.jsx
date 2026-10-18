import Breadcrumb from '@/Components/Breadcrumb';

export default function HeaderHalaman({ judul, deskripsi, posisi = [], aksi }) {
    return (
        <header className="mb-6">
            {posisi.length > 0 && <Breadcrumb items={posisi} />}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-daun-900">{judul}</h1>
                    {deskripsi && <p className="mt-1 max-w-prose text-daun-700">{deskripsi}</p>}
                </div>
                {aksi && <div className="flex flex-wrap items-center gap-2">{aksi}</div>}
            </div>
        </header>
    );
}