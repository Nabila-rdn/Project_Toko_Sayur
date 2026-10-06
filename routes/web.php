<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::resource('produk', ProdukController::class);
