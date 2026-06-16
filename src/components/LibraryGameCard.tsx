"use client";

import { useState } from "react";
import { removeGameFromLibrary } from "@/app/actions/game";

interface Props {
  userGameId: number;
  gameId: number;
  title: string;
  genre: string;
  imageUrl: string;
  hoursPlayed: number;
  score: number;
}

export default function LibraryGameCard({
  gameId,
  title,
  genre,
  imageUrl,
  hoursPlayed,
  score,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState("");

  const handleRemove = async () => {
    if (!confirm(`Remove "${title}" from your library?`)) return;

    setLoading(true);
    const result = await removeGameFromLibrary(gameId);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } 
    else {
      setRemoved(true);
    }
  };

  if (removed) return null;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <img
        src={imageUrl || `https://picsum.photos/seed/${gameId}/400/200`}
        alt={title}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="text-xs bg-blue-700 text-blue-200 px-2 py-0.5 rounded">
            {genre}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-gray-400">{hoursPlayed}h played</span>
          <span className="text-blue-300 font-medium">
            {score.toLocaleString()} pts
          </span>
        </div>
        {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
        <button
          onClick={handleRemove}
          disabled={loading}
          className="w-full bg-gray-700 hover:bg-red-900 hover:text-red-300 disabled:opacity-50 text-gray-400 text-sm py-2 rounded transition-colors"
        >
          {loading ? "Removing..." : "Remove from Library"}
        </button>
      </div>
    </div>
  );
}