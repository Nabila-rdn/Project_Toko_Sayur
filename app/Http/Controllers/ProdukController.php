<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index()
    {
        $produks = [
        ['id' => 1, 'nama' => 'Kangkung', 'harga' => 3000],
        ['id' => 2, 'nama' => 'Tomat', 'harga' => 7000],
        ['id' => 3, 'nama' => 'Cabai', 'harga' => 15000],
    ];

    return view('produk.index', ['produks' => $produks]);

    }

    public function create()
    {

    }

    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
