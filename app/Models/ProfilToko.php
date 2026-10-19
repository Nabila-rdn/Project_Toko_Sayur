<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilToko extends Model
{
    protected $fillable = ['nama_toko', 'alamat', 'jam_operasional', 'nomor_wa', 'deskripsi', 'logo'];
}