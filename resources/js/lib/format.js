export const rupiah = (angka) => 'Rp ' + Number(angka || 0).toLocaleString('id-ID');

export const tanggal = (nilai) =>
    nilai
        ? new Date(nilai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : '-';