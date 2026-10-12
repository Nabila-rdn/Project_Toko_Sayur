import { usePage } from '@inertiajs/react';

export default function PesanFlash() {
    const { flash } = usePage().props;
    if (!flash?.sukses) return null;

    return (
        <div className="mb-4 rounded bg-green-100 p-3 text-green-800 border border-green-300">
            {flash.sukses}
        </div>
    );
}