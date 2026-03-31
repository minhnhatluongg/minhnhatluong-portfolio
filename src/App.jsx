/**
 * ====================================================================
 * App.jsx - Root Component voi Mood System
 * ====================================================================
 *
 * MOI: mood state
 *   - Khi user click vao ten o hero, mood thay doi
 *   - Mood truyen xuong BackgroundVideo (doi mau overlay)
 *   - Mood truyen xuong Home (doi mau particles, text)
 *   - Tao cam giac "the gioi thay doi" moi lan click
 *
 * ====================================================================
 */

import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import "./index.css";
import { Navbar } from "./components/NavBar";
import { useState, useCallback } from "react";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Project";
import { Contact } from "./components/sections/Contact";
import { BackgroundVideo } from "./components/BackgroundVideo";
import { ScrollProgress } from "./components/ScrollProgress";
import { useLenis } from "./hooks/useLenis";

// Danh sach moods - xoay vong khi click
const MOODS = ["default", "cyber", "ocean", "sunset", "matrix"];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moodIndex, setMoodIndex] = useState(0);

  const lenisRef = useLenis({
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
  });

  // Goi khi click vao ten -> chuyen mood tiep theo
  const cycleMood = useCallback(() => {
    setMoodIndex((prev) => (prev + 1) % MOODS.length);
  }, []);

  const currentMood = MOODS[moodIndex];

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* Background voi mood color */}
      <BackgroundVideo mood={currentMood} />

      {isLoaded && <ScrollProgress />}

      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } relative`}
        style={{ backgroundColor: "transparent" }}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home mood={currentMood} onMoodChange={cycleMood} />
        <About />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default App;
