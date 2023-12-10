const defaultTheme = ({
  gameTitle,
  gameImageBase64,
  hasPlayingGame,
}: {
  gameTitle: string;
  gameImageBase64: string;
  hasPlayingGame: boolean;
}): string => {
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
            <div class="status">Now Playing On <svg class="steam-logo" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 293.5 88.5"><g><path class="st0" d="M44.1,0C20.8,0,1.8,17.9,0,40.7l23.7,9.8c2-1.4,4.4-2.2,7-2.2c0.2,0,0.5,0,0.7,0L42,33.1c0-0.1,0-0.1,0-0.2	c0-9.2,7.5-16.7,16.7-16.7c9.2,0,16.7,7.5,16.7,16.7s-7.5,16.7-16.7,16.7c-0.1,0-0.3,0-0.4,0l-15,10.7c0,0.2,0,0.4,0,0.6 c0,6.9-5.6,12.5-12.5,12.5c-6.1,0-11.1-4.3-12.3-10.1l-17-7c5.2,18.6,22.3,32.2,42.6,32.2c24.4,0,44.2-19.8,44.2-44.2 C88.3,19.8,68.5,0,44.1,0"/><path class="st0" d="M27.7,67.1l-5.4-2.2c1,2,2.6,3.7,4.8,4.6c4.8,2,10.3-0.3,12.3-5.1c1-2.3,1-4.9,0-7.2c-1-2.3-2.8-4.1-5.1-5.1 c-2.3-1-4.8-0.9-6.9-0.1l5.6,2.3c3.5,1.5,5.2,5.5,3.7,9C35.3,66.9,31.2,68.6,27.7,67.1"/><path class="st0" d="M69.8,32.8c0-6.1-5-11.1-11.1-11.1c-6.1,0-11.1,5-11.1,11.1c0,6.1,5,11.1,11.1,11.1 C64.8,43.9,69.8,39,69.8,32.8 M50.3,32.8c0-4.6,3.7-8.3,8.4-8.3s8.4,3.7,8.4,8.3s-3.7,8.3-8.4,8.3S50.3,37.4,50.3,32.8"/><path class="st0" d="M135.6,30.3l-3,5.2c-2.3-1.6-5.4-2.6-8.1-2.6c-3.1,0-5,1.3-5,3.6c0,2.8,3.4,3.4,8.4,5.2 c5.4,1.9,8.5,4.2,8.5,9.1c0,6.8-5.3,10.6-13,10.6c-3.7,0-8.3-1-11.7-3.1l2.2-5.8c2.8,1.5,6.2,2.4,9.2,2.4c4.1,0,6-1.5,6-3.7 c0-2.5-2.9-3.3-7.7-4.9c-5.4-1.8-9.1-4.2-9.1-9.7c0-6.2,5-9.8,12.1-9.8C129.3,27,133.3,28.6,135.6,30.3"/><polygon class="st0" points="158.7,33.6 158.7,60.9 151.8,60.9 151.8,33.6 141.6,33.6 141.6,27.6 168.8,27.6 168.8,33.6"/><polygon class="st0" points="183.5,33.5 183.5,41.1 196.9,41.1 196.9,47 183.5,47 183.5,54.9 199,54.9 199,60.9 176.6,60.9 176.6,27.6 199,27.6 199,33.5"/><path class="st0" d="M214.6,54.4l-2.2,6.5h-7.3l12.5-33.3h7l12.8,33.3h-7.6l-2.3-6.5L214.6,54.4L214.6,54.4z M221.1,35.5l-4.6,13.3 h9.2L221.1,35.5z"/><polygon class="st0" points="273.3,40.5 264.2,59.9 260.2,59.9 251.3,40.6 251.3,60.9 244.6,60.9 244.6,27.6 251.2,27.6 262.4,51.6 273.2,27.6 280,27.6 280,60.9 273.3,60.9 	"/><path class="st0" d="M293.5,31.8c0,2.9-2.1,4.6-4.6,4.6c-2.5,0-4.6-1.8-4.6-4.6c0-2.9,2.2-4.6,4.6-4.6 C291.3,27.1,293.5,28.9,293.5,31.8 M285,31.8c0,2.4,1.7,3.9,3.8,3.9c2.1,0,3.8-1.5,3.8-3.9c0-2.4-1.7-3.9-3.8-3.9 C286.7,27.9,285,29.4,285,31.8 M288.9,29.4c1.2,0,1.6,0.6,1.6,1.3c0,0.6-0.4,1-0.8,1.3l1.1,2h-0.9l-0.9-1.8H288V34h-0.7v-4.6H288.9 z M288.1,31.5h0.8c0.5,0,0.8-0.3,0.8-0.7c0-0.4-0.2-0.7-0.8-0.7h-0.8L288.1,31.5L288.1,31.5z"/></g></svg></div>
            <div class="title ${!hasPlayingGame && "no-game"}">${gameTitleTemplate}</div>
          </div>
          <img src="${gameImageBase64}" class="game-logo"></img>
        </div>
        <style>
          :root {
            --background-color: #2a475e;
            --text-color: #ffffff;
          }

          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: var(--background-color);
            padding: 16px;
            border-radius: 8px;
          }

          .game-detail {
            color: var(--text-color);
            fill: var(--text-color);
          }

          .status {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;;
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
