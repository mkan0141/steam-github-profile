import { defaultTheme } from "./default";
import { compactTheme } from "./compact";
import { imageOnlyTheme } from "./image-only";

import { imageUrlToBase64Image } from "@/utils/image";

import type { SteamGameSummary } from "@/lib/steam";

const DOMAIN = process.env.VERCEL_DOMAIN;
const NOT_FOUND_IMAGE_URL = `${DOMAIN}/assets/offline.png`;

const THEME_LIST = ["default", "compact", "imageOnly"] as const;
type Theme = (typeof THEME_LIST)[number];

const selectImageUrlByTheme = (theme: Theme, gameSummary: SteamGameSummary | undefined): string => {
  if (!gameSummary) return NOT_FOUND_IMAGE_URL;

  switch (theme) {
    case "default":
    case "imageOnly":
      return gameSummary.header_image;
    case "compact":
      return gameSummary.capsule_image;
  }
};

const generateSvg = async (
  theme: Theme,
  gameUrl: string,
  gameSummary?: SteamGameSummary
): Promise<string> => {
  const hasPlayingGame = !!gameSummary;
  const gameTitle = gameSummary?.name || "Not Playing";
  const imageUrl = selectImageUrlByTheme(theme, gameSummary);

  const gameImageBase64 = await imageUrlToBase64Image(imageUrl);

  switch (theme) {
    case "default":
      return defaultTheme({ gameUrl, gameTitle, gameImageBase64, hasPlayingGame });
    case "compact":
      return compactTheme({ gameUrl, gameImageBase64 });
    case "imageOnly":
      return imageOnlyTheme({ gameUrl, gameImageBase64 });
    default:
      return "";
  }
};

export { generateSvg, THEME_LIST };
export type { Theme };
