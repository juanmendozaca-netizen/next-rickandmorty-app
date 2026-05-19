import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
      <h1 className="text-6xl font-bold text-green-400 mb-4">
        404
      </h1>

      <p className="text-2xl mb-6">
        Personaje no encontrado
      </p>

      <Link
        href="/rickandmorty"
        className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}