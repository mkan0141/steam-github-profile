import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

import { THEME_LIST, generateSvg } from "@/themes";
import { fetchPlayerSummary, fetchGameDetail } from "@/lib/steam";

const themeValidator = (params: any) => {
  return z.enum(THEME_LIST).parse(params);
};

const steamIdValidator = (params: any) => {
  return z
    .string({ invalid_type_error: "'steam_id' is a required query parameter." })
    .min(1, { message: "Invalid Steam ID. Please check your steam id." })
    .parse(params);
};

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;

  // validate query parameters
  let theme, steamId;
  try {
    theme = themeValidator(searchParams.get("theme") || "default");
    steamId = steamIdValidator(searchParams.get("steam_id"));
  } catch (err) {
    const errorMessage =
      err instanceof ZodError ? `Bad Request. ${err.errors[0].message}` : "Bad Request.";

    return new Response(errorMessage, { status: 400 });
  }

  const { gameid: gameId } = await fetchPlayerSummary(steamId);
  const gameUrl = `https://store.steampowered.com/${gameId ? `app/${gameId}` : ""}`;

  // not playing game
  if (!gameId) {
    const svg = await generateSvg(theme, gameUrl);

    return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
  }

  const gameDetail = await fetchGameDetail(gameId);

  const svg = await generateSvg(theme, gameUrl, gameDetail.name, gameDetail.header_image);

  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
}
