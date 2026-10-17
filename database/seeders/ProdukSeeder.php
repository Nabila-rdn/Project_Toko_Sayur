<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Produk;
use App\Models\Satuan;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    public function run(): void
    {
        Produk::factory(15)->create([
            'kategori_id' => fn () => Kategori::inRandomOrder()->value('id'),
            'satuan_id'   => fn () => Satuan::inRandomOrder()->value('id'),
        ]);
    }
}
