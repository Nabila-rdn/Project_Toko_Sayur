<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AksesProdukTest extends TestCase
{
    use RefreshDatabase;

    public function test_tamu_diarahkan_ke_login(): void
    {
        $this->get('/produk')->assertRedirect('/login');
    }

    public function test_pemilik_tidak_boleh_membuka_form_tambah(): void
    {
        $pemilik = User::factory()->create(['role' => 'pemilik']);

        $this->actingAs($pemilik)->get('/produk/create')->assertForbidden();
    }

    public function test_admin_boleh_membuka_form_tambah(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)->get('/produk/create')->assertOk();
    }
}