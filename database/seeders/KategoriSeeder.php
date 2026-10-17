<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Satuan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class KategoriSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['Sayuran Hijau', 'Sayuran Umbi', 'Sayuran Buah', 'Bumbu Dapur'] as $nama) {
            Kategori::create(['nama' => $nama, 'slug' => Str::slug($nama)]);
        }

        foreach (['kg', 'ikat', 'pcs'] as $nama) {
            Satuan::create(['nama' => $nama]);
        }
    }
}
