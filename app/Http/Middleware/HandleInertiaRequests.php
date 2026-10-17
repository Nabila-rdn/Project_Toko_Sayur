<?php

namespace App\Http\Middleware;

use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        return array_merge(parent::share($request), [
            'flash' => [
                'sukses' => fn () => $request->session()->get('sukses'),
                'galat'  => fn () => $request->session()->get('galat'),
            ],
            'auth' => [
                'user' => $user,
                'can'  => [
                    'buatProduk' => $user ? $user->can('create', Produk::class) : false,
                ],
            ],
        ]);
    }
}
