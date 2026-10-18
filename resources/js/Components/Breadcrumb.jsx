import { Link } from '@inertiajs/react';

// item terakhir = halaman sekarang (tanpa href)
export default function Breadcrumb({ items = [] }) {
    return (
        <nav aria-label="Posisi halaman" className="mb-3 text-sm text-daun-700">
            <ol className="flex flex-wrap items-center gap-1.5">
                {items.map((item, i) => {
                    const terakhir = i === items.length - 1;
                    return (
                        <li key={item.label} className="flex items-center gap-1.5">
                            {i > 0 && <span aria-hidden="true" className="text-daun-200">/</span>}
                            {terakhir || !item.href ? (
                                <span aria-current={terakhir ? 'page' : undefined} className="font-semibold text-daun-900">
                                    {item.label}
                                </span>
                            ) : (
                                <Link href={item.href} className="hover:text-daun-900 hover:underline">
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}