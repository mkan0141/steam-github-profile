import { NextResponse } from "next/server";

import { generateSvg } from "@/themes";
import { fetchPlayerSummary, fetchGameDetail } from "@/lib/steam";

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url);

  const theme = searchParams.get("theme") || "default";
  const steamId = searchParams.get("steam_id");

  if (steamId === null) {
    return NextResponse.json(
      {
        error:
          "Please include the 'steam_id' in the query parameters. ex) https://xxxx.xxx.xxx/api/status&steam_id=${your steamId}",
      },
      { status: 500 }
    );
  }

  const playerSummary = await fetchPlayerSummary(steamId);

  // not playing game
  if (!playerSummary.gameid) {
    const svg = await generateSvg(theme);

    return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
  }

  const gameDetail = await fetchGameDetail(playerSummary.gameid);

  const svg = await generateSvg(theme, gameDetail.name, gameDetail.header_image);

  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } });
}
