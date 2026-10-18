const EMOJI = [
    ['kangkung', '🥬'], ['bayam', '🥬'], ['sawi', '🥬'], ['selada', '🥬'], ['kol', '🥬'],
    ['wortel', '🥕'], ['tomat', '🍅'], ['cabai', '🌶️'], ['cabe', '🌶️'], ['bawang', '🧄'],
    ['kentang', '🥔'], ['brokoli', '🥦'], ['terong', '🍆'], ['jagung', '🌽'],
    ['timun', '🥒'], ['mentimun', '🥒'], ['singkong', '🍠'], ['ubi', '🍠'],
    ['jamur', '🍄'], ['paprika', '🫑'],
];

export function emojiSayur(nama = '') {
    const kecil = nama.toLowerCase();
    return EMOJI.find(([kata]) => kecil.includes(kata))?.[1] ?? '🥗';
}

const UKURAN = {
    sm: 'size-12 text-2xl rounded-xl',
    md: 'size-16 text-3xl rounded-2xl',
    lg: 'size-28 text-6xl rounded-3xl',
};

export default function GambarSayur({ nama, ukuran = 'md' }) {
    return (
        <div
            className={`grid shrink-0 place-items-center bg-daun-50 ring-1 ring-daun-100 ${UKURAN[ukuran]}`}
            aria-hidden="true"
        >
            {emojiSayur(nama)}
        </div>
    );
}