import { NextResponse } from "next/server";

import { fetchPlayerSummary, fetchGameDetail } from "@/lib/steam";
import { defaultTheme } from "@/themes/default";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);
  const steamId = searchParams.get("steam_id");

  if (steamId === null) {
    return NextResponse.json({ error: "piyo" }, { status: 500 });
  }

  const playerSummary = await fetchPlayerSummary(steamId);

  // not playing game
  if (!playerSummary.gameid) {
    const svg = await defaultTheme();

    return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
  }

  const gameDetail = await fetchGameDetail(playerSummary.gameid);

  const svg = await defaultTheme(gameDetail.name, gameDetail.header_image);

  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
}
