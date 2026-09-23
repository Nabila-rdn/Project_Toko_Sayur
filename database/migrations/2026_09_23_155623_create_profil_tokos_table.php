<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profil_tokos', function (Blueprint $table) {
            $table->id();
            $table->string('nama_toko', 150);
            $table->text('alamat');
            $table->string('jam_operasional', 100);
            $table->string('nomor_wa', 20);
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profil_tokos');
    }
};
