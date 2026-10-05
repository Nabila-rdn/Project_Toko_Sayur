<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    public function index()
    {
        $produks = Produk::with(['kategori', 'satuan'])->get();

        return Inertia::render('produk/index', [
            'produks' => $produks,
        ]);
    }

    public function create()
    {

    }

    public function store(Request $request)
    {

    }

    public function show(Produk $produk)
    {
        $produk->load(['kategori', 'satuan']);

        return Inertia::render('produk/show', [
            'produk' => $produk,
        ]);
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}