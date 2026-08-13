/**
 * ====================================================================
 * PhilosophySection - "Backend x Frontend"
 * ====================================================================
 *
 * - Heading lon voi "x" Instrument Serif italic white/40
 * - Grid 2 cot: video (tu trai, x: -40) | 2 text blocks (tu phai, x: 40)
 * - Text blocks ngan cach boi divider h-px bg-white/10
 *
 * ====================================================================
 */

import { useRef } from "react";
import { motion as Motion, useInView } from "motion/react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

export const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div ref={ref} className="mx-auto max-w-6xl">
        <Motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl"
        >
          Backend{" "}
          <span className="font-instrument italic text-white/40">x</span>{" "}
          Frontend
        </Motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Video - truot vao tu trai */}
          <Motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <video
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              disablePictureInPicture
              className="h-full w-full object-cover"
            >
              <source src={VIDEO_URL} type="video/mp4" />
            </video>
          </Motion.div>

          {/* Text blocks - truot vao tu phai */}
          <Motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-white/40">
                The server side
              </p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                My core is C# and .NET — designing APIs with Clean
                Architecture, CQRS, and MediatR, backed by carefully tuned SQL
                stored procedures and triggers. At WINTECH I architect
                high-performance APIs for invoice lookup and financial
                services, where every millisecond and every row of data
                matters.
              </p>
            </div>

            <div className="my-8 h-px w-full bg-white/10 md:my-10" />

            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-white/40">
                The human side
              </p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                On the surface, I build with React, TypeScript, and Tailwind
                CSS — interfaces that feel fast, effortless, and quietly
                delightful. Curiosity keeps the toolbox growing: Docker, Redis,
                MongoDB, Python, and whatever the problem truly calls for.
              </p>
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};
