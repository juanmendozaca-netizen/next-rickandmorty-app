"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Character } from "../../../types/rickandmorty";
import { IoSearch } from "react-icons/io5";

export default function SearchPage() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // CSR: se ejecuta en el navegador cada vez que cambian los filtros
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (name) params.append("name", name);
        if (status) params.append("status", status);
        if (type) params.append("type", type);
        if (gender) params.append("gender", gender);

        const res = await fetch(
          `https://rickandmortyapi.com/api/character/?${params.toString()}`
        );
        if (!res.ok) {
          setResults([]);
          setError("No se encontraron personajes.");
          return;
        }
        const data = await res.json();
        setResults(data.results);
      } catch {
        setError("Error en la búsqueda.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [name, status, type, gender]); // se ejecuta al cambiar cualquier filtro

  const statusColor: Record<string, string> = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-400",
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
          <IoSearch size={36} /> Buscar Personajes
        </h1>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <input
            type="text"
            placeholder="Nombre..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-green-400"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-green-400"
          >
            <option value="">Estado</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
          <input
            type="text"
            placeholder="Tipo..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-green-400"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-green-400"
          >
            <option value="">Género</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        {/* Resultados */}
        {loading && <p className="text-green-400 text-xl">Buscando...</p>}
        {error && <p className="text-red-400 text-xl">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="transform transition hover:scale-105"
            >
              <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden">
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
                  <p className="text-gray-400 text-sm">{character.species}</p>
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