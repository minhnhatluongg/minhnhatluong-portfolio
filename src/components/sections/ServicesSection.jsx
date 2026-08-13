/**
 * ====================================================================
 * ServicesSection - "What I do" voi 2 video cards
 * ====================================================================
 *
 * - Header row: heading trai + label "Capabilities" phai (an mobile)
 * - 2 cards liquid-glass rounded-3xl, video hover scale-105 (700ms)
 * - Stagger 0.15s giua 2 cards
 *
 * ====================================================================
 */

import { useRef } from "react";
import { motion as Motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    tag: "Backend",
    title: "API & System Engineering",
    description:
      "Robust APIs with .NET, Clean Architecture, CQRS, and SQL — engineered for data integrity, speed, and scale.",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  },
  {
    tag: "Frontend",
    title: "Web Experiences",
    description:
      "From concept to launch — React, TypeScript, and Tailwind CSS interfaces that feel effortless and look extraordinary.",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      {/* Radial gradient nhe o giua */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        {/* Header row */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between md:mb-16"
        >
          <h2 className="text-3xl tracking-tight text-white md:text-5xl">
            What I do
          </h2>
          <p className="hidden text-sm text-white/40 md:block">Capabilities</p>
        </Motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {SERVICES.map((service, i) => (
            <Motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="liquid-glass group overflow-hidden rounded-3xl"
            >
              {/* Video area */}
              <div className="relative aspect-video overflow-hidden">
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  tabIndex={-1}
                  disablePictureInPicture
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={service.video} type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-6 md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    {service.tag}
                  </p>
                  <span className="liquid-glass rounded-full p-2 text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
