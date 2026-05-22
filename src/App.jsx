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

// ===== Hash-based routing =====
// Uses window.location.hash (e.g. "#/commands-bot") so the site works on
// ANY static host without server-side rewrites. The hash never reaches the
// server, so even shared hosts that 404 unknown paths still load index.html
// and let React decide what to render.
//
// We ALSO accept path-based "/commands-bot" for backwards compat — if a
// host is configured for SPA fallback, the old URL still works.
function readRoute() {
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash || "";
  if (hash.startsWith("#/")) {
    const path = hash.slice(1);
    return normalizePath(path);
  }
  // Fallback: read the real path (works on hosts with SPA rewrite).
  return normalizePath(window.location.pathname);
}

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
  const [route, setRoute] = useState(() => readRoute());

  useEffect(() => {
    const update = () => setRoute(readRoute());
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  const isCommandsBot = route === "/commands-bot";

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
    // Set hash back to home. We also push history so the back button works.
    if (window.location.hash) {
      window.history.pushState({}, "", window.location.pathname);
    }
    window.location.hash = "";
    setRoute("/");
  }, []);

  if (isCommandsBot) {
    return <CommandsBotPage onBack={goBackToPortfolio} />;
  }

  return <PortfolioApp />;
}

export default App;
