export type Game = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  logo_path: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type GameVersion = {
  id: string;
  game_id: string;
  version: string;
  apk_path: string;
  apk_size: number | null;
  changelog: string | null;
  published: boolean;
  download_count: number;
  created_at: string;
};

export type GameScreenshot = {
  id: string;
  game_id: string;
  image_path: string;
  sort_order: number;
  created_at: string;
};

export type GameWithVersions = Game & {
  game_versions: GameVersion[];
};

export type GameDetails = Game & {
  game_versions: GameVersion[];
  game_screenshots: GameScreenshot[];
};
