import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashCursor from '../components/SplashCursor'
import Navbar from "../components/Navbar";

const heading = "Instant color palettes for modern creators.";

const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const Home = () => {
  const navigate = useNavigate();

  const [colors, setColors] = useState(
  heading.split("").map(() => "inherit")
);

  const handleLetterHover = (index) => {
    const copy = [...colors];
    copy[index] = randomColor();
    setColors(copy);

    setTimeout(() => {
      setColors((prev) => {
        const reset = [...prev];
reset[index] = "inherit";
        return reset;
      });
    }, 7000);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden  dark:bg-[#0b0b0f] dark:text-white">
            <Navbar />


      {/* ✅ React Bits Ribbon Background */}
      <SplashCursor />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <div className="w-full flex justify-between items-center gap-16">

          {/* LEFT */}
          <div className="max-w-xl ">
            <h1 className="text-7xl font-extrabold leading-tight dark:text-white">
              {heading.split("").map((char, i) => (
               <span
  key={i}
  onMouseEnter={(e) => {
    handleLetterHover(i);
    e.currentTarget.classList.remove("shake");
    void e.currentTarget.offsetWidth; // force reflow
    e.currentTarget.classList.add("shake");
  }}
  style={{ color: colors[i] }}
  className="inline-block cursor-pointer"
>
  {char === " " ? "\u00A0" : char}
</span>

              ))}
            </h1>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-100">
              Create the perfect palette or get inspired by beautiful schemes.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate("/picker")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700"
              >
                Start Generator using image
              </button>

              <button
              onClick={() => navigate("/generator")}

              className="bg-gray-100 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:bg-gray-400 dark:text-gray-900">
                Explore Palettes
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <img
            src="https://cdn-icons-gif.flaticon.com/15557/15557761.gif"
            alt="palette"
            className="w-[420px] rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
