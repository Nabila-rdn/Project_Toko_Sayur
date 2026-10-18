export default function Field({ id, label, hint, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-daun-900">
                {label}
            </label>
            {children}
            {hint && !error && <p className="mt-1.5 text-xs text-daun-700">{hint}</p>}
            {error && (
                <p id={`${id}-galat`} className="mt-1.5 text-xs font-medium text-cabai-600">
                    {error}
                </p>
            )}
        </div>
    );
}