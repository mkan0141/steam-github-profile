## steam-github-profile

A tool to generate steam now playing card on your github plofile. Inspired by [spotify-github-profile](https://github.com/kittinan/spotify-github-profile).

## Theme

| default                                           | imageOnly                                         |
| :---: | :---: |
| <img src="https://raw.githubusercontent.com/mkan0141/steam-github-profile/main/images/defaultTheme.png" width="45%"> | <img src="https://raw.githubusercontent.com/mkan0141/steam-github-profile/main/images/imageOnlyTheme.png" width="45%"> |
| [One Shot](https://store.steampowered.com/app/420530) |[アンリアルライフ](https://store.steampowered.com/app/1335560) |

## usage

```md
![steam-github-profile](https://steam-github-profile.vercel.app/api/status?steam_id=76561198449631702&theme=default)
```

## development

- create `.env.local` file at project root and set `VERCEL_URL`, `STEAM_API_KEY`.
  - `VERCEL_URL`
    - If you are developing in a local environment, please set `http://localhost:3000`
  - `STEAM_API_KEY`
    - [Get your API key by following the steam documentation here](https://steamcommunity.com/dev?l=japanese)

```:.local.env
VERCEL_DOMAIN=http://localhost:3000
STEAM_API_KEY=xxxxx-set-your-api-key-xxxxx
```

- Run dev server

```:shell
$ pnpm install
$ pnpm dev
```
