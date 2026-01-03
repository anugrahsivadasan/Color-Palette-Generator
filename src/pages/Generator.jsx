import { useState } from "react";
import { motion   } from "framer-motion";
import Navbar from "../components/Navbar";
import ColorBlock from "../components/ColorCard";
import { generateRandomColor } from "../utils/generateColor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tinycolor from "tinycolor2";
import { FiPlus } from "react-icons/fi";

const initialPalette = Array.from({ length: 5 }, generateRandomColor);

const Generator = () => {
  const [palette, setPalette] = useState(initialPalette);
  const [hoverIndex, setHoverIndex] = useState(null);

  /**
   * ✅ ADD MIXED COLOR (50–50 LEFT & RIGHT)
   */
  const addShade = (index) => {
    const left = tinycolor(palette[index]);

    // If right color exists → mix
    const right = palette[index + 1]
      ? tinycolor(palette[index + 1])
      : left.clone().lighten(12);

    const mixed = tinycolor.mix(left, right, 50).toHexString();

    const updated = [...palette];
    updated.splice(index + 1, 0, mixed);
    setPalette(updated);
  };

  /**
   * ✅ GENERATE FULL PALETTE (SMOOTH TRANSITION)
   */
  const generateAllColors = () => {
    const newPalette = [generateRandomColor()];

    for (let i = 1; i < palette.length; i++) {
      const left = tinycolor(newPalette[i - 1]);
      const right = palette[i + 1]
        ? tinycolor(palette[i + 1])
        : left.clone().lighten(12);

      newPalette.push(tinycolor.mix(left, right, 50).toHexString());
    }

    setPalette(newPalette);
  };

  const changeColor = (index) => {
    const input = document.createElement("input");
    input.type = "color";
    input.value = palette[index];

    input.oninput = (e) => {
      const updated = [...palette];
      updated[index] = e.target.value;
      setPalette(updated);
    };

    input.click();
  };

  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
    toast.success(`${color} copied`, {
  style: {
    background: "#111827",
    color: "#fff",
    borderRadius: "12px",
  },
});
  };

  const deleteColor = (index) => {
    setPalette(palette.filter((_, i) => i !== index));
    toast.info("Color removed", {
  style: {
    background: "#111827",
    color: "#fff",
    borderRadius: "12px",
  },
});
  };

  return (
    <div className="h-screen flex flex-col ">
      <Navbar />

      {/* FULL SCREEN PALETTE */}
      <div className="flex flex-1 relative ">
        {palette.map((color, idx) => (
          <div
            key={idx}
            className="relative flex flex-1"
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <ColorBlock
              color={color}
              onChangeColor={() => changeColor(idx)}
              onCopy={() => copyColor(color)}
              onDelete={() => deleteColor(idx)}
            />

            {/* ➕ PLUS BUTTON */}
            {hoverIndex === idx && idx < palette.length - 1 && (
              <button
                onClick={() => addShade(idx)}
                className="
                  absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2
                  bg-white text-black rounded-full p-3 shadow-xl
                  hover:scale-110 transition z-10
                "
              >
                <FiPlus />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* GENERATE BUTTON */}
      <div className="py-4 flex justify-center bg-white dark:bg-[#0b0b0f] dark:text-white">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateAllColors}
          className="px-8 py-3 bg-black text-white rounded-xl font-semibold shadow-lg dark:bg-gray-700 dark:text-white"
        >
          Another Theme
        </motion.button>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Generator;
