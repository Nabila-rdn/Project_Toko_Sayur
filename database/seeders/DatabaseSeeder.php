<?php

namespace Database\Seeders;

use App\Models\ProfilToko;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Admin Utama',
            'email'    => 'admin@tokosayur.test',
            'password' => 'password',
            'role'     => 'admin',
        ]);

        User::create([
            'name'     => 'Pemilik Toko',
            'email'    => 'pemilik@tokosayur.test',
            'password' => 'password',
            'role'     => 'pemilik',
        ]);

        $this->call([
            KategoriSeeder::class,
            ProdukSeeder::class,
        ]);

        ProfilToko::create([
            'nama_toko'       => 'Toko Sayur Segar',
            'alamat'          => 'Jl. Contoh No. 1',
            'jam_operasional' => '06.00 - 17.00 WIB',
            'nomor_wa'        => '62812xxxxxxx',
        ]);
    }
}
