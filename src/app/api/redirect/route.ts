import { fetchPlayerSummary } from "@/lib/steam";
import { NextRequest } from "next/server";
import { z } from "zod";
import { redirect } from "next/navigation";

const QueryParamsValidator = z.object({
  steam_id: z
    .string({ invalid_type_error: "'steam_id' is a required query parameter." })
    .min(1, { message: "Invalid Steam ID. Please check your steam id." }),
});

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  let gameId = null;

  try {
    const { steam_id: steamId } = QueryParamsValidator.parse(Object.fromEntries(queryParams));
    const { gameid } = await fetchPlayerSummary(steamId);

    gameId = gameid;
  } catch (e) {
    return new Response("Internal Server Error.", { status: 500 });
  }

  const gameUrl = `https://store.steampowered.com/${gameId ? `app/${gameId}` : ""}`;

  redirect(gameUrl);
}
