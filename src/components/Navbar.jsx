// import pallete from '../assets/pallete.png'
import { useTheme } from "../components/ThemeContext";


const Navbar = () => {
    const { dark, setDark } = useTheme();

  return (
    <nav className="w-full bg-white shadow-md flex items-center justify-between px-6 py-4 sticky top-0 z-50 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center gap-3">
        {/* <img src={pallete} alt="Logo" className="max-w-[90px] h-10" /> */}
<h1 className="text-2xl font-extrabold tracking-wide flex">
  {["C","o","l","o","r","i","f","y"].map((char, i) => (
    <span
      key={i}
      className="transition-transform hover:scale-110"
      style={{
        color: [
          "#6366f1", // indigo
          "#ec4899", // pink
          "#22c55e", // green
          "#f59e0b", // amber
          "#3b82f6", // blue
          "#a855f7", // purple
          "#14b8a6", // teal
          "#ef4444", // red
        ][i],
      }}
    >
      {char}
    </span>
  ))}
</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition dark:bg-white dark:text-black">
          Sign In
        </button>
         <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg bg-white/10 dark:bg-black/30 backdrop-blur"
    >
      {dark ? "🌙" : "☀️"}
    </button>
      </div>
    </nav>
  );
};

export default Navbar;
