import { defaultTheme } from "./default";
import { imageOnlyTheme } from "./image-only";

import { imageUrlToBase64Image } from "@/utils/image";

type Theme = "default" | "imageOnly";

const DOMAIN = process.env.VERCEL_DOMAIN;
const NOT_FOUND_IMAGE_URL = `${DOMAIN}/assets/offline.png`;

const generateSvg = async (
  theme: Theme,
  _gameTitle?: string | undefined,
  _imageUrl?: string | undefined
): Promise<string> => {
  const hasPlayingGame = !!_gameTitle;
  const gameTitle = _gameTitle || "Not Playing";
  const imageUrl = _imageUrl || NOT_FOUND_IMAGE_URL;

  const gameImageBase64 = await imageUrlToBase64Image(imageUrl);

  switch (theme) {
    case "default":
      return await defaultTheme({ gameTitle, gameImageBase64, hasPlayingGame });
    case "imageOnly":
      return await imageOnlyTheme({ gameImageBase64 });
    default:
      return "";
  }
};

export { generateSvg };
