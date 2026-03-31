/**
 * ====================================================================
 * ScrollProgress Component - Thanh tien trinh scroll
 * ====================================================================
 *
 * WHAT: Thanh ngang o top page hien thi % da scroll
 *
 * HOW: GSAP ScrollTrigger voi scrub theo toan bo document
 *   - start: top cua body
 *   - end: bottom cua body
 *   - scaleX tu 0 -> 1 theo scroll progress
 *
 * WHY scaleX thay vi width?
 *   - scaleX chay tren GPU (compositing layer)
 *   - width trigger layout recalculation (CPU heavy)
 *   - Ket qua: 60fps muot ma vs janky animation
 *
 * TRANSFORM-ORIGIN:
 *   - "left center": scale tu trai sang phai
 *   - Neu khong set, no scale tu center ra 2 phia
 *
 * ====================================================================
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Tao animation: scaleX 0 -> 1 theo scroll progress
    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none", // Linear vi dang map 1:1 voi scroll
      scrollTrigger: {
        trigger: document.documentElement,  // Trigger = toan bo page
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,  // Lag nho cho smooth, khong bi giat
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 w-full h-[3px] z-50 origin-left"
      style={{
        transform: "scaleX(0)",  // Bat dau tu 0
        background: "linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)",
      }}
    />
  );
};
