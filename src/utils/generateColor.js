export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate a new shade based on previous color
export const generateShade = (color) => {
  // simple tint/darken: adjust each RGB channel randomly by ±15%
  const hex = color.replace("#", "");
  const r = Math.min(255, Math.max(0, parseInt(hex.substr(0, 2), 16) + Math.floor(Math.random() * 40 - 20)));
  const g = Math.min(255, Math.max(0, parseInt(hex.substr(2, 2), 16) + Math.floor(Math.random() * 40 - 20)));
  const b = Math.min(255, Math.max(0, parseInt(hex.substr(4, 2), 16) + Math.floor(Math.random() * 40 - 20)));
  return `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
};
