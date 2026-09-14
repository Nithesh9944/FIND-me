import { notFound } from "next/navigation";
import DownloadButton from "@/components/DownloadButton";
import { getGameBySlug } from "@/lib/supabase/queries";

function formatBytes(bytes: number | null) {
  if (!bytes) return "Unknown size";
  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** unitIndex).toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function formatVersion(version: string) {
  return version.startsWith("v") ? version : `v${version}`;
}

export default async function GameDetailsPage({ params }: { params: { slug: string } }) {
  const game = await getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

  const latestVersion = game.game_versions[0];

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="flex aspect-square max-h-[520px] items-center justify-center rounded-3xl bg-mint/50 p-12">
          {game.logo_path ? (
            <img src={game.logo_path} alt={`${game.title} logo`} className="h-full w-full object-contain" />
          ) : (
            <span className="font-display text-8xl font-bold text-ink/30">{game.title.slice(0, 1)}</span>
          )}
        </div>

        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-coral">Game details</p>
          <h1 className="font-display text-5xl font-bold tracking-tight text-ink sm:text-7xl">{game.title}</h1>
          <p className="mt-6 whitespace-pre-line text-lg leading-8 text-ink/70">
            {game.description || "No description available yet."}
          </p>

          {latestVersion ? (
            <div className="mt-10 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink/60">
                <span><strong className="text-ink">Version</strong> {formatVersion(latestVersion.version)}</span>
                <span><strong className="text-ink">File size</strong> {formatBytes(latestVersion.apk_size)}</span>
                <span><strong className="text-ink">Downloads</strong> {latestVersion.download_count}</span>
              </div>
              <DownloadButton versionId={latestVersion.id} apkPath={latestVersion.apk_path} />
              {latestVersion.changelog && (
                <div className="mt-6 border-t border-ink/10 pt-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-ink/60">Changelog</h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink/70">{latestVersion.changelog}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-10 rounded-2xl bg-white p-6 text-ink/60 shadow-sm">No published version is available yet.</p>
          )}
        </div>
      </div>

      {game.game_screenshots.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl font-bold text-ink">Screenshots</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {game.game_screenshots.map((screenshot) => (
              <img
                key={screenshot.id}
                src={screenshot.image_path}
                alt={`${game.title} screenshot`}
                className="aspect-video w-full rounded-2xl border border-ink/10 bg-white object-cover shadow-sm"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
