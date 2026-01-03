import { motion } from "framer-motion";

const ColorCircle = ({ x, y, color }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{
        left: x,
        top: y,
        backgroundColor: color,
      }}
      className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg cursor-pointer"
    />
  );
};

export default ColorCircle;
