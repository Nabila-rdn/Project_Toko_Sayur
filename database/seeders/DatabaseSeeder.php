<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Kategori;
use App\Models\Satuan;
use App\Models\Produk;
use App\Models\ProfilToko;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin Utama',
            'email' => 'admin@tokosayur.test',
            'password' => Hash::make('password'),
            'role' => 'admin', // Pastikan kolom role ada di migrasi tabel users milikmu
        ]);

        $sayur = Kategori::create(['nama' => 'Sayuran Hijau', 'slug' => 'sayuran-hijau']);
        $kg = Satuan::create(['nama' => 'kg']);

        Produk::factory(10)->create(['kategori_id' => $sayur->id, 'satuan_id' => $kg->id]);

        ProfilToko::create([
            'nama_toko' => 'Toko Sayur Segar',
            'alamat' => 'Jl. Contoh No. 1',
            'jam_operasional' => '06.00 - 17.00 WIB',
            'nomor_wa' => '62812xxxxxxx',
        ]);
    }
}
