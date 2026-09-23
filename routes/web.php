<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;

Route::get('/', function () {
    return redirect()->route('produk.index');
});

Route::resource('produk', ProdukController::class);
