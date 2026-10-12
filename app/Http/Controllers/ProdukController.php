<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    public function index()
    {
        return Inertia::render('Produk/Index', [
            'produks' => Produk::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Produk/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_produk' => 'required|string|max:255',
            'harga'       => 'required|numeric|min:0',
            'stok'        => 'required|integer|min:0',
        ]);

        Produk::create($validated);
        return redirect()->route('produk.index')
            ->with('sukses', 'Produk sayur berhasil ditambahkan!');
    }

    public function edit(Produk $produk)
    {
        return Inertia::render('Produk/Edit', [
            'produk' => $produk,
        ]);
    }

    public function update(Request $request, Produk $produk)
    {
        $validated = $request->validate([
            'nama_produk' => 'required|string|max:255',
            'harga'       => 'required|numeric|min:0',
            'stok'        => 'required|integer|min:0',
        ]);
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
}
