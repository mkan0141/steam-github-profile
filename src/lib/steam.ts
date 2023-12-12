const STEAM_API_KEY = process.env.STEAM_API_KEY as string;

type SteamPlayerSummary = {
  steamid: string;
  personaname: string;
  personalstate: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  gameid?: string;
  gameextrainfo?: string;
};

type SteamGameSummary = {
  name: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
};

type SteamPlayerSummaryResponse = {
  response: {
    players: SteamPlayerSummary[];
  };
};

type SteamGameSummaryResponse = {
  [key: string]: {
    success: string;
    data: SteamGameSummary;
  };
};

const fetchPlayerSummary = async (steamId: string): Promise<SteamPlayerSummary> => {
  const query = new URLSearchParams({ key: STEAM_API_KEY, steamids: steamId }).toString();
  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?${query}`
  );

  const data: SteamPlayerSummaryResponse = await response.json();

  if (!data) return Promise.reject(new Error(`Error`));
  return data.response.players[0];
};

const fetchGameDetail = async (gameId: string): Promise<SteamGameSummary> => {
  const query = new URLSearchParams({ appids: gameId }).toString();
  const response = await fetch(`https://store.steampowered.com/api/appdetails?${query}`);

  const data: SteamGameSummaryResponse = await response.json();

  if (!data[gameId]) return Promise.reject(new Error(`Error`));
  return data[gameId].data;
};

export type { SteamGameSummary };
export { fetchPlayerSummary, fetchGameDetail };
