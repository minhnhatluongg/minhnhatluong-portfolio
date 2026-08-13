/**
 * ====================================================================
 * FeaturedVideoSection - Video lon voi glass card "My Approach"
 * ====================================================================
 *
 * - rounded-3xl aspect-video, animate tu opacity 0 / y 60
 * - Gradient overlay tu duoi len (from-black/60)
 * - Card liquid-glass + nut "Explore GitHub" (whileHover/whileTap)
 *
 * ====================================================================
 */

import { useRef } from "react";
import { motion as Motion, useInView } from "motion/react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";

export const FeaturedVideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="overflow-hidden bg-black px-6 pt-6 pb-20 md:pt-10 md:pb-32">
      <div ref={ref} className="mx-auto max-w-6xl">
        <Motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Video giu aspect-video; tren mobile overlay content nam DUOI
              video (in-flow) vi aspect-video o ~340px chi cao ~190px -
              card + button se bi clip neu absolute. md+: overlay dung spec. */}
          <div className="relative aspect-video">
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

            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Bottom overlay content */}
          <div className="flex flex-col gap-6 p-6 md:absolute md:bottom-0 md:left-0 md:right-0 md:flex-row md:items-end md:justify-between md:p-10">
            <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
              <p className="mb-3 text-xs uppercase tracking-widest text-white/50">
                My Approach
              </p>
              <p className="text-sm leading-relaxed text-white md:text-base">
                I believe in curiosity-driven engineering. Every project starts
                with a question — how can this be faster, cleaner, simpler? —
                and every answer opens a new door to a better product.
              </p>
            </div>

            <Motion.a
              href="https://github.com/minhnhatluongg"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass self-start rounded-full px-8 py-3 text-sm font-medium text-white md:self-auto"
            >
              Explore GitHub
            </Motion.a>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};
