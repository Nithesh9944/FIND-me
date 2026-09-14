"use client";

import { useEffect, useMemo, useState } from "react";
import GameCard from "@/components/GameCard";
import SearchBar from "@/components/SearchBar";
import { getPublishedGames } from "@/lib/supabase/queries";
import type { GameWithVersions } from "@/types/game";

export default function HomePage() {
  const [games, setGames] = useState<GameWithVersions[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedGames().then((publishedGames) => {
      setGames(publishedGames);
      setLoading(false);
    });
  }, []);

  const filteredGames = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) return games;

    return games.filter((game) =>
      `${game.title} ${game.description ?? ""}`.toLowerCase().includes(searchTerm)
    );
  }, [games, search]);

  return (
    <main className="min-h-[calc(100vh-76px)]">
      <section className="mx-auto max-w-6xl px-5 pb-12 pt-16 lg:px-8 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-coral">Android games</p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl">
            Small worlds,
            <br />
            ready to play.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">
            Browse the latest games from My Game Store and find your next pocket-sized adventure.
          </p>
        </div>
        <div className="mt-12 flex justify-start">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
        {loading ? (
          <p className="py-16 text-center text-ink/60">Loading games...</p>
        ) : games.length === 0 ? (
          <p className="py-16 text-center text-ink/60">No games have been published yet.</p>
        ) : filteredGames.length === 0 ? (
          <p className="py-16 text-center text-ink/60">No games found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
