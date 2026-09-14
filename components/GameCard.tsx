import Link from "next/link";
import type { GameWithVersions } from "@/types/game";

function formatVersion(version: string) {
  return version.startsWith("v") ? version : `v${version}`;
}

export default function GameCard({ game }: { game: GameWithVersions }) {
  const latestVersion = game.game_versions[0];

  return (
    <article className="group overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex aspect-[4/3] items-center justify-center bg-mint/40 p-8">
        {game.logo_path ? (
          <img
            src={game.logo_path}
            alt={`${game.title} logo`}
            className="h-full w-full rounded-xl object-contain"
          />
        ) : (
          <span className="font-display text-5xl font-bold text-ink/30">{game.title.slice(0, 1)}</span>
        )}
      </div>
      <div className="p-5">
        <div className="mb-5 flex items-start justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-ink">{game.title}</h2>
          {latestVersion && (
            <span className="shrink-0 rounded-full bg-coral/15 px-2.5 py-1 text-xs font-bold text-coral">
              {formatVersion(latestVersion.version)}
            </span>
          )}
        </div>
        <Link
          href={`/games/${game.slug}`}
          className="block rounded-xl bg-ink px-4 py-3 text-center text-sm font-bold text-paper transition hover:bg-coral"
        >
          View Game
        </Link>
      </div>
    </article>
  );
}
