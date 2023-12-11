import { defaultTheme } from "./default";
import { imageOnlyTheme } from "./image-only";

import { imageUrlToBase64Image } from "@/utils/image";

const DOMAIN = process.env.VERCEL_DOMAIN;
const NOT_FOUND_IMAGE_URL = `${DOMAIN}/assets/offline.png`;

const THEME_LIST = ["default", "imageOnly"] as const;
type Theme = (typeof THEME_LIST)[number];

const generateSvg = async (
  theme: Theme,
  gameUrl: string,
  _gameTitle?: string | undefined,
  _imageUrl?: string | undefined
): Promise<string> => {
  const hasPlayingGame = !!_gameTitle;
  const gameTitle = _gameTitle || "Not Playing";
  const imageUrl = _imageUrl || NOT_FOUND_IMAGE_URL;

  const gameImageBase64 = await imageUrlToBase64Image(imageUrl);

  switch (theme) {
    case "default":
      return await defaultTheme({ gameUrl, gameTitle, gameImageBase64, hasPlayingGame });
    case "imageOnly":
      return await imageOnlyTheme({ gameUrl, gameImageBase64 });
    default:
      return "";
  }
};

export { generateSvg, THEME_LIST };
export type { Theme };
