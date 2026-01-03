import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generator from "./pages/Generator";
import ImagePalettePicker from "./components/ImagePalettePicker"
import { ThemeProvider } from "./components/ThemeContext";


const App = () => {
  return (
    <BrowserRouter>
     <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/picker" element={<ImagePalettePicker />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
