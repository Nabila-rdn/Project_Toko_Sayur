<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProdukFactory extends Factory
{
    public function definition(): array
    {
        $daftarSayur = ['Kangkung', 'Bayam', 'Wortel', 'Tomat', 'Cabai Merah', 'Bawang Putih', 'Kentang', 'Brokoli', 'Sawi Hijau', 'Terong'];
        $namaSayur = $this->faker->randomElement($daftarSayur);

        return [
            'nama' => $namaSayur,
            'slug' => Str::slug($namaSayur) . '-' . $this->faker->unique()->randomNumber(3),
            'harga' => $this->faker->randomElement([3000, 5000, 7000, 12000, 15000]),
            'stok' => $this->faker->numberBetween(5, 50),
            'status_ketersediaan' => 'tersedia',
            'deskripsi' => $this->faker->sentence(),
        ];
    }
}
