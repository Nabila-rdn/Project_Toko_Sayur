<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatHarga extends Model
{
    protected $fillable = ['produk_id', 'diubah_oleh', 'harga_lama', 'harga_baru', 'keterangan'];

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }

    public function pengubah()
    {
        return $this->belongsTo(User::class, 'diubah_oleh');
    }
}