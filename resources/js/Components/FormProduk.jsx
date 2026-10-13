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
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Nama Produk</label>
                <input
                    type="text"
                    value={data.nama}
                    onChange={(e) => setData('nama', e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                />
                {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Kategori</label>
                <select
                    value={data.kategori_id}
                    onChange={(e) => setData('kategori_id', e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                >
                    <option value="">-- Pilih kategori --</option>
                    {kategoris.map((k) => (
                        <option key={k.id} value={k.id}>{k.nama}</option>
                    ))}
                </select>
                {errors.kategori_id && <p className="text-red-500 text-xs mt-1">{errors.kategori_id}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Satuan (opsional)</label>
                <select
                    value={data.satuan_id}
                    onChange={(e) => setData('satuan_id', e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                >
                    <option value="">-- Tanpa satuan --</option>
                    {satuans.map((s) => (
                        <option key={s.id} value={s.id}>{s.nama}</option>
                    ))}
                </select>
                {errors.satuan_id && <p className="text-red-500 text-xs mt-1">{errors.satuan_id}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Harga (Rp)</label>
                <input
                    type="number"
                    value={data.harga}
                    onChange={(e) => setData('harga', e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                />
                {errors.harga && <p className="text-red-500 text-xs mt-1">{errors.harga}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Stok</label>
                <input
                    type="number"
                    value={data.stok}
                    onChange={(e) => setData('stok', e.target.value)}
                    className="w-full border p-2 rounded mt-1"
                />
                {errors.stok && <p className="text-red-500 text-xs mt-1">{errors.stok}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium">Deskripsi (opsional)</label>
                <textarea
                    value={data.deskripsi}
                    onChange={(e) => setData('deskripsi', e.target.value)}
                    rows={3}
                    className="w-full border p-2 rounded mt-1"
                />
                {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
            >
                {processing ? labelProses : labelTombol}
            </button>
        </form>
    );
}