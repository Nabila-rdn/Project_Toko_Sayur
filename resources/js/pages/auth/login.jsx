import { Head, useForm } from '@inertiajs/react';
import Field from '@/Components/Field';

const CONTOH = [
    { emoji: '🥬', nama: 'Kangkung', harga: 'Rp 3.000', satuan: 'ikat', miring: '-rotate-3' },
    { emoji: '🍅', nama: 'Tomat', harga: 'Rp 12.000', satuan: 'kg', miring: 'rotate-2' },
    { emoji: '🥕', nama: 'Wortel', harga: 'Rp 7.000', satuan: 'kg', miring: '-rotate-1' },
];

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({ email: '', password: '' });

    function handleSubmit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <div className="grid min-h-screen md:grid-cols-2">
            <Head title="Masuk" />

            <section className="hidden flex-col justify-between bg-daun-900 p-12 text-white md:flex">
                <div className="flex items-center gap-2.5">
                    <span className="grid size-9 place-items-center rounded-xl bg-daun-700 text-xl" aria-hidden="true">🥬</span>
                    <span className="font-display text-lg font-bold">Toko Sayur</span>
                </div>

                <div>
                    <h1 className="max-w-md font-display text-5xl font-extrabold leading-[1.05]">
                        Harga dan stok sayur hari ini, di satu layar.
                    </h1>
                    <p className="mt-5 max-w-sm text-daun-200">
                        Masuk untuk memperbarui harga, mengecek stok, dan melihat sayur mana yang perlu diisi ulang.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4" aria-hidden="true">
                    {CONTOH.map((c) => (
                        <div key={c.nama} className={`${c.miring} rounded-lg bg-kunyit-100 py-2 pl-7 pr-4 text-kunyit-900 shadow-lg relative`}>
                            <span className="absolute left-2.5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-daun-900" />
                            <p className="text-xs font-semibold">{c.emoji} {c.nama}</p>
                            <p className="font-display text-lg font-bold tabular-nums">
                                {c.harga}<span className="text-xs font-medium text-kunyit-700">/{c.satuan}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-8 flex items-center gap-2.5 md:hidden">
                        <span className="grid size-9 place-items-center rounded-xl bg-daun-900 text-xl" aria-hidden="true">🥬</span>
                        <span className="font-display text-lg font-bold">Toko Sayur</span>
                    </div>

                    <h2 className="text-3xl font-bold">Masuk</h2>
                    <p className="mt-1 text-daun-700">Pakai akun admin atau pemilik toko.</p>

                    <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
                        <Field id="email" label="Email" error={errors.email}>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={`input ${errors.email ? 'input-error' : ''}`}
                                aria-invalid={errors.email ? true : undefined}
                                aria-describedby={errors.email ? 'email-galat' : undefined}
                            />
                        </Field>

                        <Field id="password" label="Kata sandi" error={errors.password}>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className={`input ${errors.password ? 'input-error' : ''}`}
                                aria-invalid={errors.password ? true : undefined}
                                aria-describedby={errors.password ? 'password-galat' : undefined}
                            />
                        </Field>

                        <button type="submit" disabled={processing} className="btn btn-primary w-full">
                            {processing ? 'Memeriksa...' : 'Masuk'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}