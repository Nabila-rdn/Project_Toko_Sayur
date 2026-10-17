<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProdukRequest;
use App\Http\Requests\UpdateProdukRequest;
use App\Models\Kategori;
use App\Models\Produk;
use App\Models\Satuan;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProdukController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Produk::class);
        $user = $request->user();

        $produks = Produk::with(['kategori', 'satuan'])->latest()->get()
            ->each(fn (Produk $p) => $p->setAttribute('can', [
                'update' => $user->can('update', $p),
                'delete' => $user->can('delete', $p),
            ]));

        return Inertia::render('produk/index', [
            'produks' => $produks,
            'can'     => ['create' => $user->can('create', Produk::class)],
        ]);
    }

    public function create()
    {
        $this->authorize('create', Produk::class);

        return Inertia::render('produk/create', [
            'kategoris' => Kategori::orderBy('nama')->get(),
            'satuans'   => Satuan::orderBy('nama')->get(),
        ]);
    }

    public function store(StoreProdukRequest $request)
    {
        $validated = $request->validated();
        $validated['slug'] = $this->buatSlug($validated['nama']);
        $validated['status_ketersediaan'] = $this->tentukanStatus($validated['stok']);

        Produk::create($validated);

        return redirect()->route('produk.index')
            ->with('sukses', 'Produk sayur berhasil ditambahkan!');
    }

    public function show(Request $request, Produk $produk)
    {
        $this->authorize('view', $produk);
        $produk->load(['kategori', 'satuan']);

        return Inertia::render('produk/show', [
            'produk' => $produk,
            'can'    => [
                'update' => $request->user()->can('update', $produk),
                'delete' => $request->user()->can('delete', $produk),
            ],
        ]);
    }

    public function edit(Produk $produk)
    {
        $this->authorize('update', $produk);

        return Inertia::render('produk/edit', [
            'produk'    => $produk,
            'kategoris' => Kategori::orderBy('nama')->get(),
            'satuans'   => Satuan::orderBy('nama')->get(),
        ]);
    }

    public function update(UpdateProdukRequest $request, Produk $produk)
    {
        $validated = $request->validated();
        $validated['slug'] = $this->buatSlug($validated['nama'], $produk->id);
        $validated['status_ketersediaan'] = $this->tentukanStatus($validated['stok']);

        $produk->update($validated);

        return redirect()->route('produk.index')
            ->with('sukses', 'Data produk berhasil diperbarui!');
    }

    public function destroy(Produk $produk)
    {
        $this->authorize('delete', $produk);
        $produk->delete();

        return redirect()->route('produk.index')
            ->with('sukses', 'Produk berhasil dihapus!');
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