const imageUrlToBase64Image = async (imageUrl: string): Promise<string> => {
  const response = await fetch(imageUrl);

  const blob = await response.arrayBuffer();

  const contentType = response.headers.get("content-type");

  const base64Image = `data:${contentType};base64,${Buffer.from(blob).toString("base64")}`;

  return base64Image;
};

export { imageUrlToBase64Image };
