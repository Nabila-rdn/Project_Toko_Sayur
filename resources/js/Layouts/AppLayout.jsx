import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import PesanFlash from '@/Components/PesanFlash';

const MENU = [
    { label: 'Beranda', href: '/', aktif: (jalur) => jalur === '/' },
    { label: 'Produk', href: '/produk', aktif: (jalur) => jalur.startsWith('/produk') },
];

const NAMA_PERAN = { admin: 'Admin', pemilik: 'Pemilik' };

export default function AppLayout({ children, lebar = 'max-w-6xl' }) {
    const { props, url } = usePage();
    const auth = props.auth;
    const [menuTerbuka, setMenuTerbuka] = useState(false);

    const jalur = (url ?? '/').split('?')[0];
    const user = auth?.user;

    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#isi"
                className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
            >
                Lewati ke konten
            </a>

            <header className="bg-daun-900 text-white">
                <div className={`mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 ${lebar}`}>
                    <Link href="/" className="flex items-center gap-2.5">
                        <span className="grid size-9 place-items-center rounded-xl bg-daun-700 text-xl" aria-hidden="true">🥬</span>
                        <span className="font-display text-lg font-bold">Toko Sayur</span>
                    </Link>

                    <nav aria-label="Menu utama" className="hidden items-center gap-1 md:flex">
                        {MENU.map((m) => (
                            <Link
                                key={m.href}
                                href={m.href}
                                aria-current={m.aktif(jalur) ? 'page' : undefined}
                                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                                    m.aktif(jalur) ? 'bg-white/15 text-white' : 'text-daun-100 hover:bg-white/10'
                                }`}
                            >
                                {m.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        {auth?.can?.buatProduk && (
                            <Link href="/produk/create" className="btn btn-sm bg-kunyit-400 text-daun-900 hover:bg-kunyit-500">
                                + Tambah produk
                            </Link>
                        )}
                        {user && (
                            <div className="flex items-center gap-3 border-l border-white/20 pl-3">
                                <div className="text-right leading-tight">
                                    <p className="text-sm font-semibold">{user.name}</p>
                                    <p className="text-xs text-daun-200">{NAMA_PERAN[user.role] ?? user.role}</p>
                                </div>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="rounded-lg px-2.5 py-1.5 text-sm font-semibold text-daun-100 hover:bg-white/10"
                                >
                                    Keluar
                                </Link>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="rounded-lg p-2 hover:bg-white/10 md:hidden"
                        aria-label="Buka menu"
                        aria-expanded={menuTerbuka}
                        onClick={() => setMenuTerbuka((b) => !b)}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            {menuTerbuka ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                        </svg>
                    </button>
                </div>

                {menuTerbuka && (
                    <div className="border-t border-white/10 px-4 pb-4 pt-2 md:hidden">
                        <nav aria-label="Menu utama" className="flex flex-col gap-1">
                            {MENU.map((m) => (
                                <Link
                                    key={m.href}
                                    href={m.href}
                                    onClick={() => setMenuTerbuka(false)}
                                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${m.aktif(jalur) ? 'bg-white/15' : 'text-daun-100'}`}
                                >
                                    {m.label}
                                </Link>
                            ))}
                            {auth?.can?.buatProduk && (
                                <Link href="/produk/create" onClick={() => setMenuTerbuka(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-kunyit-400">
                                    + Tambah produk
                                </Link>
                            )}
                        </nav>
                        {user && (
                            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                                <p className="text-sm">
                                    <span className="font-semibold">{user.name}</span>{' '}
                                    <span className="text-daun-200">({NAMA_PERAN[user.role] ?? user.role})</span>
                                </p>
                                <Link href="/logout" method="post" as="button" className="text-sm font-semibold text-daun-100">
                                    Keluar
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            <main id="isi" className={`mx-auto w-full flex-1 px-4 py-8 sm:px-6 ${lebar}`}>
                <PesanFlash />
                {children}
            </main>

            <footer className="border-t border-daun-100 py-5 text-center text-xs text-daun-700">
                Toko Sayur: katalog harga dan stok harian
            </footer>
        </div>
    );
}