import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import "./index.css";
import { Navbar } from "./components/NavBar";
import { useState, useCallback, useEffect } from "react";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Project";
import { Contact } from "./components/sections/Contact";
import { CommandsBotPage } from "./components/sections/CommandsBotPage";
import { BackgroundVideo } from "./components/BackgroundVideo";
import { ScrollProgress } from "./components/ScrollProgress";
import { useLenis } from "./hooks/useLenis";

const MOODS = ["default", "cyber", "ocean", "sunset", "matrix"];

function normalizePath(p) {
  if (!p) return "/";
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

// Portfolio (main) tree - uses Lenis smooth scroll
function PortfolioApp() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moodIndex, setMoodIndex] = useState(0);

  useLenis({
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
  });

  const cycleMood = useCallback(() => {
    setMoodIndex((prev) => (prev + 1) % MOODS.length);
  }, []);

  const currentMood = MOODS[moodIndex];

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
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

function App() {
  const [path, setPath] = useState(() =>
    typeof window !== "undefined" ? normalizePath(window.location.pathname) : "/",
  );

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const isCommandsBot = path === "/commands-bot";

  // Lock html/body scroll & disable Lenis-induced overflow on /commands-bot.
  // The commands page renders a fixed full-viewport layout with its own
  // internal scrollable regions, so we need the document itself to NOT scroll.
  useEffect(() => {
    if (!isCommandsBot) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlHeight = html.style.height;
    const prevBodyHeight = body.style.height;
    // Strip Lenis classes so its overflow rules don't apply here.
    const hadLenis = html.classList.contains("lenis");
    const hadLenisSmooth = html.classList.contains("lenis-smooth");
    if (hadLenis) html.classList.remove("lenis");
    if (hadLenisSmooth) html.classList.remove("lenis-smooth");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.height = "100%";
    body.style.height = "100%";
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.height = prevHtmlHeight;
      body.style.height = prevBodyHeight;
      if (hadLenis) html.classList.add("lenis");
      if (hadLenisSmooth) html.classList.add("lenis-smooth");
    };
  }, [isCommandsBot]);

  const goBackToPortfolio = useCallback(() => {
    window.history.pushState({}, "", "/");
    setPath("/");
  }, []);

  if (isCommandsBot) {
    return <CommandsBotPage onBack={goBackToPortfolio} />;
  }

  return <PortfolioApp />;
}

export default App;
