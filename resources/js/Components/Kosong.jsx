export default function Kosong({ pesan, aksi }) {
    return (
        <div className="p-8 text-center bg-white rounded border my-4">
            <p className="text-gray-500 mb-2">{pesan}</p>
            {aksi}
        </div>
    );
}