"use client";

import { addGameToLibrary } from "@/app/actions/game";
import { useState } from "react";

interface Game {
  id: number;
  title: string;
  genre: string;
  description: string;
  imageUrl: string;
  _count?: { users: number };
}

interface Props {
  game: Game;
  inLibrary?: boolean;
}

export default function GameCard({ game, inLibrary = false }: Props) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(inLibrary);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    setLoading(true);
    const result = await addGameToLibrary(game.id);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } 
    else {
      setAdded(true);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500">
      <img
        src={game.imageUrl}
        alt={game.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white">{game.title}</h3>
          <span className="text-xs bg-blue-700 text-blue-200 px-2 py-0.5 rounded">
            {game.genre}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{game.description}</p>
        {game._count && (
          <p className="text-gray-500 text-xs mb-3">
            {game._count.users} players
          </p>
        )}
        {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
        {added ? (
          <span className="text-green-400 text-sm">In your library</span>
        ) : (
          <button
            onClick={handleAdd}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm py-2 rounded transition-colors"
          >
            {loading ? "Adding..." : "Add to Library"}
          </button>
        )}
      </div>
    </div>
  );
}