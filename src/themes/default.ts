const defaultTheme = (_gameTitle?: string, _imageUrl?: string) => {
  const hasPlayingGame = !!_gameTitle;
  const gameTitle = _gameTitle || "No Play Game";
  const imageUrl = _imageUrl || "/offline.png";

  const gameTitleTemplate =
    gameTitle.length <= 16
      ? gameTitle
      : `<span class="marquee">${gameTitle}</span><span class="marquee">${gameTitle}</span>`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="246" viewBox="0 0 320 246">
      <title>Now Playing Steam Game</title>
      <foreignObject width="320" height="246">
        <div xmlns="http://www.w3.org/1999/xhtml" class="container">
          <div class="game-detail">
            <div class="status">Now Playing On <img class="steam-logo" src="/steam-logo.svg"></img></div>
            <div class="title ${!hasPlayingGame && "no-game"}">${gameTitleTemplate}</div>
          </div>
          <img src="${imageUrl}" class="game-logo"></img>
        </div>
        <style>
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: #181818;
            padding: 16px;
            border-radius: 8px;
          }

          .status {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #fff;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
          }

          .steam-logo {
            height: 28px;
            margin-left: 8px;
          }

          .title {
            position: relative;
            margin-top: 8px;
            color: white;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            white-space: nowrap;
          }

          .game-logo {
            width: 288px;
            margin-top: 12px;
          }

          .no-game {
            color: #999999;
          }

          .marquee {
            position: relative;
            display: inline-block;
            padding-right: 160px;
            animation: marquee 15s 2s linear infinite;
          }

          @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
          }
        </style>
      </foreignObject>
    </svg>
  `;
};

export { defaultTheme };
