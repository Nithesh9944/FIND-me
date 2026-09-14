import { supabase } from "@/lib/supabase/client";
import type { GameDetails, GameWithVersions } from "@/types/game";

export async function getPublishedGames(): Promise<GameWithVersions[]> {
  const { data, error } = await supabase
    .from("games")
    .select("*, game_versions(*)")
    .eq("published", true)
    .eq("game_versions.published", true)
    .order("created_at", { ascending: false });

  console.log("Published games response:", { data, error });

  if (error) {
    console.error("Could not load published games:", error.message);
    return [];
  }

  return (data ?? []).map((game) => ({
    ...game,
    game_versions: [...(game.game_versions ?? [])].sort(
      (first, second) =>
        new Date(second.created_at).getTime() - new Date(first.created_at).getTime()
    )
  })) as GameWithVersions[];
}

export async function getGameBySlug(slug: string): Promise<GameDetails | null> {
  const { data, error } = await supabase
    .from("games")
    .select("*, game_versions(*), game_screenshots(*)")
    .eq("slug", slug)
    .eq("published", true)
    .eq("game_versions.published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    game_versions: [...(data.game_versions ?? [])].sort(
      (first, second) =>
        new Date(second.created_at).getTime() - new Date(first.created_at).getTime()
    ),
    game_screenshots: [...(data.game_screenshots ?? [])].sort(
      (first, second) => first.sort_order - second.sort_order
    )
  } as GameDetails;
}

export async function incrementDownloadCount(versionId: string): Promise<void> {
  const { data: version, error: readError } = await supabase
    .from("game_versions")
    .select("download_count")
    .eq("id", versionId)
    .single();

  if (readError || !version) {
    console.error("Could not read download count:", readError?.message);
    return;
  }

  const { error } = await supabase
    .from("game_versions")
    .update({ download_count: (version.download_count ?? 0) + 1 })
    .eq("id", versionId);

  if (error) {
    console.error("Could not increment download count:", error.message);
  }
}
