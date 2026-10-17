<?php

use App\Http\Controllers\ProdukController;
use App\Http\Controllers\SesiController;
use App\Models\Produk;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/login', [SesiController::class, 'create'])->name('login');
    Route::post('/login', [SesiController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [SesiController::class, 'destroy'])->name('logout');

    Route::get('/', function () {
        $perluPerhatian = Produk::with('satuan')
            ->whereIn('status_ketersediaan', ['habis', 'stok_menipis'])
            ->orderBy('stok')
            ->limit(6)
            ->get(['id', 'nama', 'stok', 'status_ketersediaan', 'satuan_id']);

        return Inertia::render('home', [
            'ringkasan' => [
                'total'    => Produk::count(),
                'tersedia' => Produk::where('status_ketersediaan', 'tersedia')->count(),
                'menipis'  => Produk::where('status_ketersediaan', 'stok_menipis')->count(),
                'habis'    => Produk::where('status_ketersediaan', 'habis')->count(),
            ],
            'perluPerhatian' => $perluPerhatian,
        ]);
    })->name('home');

    Route::resource('produk', ProdukController::class);
});
