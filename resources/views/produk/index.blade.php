@extends('layouts.main')

@section('content')
    <h1>Daftar Produk</h1>

    <ul>
        @foreach ($produks as $produk)
            <li>
                <!-- Tautan juga wajib menggunakan helper route() -->
                <a href="{{ route('produk.show', $produk['id']) }}">{{ $produk['nama'] }}</a>
                — Rp{{ $produk['harga'] }}
            </li>
        @endforeach
    </ul>
@endsection
