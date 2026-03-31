/**
 * ====================================================================
 * RevealOnScroll - GSAP ScrollTrigger Version
 * ====================================================================
 *
 * THAY DOI SO VOI BAN CU:
 *   Cu: IntersectionObserver + CSS class toggle (.reveal -> .visible)
 *   Moi: GSAP ScrollTrigger + gsap.fromTo animation
 *
 * TAI SAO CHUYEN SANG GSAP?
 *   1. IntersectionObserver chi biet "in/out" viewport (binary)
 *      GSAP ScrollTrigger biet CHINH XAC % visible (continuous)
 *   2. Voi scrub, animation co the DI NGUOC khi scroll len
 *      (IntersectionObserver chi trigger 1 chieu)
 *   3. Dong bo voi Lenis smooth scroll (IO co the bi lech)
 *   4. Stagger, timeline, va cac effect phuc tap hon
 *
 * PROPS:
 *   - direction: Huong reveal ("up" | "down" | "left" | "right")
 *   - distance: Khoang cach di chuyen (pixels)
 *   - delay: Delay truoc khi bat dau (giay)
 *   - duration: Thoi gian animation (giay)
 *   - once: true = chi reveal 1 lan, false = reverse khi scroll len
 *   - stagger: Delay giua cac children (cho lists)
 *
 * ====================================================================
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const RevealOnScroll = ({
  children,
  direction = "up",      // "up" | "down" | "left" | "right"
  distance = 60,          // Pixels di chuyen
  delay = 0,              // Delay (giay)
  duration = 1,           // Duration (giay)
  once = true,            // Chi chay 1 lan?
  stagger = 0,            // Stagger cho children
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // STEP 1: Tinh from vars dua tren direction
    const fromVars = { opacity: 0 };
    switch (direction) {
      case "up":    fromVars.y = distance; break;
      case "down":  fromVars.y = -distance; break;
      case "left":  fromVars.x = distance; break;
      case "right": fromVars.x = -distance; break;
    }

    // STEP 2: Tinh to vars (reset ve vi tri goc)
    const toVars = {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      ease: "power3.out",   // Ease "nhe nhang" khi ket thuc
      stagger,              // Neu co nhieu children, stagger chung
    };

    // STEP 3: Chon strategy
    if (once) {
      // Strategy 1: toggleActions - chay 1 lan khi enter viewport
      // Format: "onEnter onLeave onEnterBack onLeaveBack"
      // "play none none none" = play khi enter, khong lam gi khi leave
      toVars.scrollTrigger = {
        trigger: el,
        start: "top 85%",      // Trigger khi top cua element o 85% viewport
        toggleActions: "play none none none",
        // markers: true,       // DEBUG
      };
    } else {
      // Strategy 2: scrub - animation theo scroll (reversible)
      toVars.scrollTrigger = {
        trigger: el,
        start: "top 85%",
        end: "top 30%",
        scrub: 1,
        // markers: true,       // DEBUG
      };
    }

    const tween = gsap.fromTo(el, fromVars, toVars);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, distance, delay, duration, once, stagger]);

  return (
    <div ref={ref} className="will-change-transform">
      {children}
    </div>
  );
};
