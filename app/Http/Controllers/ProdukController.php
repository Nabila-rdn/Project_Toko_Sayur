<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Produk;
use App\Models\Satuan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProdukController extends Controller
{
    public function index()
    {
        return Inertia::render('produk/index', [
            'produks' => Produk::with(['kategori', 'satuan'])->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('produk/create', [
            'kategoris' => Kategori::orderBy('nama')->get(),
            'satuans'   => Satuan::orderBy('nama')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validasi($request);
        $validated['slug'] = $this->buatSlug($validated['nama']);
        $validated['status_ketersediaan'] = $this->tentukanStatus($validated['stok']);

        Produk::create($validated);
        return redirect()->route('produk.index')
            ->with('sukses', 'Produk sayur berhasil ditambahkan!');
    }

    public function show(Produk $produk)
    {
        $produk->load(['kategori', 'satuan']);
        return Inertia::render('produk/show', [
            'produk' => $produk,
        ]);
    }

    public function edit(Produk $produk)
    {
        return Inertia::render('produk/edit', [
            'produk'    => $produk,
            'kategoris' => Kategori::orderBy('nama')->get(),
            'satuans'   => Satuan::orderBy('nama')->get(),
        ]);
    }

    public function update(Request $request, Produk $produk)
    {
        $validated = $this->validasi($request);
        $validated['slug'] = $this->buatSlug($validated['nama'], $produk->id);
        $validated['status_ketersediaan'] = $this->tentukanStatus($validated['stok']);

        $produk->update($validated);
        return redirect()->route('produk.index')
            ->with('sukses', 'Data produk berhasil diperbarui!');
    }

    public function destroy(Produk $produk)
    {
        $produk->delete();
        return redirect()->route('produk.index')
            ->with('sukses', 'Produk berhasil dihapus!');
    }

    private function validasi(Request $request): array
    {
        return $request->validate([
            'kategori_id' => 'required|exists:kategoris,id',
            'satuan_id'   => 'nullable|exists:satuans,id',
            'nama'        => 'required|string|max:150',
            'harga'       => 'required|numeric|min:0',
            'stok'        => 'required|integer|min:0',
            'deskripsi'   => 'nullable|string',
        ]);
    }

    private function buatSlug(string $nama, ?int $abaikanId = null): string
    {
        $dasar = Str::slug($nama);
        $slug = $dasar;
        $urutan = 2;
        while (
            Produk::withTrashed()
                ->where('slug', $slug)
                ->when($abaikanId, fn ($q) => $q->where('id', '!=', $abaikanId))
                ->exists()
        ) {
            $slug = $dasar . '-' . $urutan++;
        }

        return $slug;
    }

    private function tentukanStatus(int $stok): string
    {
        if ($stok === 0) {
            return 'habis';
        }
        return $stok <= 5 ? 'stok_menipis' : 'tersedia';
    }
}
