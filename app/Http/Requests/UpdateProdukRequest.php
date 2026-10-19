<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProdukRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('produk'));
    }

    public function rules(): array
    {
        return [
            'kategori_id' => 'required|exists:kategoris,id',
            'satuan_id'   => 'nullable|exists:satuans,id',
            'nama'        => 'required|string|max:150',
            'harga'       => 'required|numeric|min:0',
            'stok'        => 'required|integer|min:0',
            'deskripsi'   => 'nullable|string',
        ];
    }
}