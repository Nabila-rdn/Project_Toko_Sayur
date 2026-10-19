<?php

namespace App\Policies;

use App\Models\Produk;
use App\Models\User;

class ProdukPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Produk $produk): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Produk $produk): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Produk $produk): bool
    {
        return $user->isAdmin();
    }

    public function restore(User $user, Produk $produk): bool
    {
        return false;
    }

    public function forceDelete(User $user, Produk $produk): bool
    {
        return false;
    }
}