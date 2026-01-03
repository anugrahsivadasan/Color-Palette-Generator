export const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");

export const getPixelColor = (img, x, y) => {
  if (!img || !img.naturalWidth || !img.naturalHeight) return "#000000";

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  // Ensure x and y are valid integers inside image boundaries
  const safeX = Math.min(Math.max(0, Math.floor(x)), img.naturalWidth - 1);
  const safeY = Math.min(Math.max(0, Math.floor(y)), img.naturalHeight - 1);

  try {
    const pixel = ctx.getImageData(safeX, safeY, 1, 1).data;
    return rgbToHex(pixel[0], pixel[1], pixel[2]);
  } catch (err) {
    console.warn("getPixelColor failed:", err, { x, y, safeX, safeY });
    return "#000000"; // fallback
  }
};
