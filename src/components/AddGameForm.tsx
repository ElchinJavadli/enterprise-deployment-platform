"use client";

import { useState } from "react";
import { createGame } from "@/app/actions/game";

export default function AddGameForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await createGame(formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-5 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Add New Game</h3>

      {error && (
        <div className="bg-red-900/40 border border-red-600 text-red-300 text-sm px-3 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-900/40 border border-green-600 text-green-300 text-sm px-3 py-2 rounded mb-4">
          Game added successfully!
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Title</label>
          <input
            name="title"
            type="text"
            required
            className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
            placeholder="Game title"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Genre</label>
          <select
            name="genre"
            required
            className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="">Select genre</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>RPG</option>
            <option>Strategy</option>
            <option>Sports</option>
            <option>Puzzle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <textarea
            name="description"
            required
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none"
            placeholder="Write a short description..."
          />
        </div>


        <div>
          <label className="block text-sm mb-2">
            Image URL
          </label>

          <input
            name="imageUrl"
            type="url"
            required
            placeholder="https://example.com/game.jpg"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded text-sm font-medium transition-colors"
        >
          {loading ? "Creating..." : "Create Game"}
        </button>
      </div>
    </form>
  );
}

