"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-white p-10">
      <h2 className="text-3xl font-bold">Ocurrió un error</h2>

      <button
        onClick={() => reset()}
        className="mt-4 bg-green-500 text-black px-4 py-2 rounded"
      >
        Reintentar
      </button>
    </div>
  );
}