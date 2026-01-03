import { useState } from "react";
import { motion  } from "framer-motion";
import { FiEdit, FiCopy, FiTrash2, FiInfo } from "react-icons/fi";
import { ToastContainer,toast   } from "react-toastify";

const ColorBlock = ({ color, onChangeColor, onCopy, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      layout
      className="relative flex-1 h-full flex flex-col justify-end items-center"
      style={{ backgroundColor: color }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* COLOR INFO */}
      <div className="mb-6 text-center select-none">
        <p className="text-white text-[25px] font-bold tracking-wide">
          {color.toUpperCase()}
        </p>
      </div>

      {/* ACTIONS */}
      {showActions && (
        <div className="absolute top-6 right-4 flex flex-col gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onChangeColor(); }}
            className="action-btn"
          >
            <FiEdit />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onCopy(); }}
            className="action-btn"
          >
            <FiCopy />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="action-btn"
          >
            <FiTrash2 />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); toast(color); }}
            className="action-btn"
          >
            <FiInfo />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ColorBlock;
