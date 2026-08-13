/**
 * ====================================================================
 * AboutSection - Gioi thieu ban than voi serif italic accents
 * ====================================================================
 *
 * - useInView (once, margin -100px) -> chi animate 1 lan khi scroll toi
 * - Label + heading + intro paragraph, stagger delay 0 / 0.1 / 0.2
 * - Accent words: Instrument Serif italic, text-white/60
 *
 * ====================================================================
 */

import { useRef } from "react";
import { motion as Motion, useInView } from "motion/react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-6 pt-32 pb-10 md:pt-44 md:pb-14"
    >
      {/* Radial gradient overlay nhe */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div ref={ref} className="relative mx-auto max-w-5xl text-center">
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm uppercase tracking-widest text-white/40"
        >
          About Me
        </Motion.p>

        <Motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Turning{" "}
          <span className="font-instrument italic text-white/60">ideas</span>{" "}
          into
          <br className="hidden md:block" /> software that{" "}
          <span className="font-instrument italic text-white/60">
            scales, performs, and inspires.
          </span>
        </Motion.h2>

        <Motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg"
        >
          I'm Luong Minh Nhat — a software engineer at WINTECH, where I
          architect high-performance APIs and core ERP systems. Trained in
          software engineering at HCMC University of Technology and Education,
          I live at the intersection of .NET backends and React frontends.
        </Motion.p>
      </div>
    </section>
  );
};
