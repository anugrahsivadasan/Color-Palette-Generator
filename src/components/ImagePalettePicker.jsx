import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import DropZone from "./DropZone";
import { getPixelColor } from "../utils/getPixelColor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../assets/default.jpg";
import Navbar from "../components/Navbar";


const INITIAL_PICKERS = [
  { x: 120, y: 100, locked: false },
  { x: 260, y: 140, locked: false },
  { x: 360, y: 220, locked: false },
];

const RANDOM_RANGE = 60;
const DEFAULT_IMAGE = defaultImage;

const ImagePalettePicker = () => {
  const imgRef = useRef(null);
  const [image, setImage] = useState(DEFAULT_IMAGE);
  const [pickers, setPickers] = useState(INITIAL_PICKERS);
  const [colors, setColors] = useState([]);
  const [lockedColors, setLockedColors] = useState([]); // locked colors by index
  const [showPreview, setShowPreview] = useState(false);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  const handleImageUpload = (file) => {
    setImage(URL.createObjectURL(file));
  };

  const randomOffset = () =>
    Math.floor(Math.random() * RANDOM_RANGE * 2 - RANDOM_RANGE);

  const adjustPickers = () => {
    setPickers((prev) =>
      prev.map((p, i) => {
        // If picker itself is locked OR the color is locked, do not randomize
        if (p.locked || lockedColors.includes(i)) return p;
        return { ...p, x: p.x + randomOffset(), y: p.y + randomOffset() };
      })
    );
  };

  const calculateColors = () => {
    if (!imgRef.current) return;
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const picked = pickers.map((p) => {
      const x = Math.round(p.x * scaleX);
      const y = Math.round(p.y * scaleY);
      return getPixelColor(img, x, y);
    });

    setColors(picked);
  };

  const onImageLoad = () => {
    if (!imgRef.current) return;
    setImgSize({
      width: imgRef.current.offsetWidth,
      height: imgRef.current.offsetHeight,
    });
    calculateColors();
  };

  useEffect(() => {
    calculateColors();
  }, [pickers, image]);

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex.toUpperCase());
    toast.success(`${hex.toUpperCase()} copied to clipboard!`, {
  style: {
    background: "#111827",
    color: "#fff",
    borderRadius: "12px",
  },
});
  };

  const toggleLock = (index) => {
    setPickers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, locked: !p.locked } : p))
    );
  };

  const toggleColorLock = (index) => {
    setLockedColors((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const addPicker = () => {
    setPickers((prev) => [...prev, { x: 200, y: 200, locked: false }]);
  };

  return (
    <div className="mt">
            <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-100 dark:bg-[#0b0b0f] dark:text-white">

      <h1 className="text-7xl font-bold mb-4 text-center">
        Image Palette Picker
      </h1>
      <p className="text-gray-500 mb-12 text-center max-w-2xl">
        Extract beautiful palettes from your photos. Click Randomize to adjust
        colors and click 📌 to lock/unlock.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 w-full max-w-7xl">
        {/* LEFT PANEL */}
        <div className="bg-gray-50 rounded-xl p-8 w-full md:w-1/2 space-y-6 shadow-lg dark:bg-[#4a5760] dark:text-white">
          {/* Palette */}
          <div className="flex rounded-lg overflow-hidden cursor-pointer">
            {colors.map((c, i) => (
             <div
  key={i}
  style={{ background: c }}
  className="flex-1 h-16 group relative flex items-center justify-center"
>
  {/* Hex display */}
  <span
    className="absolute inset-0 flex items-center justify-center text-sm text-white
      opacity-0 group-hover:opacity-100 bg-black/40 transition"
    onClick={() => copyColor(c)}
  >
    {c.toUpperCase()}
  </span>

  {/* Pin button – visible ONLY on hover */}
  <button
    className={`
      absolute top-1 right-1 w-6 h-6 rounded-full
      flex items-center justify-center text-xs
      border border-white
      opacity-0 group-hover:opacity-100
      transition-all duration-200
      ${
        lockedColors.includes(i)
          ? "bg-white text-black"
          : "bg-black/40 text-white"
      }
    `}
    onClick={(e) => {
      e.stopPropagation();
      toggleColorLock(i);
    }}
    title={lockedColors.includes(i) ? "Unlock color" : "Lock color"}
  >
    📌
  </button>
</div>

            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={adjustPickers}
              className="flex-1 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-lg font-medium dark:bg-gray-500 dark:hover:bg-gray-700"
            >
              Randomize
            </button>
            <button
              onClick={addPicker}
              className="flex-1 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 text-lg font-medium"
            >
              Add Picker
            </button>
          </div>

          <button
            onClick={() => setShowPreview(true)}
            className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-lg font-medium"
          >
            Fullscreen palette preview
          </button>

          <DropZone onSelect={handleImageUpload} />
        </div>

        {/* IMAGE PANEL */}
        <div className="relative rounded-xl overflow-hidden bg-gray-200 w-full md:w-1/2 shadow-lg">
          {image && (
            <>
              <img
                ref={imgRef}
                src={image}
                alt="uploaded"
                className="w-full h-auto max-h-[800px] object-contain"
                onLoad={onImageLoad}
              />

              {pickers.map((p, i) => (
                <motion.div
                  key={i}
                  drag
                  dragConstraints={{
                    left: 0,
                    top: 0,
                    right: imgSize.width,
                    bottom: imgSize.height,
                  }}
                  animate={{ x: p.x, y: p.y }}
                  onDragEnd={(e, info) => {
                    setPickers((prev) =>
                      prev.map((picker, idx) =>
                        idx === i
                          ? {
                              ...picker,
                              x: p.x + info.point.x - info.offset.x,
                              y: p.y + info.point.y - info.offset.y,
                            }
                          : picker
                      )
                    );
                  }}
                  className={`absolute w-8 h-8 rounded-full border-2 border-white cursor-pointer ${
                    p.locked ? "bg-red-500" : "bg-indigo-500/10 backdrop-blur-lg border border-indigo-300/20"
                  }`}
                  onClick={() => toggleLock(i)}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* FULLSCREEN PREVIEW */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 bg-gray-100 flex flex-col items-center justify-center p-6 dark:bg-[#0b0b0f] dark:text-white"
        >
          {/* Back Button */}
          <button
            onClick={() => setShowPreview(false)}
            className="self-start mb-6 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
          >
            Back
          </button>

          <div className="flex w-full h-full gap-2">
            {colors.map((c, i) => (
              <div
                key={i}
                style={{ background: c }}
                className="flex-1 h-full cursor-pointer relative"
                onClick={() => copyColor(c)}
              >
                <span className="absolute inset-0 flex items-center justify-center text-white text-xl opacity-0 hover:opacity-40 bg-black/40">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
    </div>
  );
};

export default ImagePalettePicker;
