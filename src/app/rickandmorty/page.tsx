import Link from "next/link";
import Image from "next/image";
import { RickAndMortyListResponse } from "../../types/rickandmorty";

async function getCharacters() {
  const res = await fetch(
    "https://rickandmortyapi.com/api/character?page=1"
  );

  if (!res.ok) throw new Error("Error al cargar personajes");

  const data: RickAndMortyListResponse = await res.json();
  return data.results;
}

const statusColor: Record<string, string> = {
  Alive: "bg-green-500",
  Dead: "bg-red-500",
  unknown: "bg-gray-400",
};

export default async function RickAndMortyList() {
  const characters = await getCharacters();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10">
          🛸 Personajes ({characters.length})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="transform transition hover:scale-105"
            >
              <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:shadow-green-500/30 hover:shadow-xl">
                <Image
                  width={300}
                  height={300}
                  src={character.image}
                  alt={character.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{character.name}</h2>
                  <p className="text-gray-400 text-sm capitalize">{character.species}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full text-white ${statusColor[character.status]}`}>
                    {character.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}