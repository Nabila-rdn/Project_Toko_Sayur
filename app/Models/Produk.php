<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'kategori_id', 'satuan_id', 'nama', 'slug',
        'harga', 'stok', 'status_ketersediaan', 'foto', 'deskripsi',
    ];

    protected $casts = [
        'harga' => 'decimal:2',
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function satuan()
    {
        return $this->belongsTo(Satuan::class);
    }
}
