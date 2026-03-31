/**
 * ====================================================================
 * Home Section - Hero voi Mood System
 * ====================================================================
 *
 * MOI: Khi click vao ten:
 *   1. MagneticText scatter effect (da co)
 *   2. onMoodChange() -> App doi mood -> BackgroundVideo doi mau
 *   3. ParticleField doi mau theo mood
 *   4. Tat ca chuyen dong cung luc -> "the gioi thay doi"
 *
 * MOOD -> COLOR MAPPING:
 *   default -> blue/cyan
 *   cyber   -> violet/purple
 *   ocean   -> teal/cyan dam
 *   sunset  -> orange/amber
 *   matrix  -> emerald/green
 *
 * ====================================================================
 */

import { RevealOnScroll } from "../RevealOnScroll";
import { Button } from "../ui/Button";
import { FloatingShapes } from "../ParallaxLayer";
import { useParallax } from "../../hooks/useParallax";
import { SplitTextReveal, MagneticText, GlowText, RotatingRoles } from "../TextEffects";
import { ParticleField } from "../ParticleField";
import { TechOrbit } from "../TechOrbit";
import { ScrollIndicator } from "../ScrollIndicator";

// Mau cua particles + text cho tung mood
const MOOD_THEME = {
  default: {
    particle: "rgba(59, 130, 246, 0.4)",    // blue
    line: "rgba(59, 130, 246, 0.08)",
    textBase: "#38bdf8",
    textHover: "#ffffff",
    textClick: "#60a5fa",
    label: "Blue",
  },
  cyber: {
    particle: "rgba(139, 92, 246, 0.4)",    // violet
    line: "rgba(139, 92, 246, 0.08)",
    textBase: "#a78bfa",
    textHover: "#ffffff",
    textClick: "#c4b5fd",
    label: "Cyber",
  },
  ocean: {
    particle: "rgba(6, 182, 212, 0.4)",     // cyan
    line: "rgba(6, 182, 212, 0.08)",
    textBase: "#22d3ee",
    textHover: "#ffffff",
    textClick: "#67e8f9",
    label: "Ocean",
  },
  sunset: {
    particle: "rgba(251, 146, 60, 0.4)",    // orange
    line: "rgba(251, 146, 60, 0.08)",
    textBase: "#fb923c",
    textHover: "#ffffff",
    textClick: "#fdba74",
    label: "Sunset",
  },
  matrix: {
    particle: "rgba(52, 211, 153, 0.4)",    // emerald
    line: "rgba(52, 211, 153, 0.08)",
    textBase: "#34d399",
    textHover: "#ffffff",
    textClick: "#6ee7b7",
    label: "Matrix",
  },
};

export const Home = ({ mood = "default", onMoodChange }) => {
  const headingRef = useParallax(-30);
  const subtitleRef = useParallax(-15);

  const theme = MOOD_THEME[mood] || MOOD_THEME.default;

  const roles = [
    { text: "Full-Stack Developer", color: "#38bdf8" },
    { text: "Backend Engineer", color: "#a78bfa" },
    { text: "React Enthusiast", color: "#34d399" },
    { text: "Problem Solver", color: "#fb923c" },
    { text: ".NET Specialist", color: "#818cf8" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* === LAYER 1: Particle Field - mau thay doi theo mood === */}
      <ParticleField
        key={mood}
        particleCount={60}
        connectionDistance={120}
        mouseRepelRadius={100}
        speed={0.3}
        particleColor={theme.particle}
        lineColor={theme.line}
      />

      {/* === LAYER 2: Tech Orbit === */}
      <TechOrbit />

      {/* === LAYER 3: Decorative shapes === */}
      <FloatingShapes variant="home" />

      {/* === LAYER 4: Main Content === */}
      <RevealOnScroll>
        <div className="text-center z-10 px-4 relative">
          <p className="text-gray-500 text-sm md:text-base tracking-widest uppercase mb-4 animate-fade-in">
            Welcome to my portfolio
          </p>

          {/* HEADING - mau thay doi theo mood */}
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl font-bold mb-2 leading-tight will-change-transform"
          >
            <SplitTextReveal
              text="Hi, I'm "
              delay={0.3}
              staggerTime={0.05}
              charColor={theme.textBase}
            />
            <br />
            {/* Click vao ten -> scatter + doi mood */}
            <MagneticText
              text="Luong Minh Nhat"
              magnetStrength={0.3}
              magnetRadius={120}
              clickScatter={true}
              baseColor={theme.textBase}
              hoverColor={theme.textHover}
              clickColor={theme.textClick}
              onClickCallback={onMoodChange}
            />
          </h1>

          {/* HINT - co mood label */}
          <p className="text-gray-600 text-xs mb-4 animate-fade-in-delayed flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5 animate-pulse" style={{ color: theme.textBase }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>Click my name to change the vibe</span>
            <span
              className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all duration-700"
              style={{
                color: theme.textBase,
                border: `1px solid ${theme.textBase}33`,
                backgroundColor: `${theme.textBase}11`,
              }}
            >
              {theme.label}
            </span>
          </p>

          {/* ROTATING ROLES */}
          <div className="h-8 md:h-10 mb-6 flex items-center justify-center animate-fade-in-delayed">
            <span className="text-lg md:text-2xl text-gray-500 mr-2">I'm a</span>
            <RotatingRoles
              roles={roles}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2000}
              className="text-lg md:text-2xl"
            />
          </div>

          {/* SUBTITLE */}
          <div ref={subtitleRef} className="will-change-transform">
            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed animate-fade-in-delayed">
              <GlowText text="Crafting clean, scalable web applications with exceptional performance and delightful user experiences." />
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-more-delayed">
            <Button href="#projects" variant="primary">
              View Projects
            </Button>
            <Button href="#about" variant="outline">
              Learn More
            </Button>
          </div>

          {/* QUICK STATS */}
          <div className="flex justify-center gap-6 md:gap-10 mt-8 animate-fade-in-more-delayed">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-400">4+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Projects</div>
            </div>
            <div className="w-px h-10 bg-gray-700/50" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400">5+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Technologies</div>
            </div>
            <div className="w-px h-10 bg-gray-700/50" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-violet-400">1+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Year Exp</div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* === LAYER 5: Scroll Indicator === */}
      <ScrollIndicator />
    </section>
  );
};
