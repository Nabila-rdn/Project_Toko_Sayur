<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kategori_id')->constrained('kategoris')->restrictOnDelete();
            $table->foreignId('satuan_id')->nullable()->constrained('satuans')->nullOnDelete();
            $table->string('nama', 150);
            $table->string('slug', 180)->unique();
            $table->decimal('harga', 10, 2);
            $table->unsignedInteger('stok')->default(0);
            $table->enum('status_ketersediaan', ['tersedia','stok_menipis','habis'])->default('tersedia');
            $table->string('foto')->nullable();
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });

        DB::statement('ALTER TABLE produks ADD CONSTRAINT harga_non_negatif CHECK (harga >= 0)');
        DB::statement('ALTER TABLE produks ADD CONSTRAINT stok_non_negatif CHECK (stok >= 0)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
