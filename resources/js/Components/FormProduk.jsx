import { Link } from '@inertiajs/react';
import Field from '@/Components/Field';

const jumlahGalat = (errors) => Object.keys(errors ?? {}).length;

export default function FormProduk({
    data,
    setData,
    errors,
    processing,
    kategoris = [],
    satuans = [],
    onSubmit,
    labelTombol,
    labelProses,
}) {
    const banyakGalat = jumlahGalat(errors);
    const kelas = (nama) => `input ${errors[nama] ? 'input-error' : ''}`;
    const aria = (nama) => ({
        'aria-invalid': errors[nama] ? true : undefined,
        'aria-describedby': errors[nama] ? `${nama}-galat` : undefined,
    });

    return (
        <form onSubmit={onSubmit} noValidate className="space-y-5">
            {banyakGalat > 0 && (
                <div role="alert" className="rounded-xl bg-cabai-100 px-4 py-3 text-sm font-medium text-cabai-700 ring-1 ring-cabai-500/30">
                    Ada {banyakGalat} isian yang perlu diperbaiki. Cek pesan merah di bawah tiap kolom.
                </div>
            )}

            <Field id="nama" label="Nama produk" error={errors.nama}>
                <input
                    id="nama"
                    type="text"
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    placeholder="Contoh: Kangkung segar"
                    className={kelas('nama')}
                    {...aria('nama')}
                />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
                <Field id="kategori_id" label="Kategori" error={errors.kategori_id}>
                    <select
                        id="kategori_id"
                        value={data.kategori_id}
                        onChange={(e) => setData('kategori_id', e.target.value)}
                        className={kelas('kategori_id')}
                        {...aria('kategori_id')}
                    >
                        <option value="">Pilih kategori</option>
                        {kategoris.map((k) => (
                            <option key={k.id} value={k.id}>{k.nama}</option>
                        ))}
                    </select>
                </Field>

                <Field id="satuan_id" label="Satuan (boleh kosong)" error={errors.satuan_id}>
                    <select
                        id="satuan_id"
                        value={data.satuan_id}
                        onChange={(e) => setData('satuan_id', e.target.value)}
                        className={kelas('satuan_id')}
                        {...aria('satuan_id')}
                    >
                        <option value="">Tanpa satuan</option>
                        {satuans.map((s) => (
                            <option key={s.id} value={s.id}>{s.nama}</option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <Field id="harga" label="Harga" error={errors.harga}>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-daun-700">Rp</span>
                        <input
                            id="harga"
                            type="number"
                            min="0"
                            inputMode="numeric"
                            value={data.harga}
                            onChange={(e) => setData('harga', e.target.value)}
                            className={`${kelas('harga')} pl-10`}
                            {...aria('harga')}
                        />
                    </div>
                </Field>

                <Field
                    id="stok"
                    label="Stok"
                    hint="Status tersedia, menipis (5 atau kurang), atau habis ditentukan otomatis dari angka ini."
                    error={errors.stok}
                >
                    <input
                        id="stok"
                        type="number"
                        min="0"
                        inputMode="numeric"
                        value={data.stok}
                        onChange={(e) => setData('stok', e.target.value)}
                        className={kelas('stok')}
                        {...aria('stok')}
                    />
                </Field>
            </div>

            <Field id="deskripsi" label="Deskripsi (boleh kosong)" error={errors.deskripsi}>
                <textarea
                    id="deskripsi"
                    rows={4}
                    value={data.deskripsi}
                    onChange={(e) => setData('deskripsi', e.target.value)}
                    placeholder="Asal sayur, cara simpan, atau catatan lain untuk pembeli"
                    className={kelas('deskripsi')}
                    {...aria('deskripsi')}
                />
            </Field>

            <div className="flex flex-wrap items-center gap-3 border-t border-daun-100 pt-5">
                <button type="submit" disabled={processing} className="btn btn-primary">
                    {processing ? labelProses : labelTombol}
                </button>
                <Link href="/produk" className="btn btn-ghost">
                    Batal
                </Link>
            </div>
        </form>
    );
}