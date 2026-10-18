<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimoni extends Model
{
    protected $fillable = ['produk_id', 'nama_pelanggan', 'komentar', 'rating'];

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }
}