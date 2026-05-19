import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { IoTv, IoSearch } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Rick and Morty - Next.js",
  description: "Explora los personajes de Rick and Morty",
};

export default function RickAndMortyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-green-900">
      <nav className="bg-black bg-opacity-40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-6">
          <Link
            href="/rickandmorty"
            className="text-white text-2xl font-bold hover:text-green-400 transition flex items-center gap-2"
          >
            <IoTv size={28} className="inline-block" /> Rick & Morty
          </Link>
          <Link
            href="/rickandmorty/search"
            className="text-white text-lg hover:text-green-400 transition flex items-center gap-2"
          >
            <IoSearch size={22} /> Buscar
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}