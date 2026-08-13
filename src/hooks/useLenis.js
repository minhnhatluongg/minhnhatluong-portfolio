/**
 * ====================================================================
 * useLenis Hook - Lenis Smooth Scroll Provider
 * ====================================================================
 *
 * WHAT: Tao smooth scroll cho toan bo page bang Lenis
 *
 * WHY LENIS?
 *   - Browser native scroll bi "giat" (discrete steps)
 *   - Lenis tao scroll "muot" (lerp-based interpolation)
 *   - GSAP ScrollTrigger can smooth scroll de tinh toan chinh xac
 *   - Lenis + GSAP = combo chuan cua parallax websites
 *
 * HOW IT WORKS:
 *   1. Lenis overrides native scroll bang requestAnimationFrame loop
 *   2. Moi frame, no lerp (linear interpolation) giua vi tri hien tai va vi tri target
 *   3. lerp = 0.1 nghia la moi frame di chuyen 10% khoang cach con lai
 *      -> Tao cam giac "ease-out" tu nhien
 *   4. GSAP ScrollTrigger duoc sync voi Lenis qua scrollerProxy
 *
 * LERP FORMULA:
 *   current = current + (target - current) * lerp
 *   lerp cao (0.2) = nhanh, it smooth
 *   lerp thap (0.05) = cham, rat smooth (nhung co the cam thay "nang")
 *
 * KEY CONCEPTS:
 *   - lerp: He so noi suy (0-1), cang thap cang muot
 *   - duration: Thoi gian scroll animation (giay)
 *   - easing: Ham easing cho scroll (mac dinh easeOutQuint)
 *   - wheelMultiplier: Toc do scroll khi dung chuot
 *   - touchMultiplier: Toc do scroll khi dung touch (mobile)
 *
 * ====================================================================
 */

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// STEP 1: Register GSAP plugin (chi can 1 lan)
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook tao Lenis smooth scroll + sync voi GSAP
 *
 * @param {Object} options - Config cho Lenis
 * @returns {Object} ref den Lenis instance (de control tu ben ngoai neu can)
 */
export function useLenis(options = {}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // STEP 2: Khoi tao Lenis voi config
    const lenis = new Lenis({
      // --- Core Settings ---
      lerp: 0.1,              // Do muot: 0.05 (rat smooth) -> 0.2 (nhanh)
      duration: 1.2,           // Duration cua moi scroll "impulse"
      smoothWheel: true,       // Smooth scroll cho mouse wheel
      smoothTouch: false,      // TAT smooth cho touch (mobile can native feel)
      wheelMultiplier: 1,      // Nhan toc do wheel scroll
      touchMultiplier: 2,      // Nhan toc do touch scroll

      // --- Advanced ---
      infinite: false,         // true = infinite scroll (loop lai)
      orientation: "vertical", // "vertical" | "horizontal"
      gestureOrientation: "vertical",

      // Override tu user
      ...options,
    });

    lenisRef.current = lenis;

    // STEP 3: Sync Lenis voi GSAP ScrollTrigger
    // Day la buoc QUAN TRONG NHAT - khong co buoc nay, ScrollTrigger se
    // dung native scroll position thay vi Lenis position -> bi lech
    lenis.on("scroll", ScrollTrigger.update);

    // STEP 4: Tao RAF loop - Lenis can duoc goi moi frame
    // gsap.ticker chay ~60fps, ta "gat" Lenis vao ticker nay
    // thay vi tao requestAnimationFrame rieng (tranh 2 loop chay song song)
    // LUU Y: phai giu reference den callback de remove dung ham do -
    // remove(lenis.raf) KHONG go duoc wrapper anonymous -> leak ticker.
    const rafCallback = (time) => {
      lenis.raf(time * 1000); // GSAP ticker tra ve giay, Lenis can milliseconds
    };
    gsap.ticker.add(rafCallback);

    // STEP 5: Tat deltaRatio cua gsap de tranh conflict voi Lenis timing
    gsap.ticker.lagSmoothing(0);

    // STEP 6: Cleanup khi unmount
    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // Empty deps = chi chay 1 lan

  return lenisRef;
}
