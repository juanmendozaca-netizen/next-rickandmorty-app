import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Character, RickAndMortyListResponse } from "../../../types/rickandmorty";

interface Props {
  params: Promise<{ id: string }>;
}

// ISR: revalida cada 10 días
async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }, // 10 días en segundos
  });
  if (!res.ok) notFound();
  return res.json();
}

// SSG: genera rutas estáticas para todos los personajes
export async function generateStaticParams() {
  const allIds: { id: string }[] = [];


  // La API tiene 42 páginas actualmente
  for (let page = 1; page <= 42; page++) {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

    if (!res.ok) continue;

    const data: RickAndMortyListResponse = await res.json();

    data.results.forEach((character) => {
      allIds.push({
        id: String(character.id),
      });
    });
  }


  return allIds;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = await getCharacter(id);
  return {
    title: `${character.name} - Rick & Morty`,
    description: `Información sobre ${character.name}`,
  };
}

const statusColor: Record<string, string> = {
  Alive: "text-green-400",
  Dead: "text-red-400",
  unknown: "text-gray-400",
};

export default async function CharacterDetail({ params }: Props) {
  const { id } = await params;
  const character = await getCharacter(id);
  

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden text-white">

        {/* Header */}
        <div className="bg-gradient-to-r from-black to-green-900 p-8 flex flex-col md:flex-row gap-8 items-center">
          <Image
            width={200}
            height={200}
            src={character.image}
            alt={character.name}
            className="rounded-2xl border-4 border-green-400 shadow-xl"
          />
          <div>
            <h1 className="text-5xl font-bold mb-2">{character.name}</h1>
            <p className={`text-2xl font-semibold ${statusColor[character.status]}`}>
              ● {character.status}
            </p>
            <p className="text-gray-300 mt-1">{character.species} — {character.gender}</p>
          </div>
        </div>

        {/* Detalle completo */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-green-400 mb-4">Información</h2>
            <p><span className="text-gray-400">ID:</span> {character.id}</p>
            <p><span className="text-gray-400">Tipo:</span> {character.type || "N/A"}</p>
            <p><span className="text-gray-400">Origen:</span> {character.origin.name}</p>
            <p><span className="text-gray-400">Última ubicación:</span> {character.location.name}</p>
            <p><span className="text-gray-400">Creado:</span> {new Date(character.created).toLocaleDateString("es-PE")}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-green-400 mb-4">
              Episodios ({character.episode.length})
            </h2>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {character.episode.map((ep, index) => (
                <span
                  key={ep}
                  className="bg-green-800 text-green-200 text-xs px-2 py-1 rounded-full"
                >
                  EP {index + 1}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Botón volver */}
        <div className="p-8 bg-black bg-opacity-30">
          <Link
            href="/rickandmorty"
            className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-lg transition"
          >
            ← Volver a personajes
          </Link>
        </div>
      </div>
    </div>
  );
}