const imageOnlyTheme = ({
  gameUrl,
  gameImageBase64,
}: {
  gameUrl: string;
  gameImageBase64: string;
}): string => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="280px" height="130" viewBox="0 0 280 130">
      <title>Now Playing Steam Game</title>
      <foreignObject width="280px" height="130">
          <div xmlns="http://www.w3.org/1999/xhtml" class="container">
            <a href="${gameUrl}" target="_blank">
              <img src="${gameImageBase64}" class="game-logo"></img>
            </a>
          </div>
      </foreignObject>
      <style>
        .game-logo {
          width: 280px;
        }
      </style>
    </svg>
    `;
};

export { imageOnlyTheme };
