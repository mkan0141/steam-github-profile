import { NextRequest } from "next/server";
import { ZodError, z } from "zod";

import { THEME_LIST, Theme, generateSvg } from "@/themes";
import { fetchPlayerSummary, fetchGameDetail } from "@/lib/steam";

const RESPONSE_HEADER = {
  "Content-Type": "image/svg+xml",
  "Cache-Control": "max-age=60",
  "CDN-Cache-Control": "max-age=300",
  "Vercel-CDN-Cache-Control": "max-age=300",
} as const;

const QueryParamsValidator = z.object({
  steam_id: z
    .string({ invalid_type_error: "'steam_id' is a required query parameter." })
    .min(1, { message: "Invalid Steam ID. Please check your steam id." }),
  theme: z.enum(THEME_LIST).default("default"),
});

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;

  try {
    const { steam_id, theme } = QueryParamsValidator.parse(Object.fromEntries(queryParams));

    const svg = await generateSteamCardSvg(steam_id, theme);

    return new Response(svg, { headers: RESPONSE_HEADER });
  } catch (err) {
    const errorMessage =
      err instanceof ZodError ? `Bad Request. ${err.errors[0].message}` : "Bad Request.";

    return new Response(errorMessage, { status: 400 });
  }
}

const generateSteamCardSvg = async (steamId: string, theme: Theme): Promise<string> => {
  const { gameid: gameId } = await fetchPlayerSummary(steamId);

  const gameUrl = `https://store.steampowered.com/${gameId ? `app/${gameId}` : ""}`;
  // not playing game
  if (!gameId) {
    return generateSvg(theme, gameUrl);
  }

  const gameDetail = await fetchGameDetail(gameId);

  return generateSvg(theme, gameUrl, gameDetail.name, gameDetail.header_image);
};
