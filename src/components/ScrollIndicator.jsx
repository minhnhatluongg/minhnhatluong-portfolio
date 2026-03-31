/**
 * ScrollIndicator - Mui ten bounce o bottom hero (ro hon)
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollIndicator = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      opacity: 0,
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "100px top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
    >
      {/* Text ro hon - mau sang hon, co glow nhe */}
      <span className="text-gray-400 text-xs tracking-[0.2em] uppercase"
        style={{ textShadow: "0 0 10px rgba(59, 130, 246, 0.3)" }}
      >
        Scroll to explore
      </span>

      {/* Mouse icon - border sang hon, dot to hon */}
      <div className="w-7 h-11 border-2 border-blue-400/50 rounded-full flex justify-center pt-2"
        style={{ boxShadow: "0 0 12px rgba(59, 130, 246, 0.15)" }}
      >
        <div className="w-1.5 h-2.5 bg-blue-400 rounded-full animate-scroll-dot" />
      </div>

      {/* Chevrons - 2 arrows chong len, sang hon */}
      <div className="flex flex-col items-center -mt-1 gap-[-2px] animate-bounce-slow">
        <svg className="w-5 h-5 text-blue-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <svg className="w-5 h-5 text-blue-400/30 -mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
