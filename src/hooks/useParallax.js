/**
 * ====================================================================
 * useParallax Hook - GSAP ScrollTrigger Parallax
 * ====================================================================
 *
 * WHAT: Hook tao parallax effect cho bat ky element nao
 *
 * HOW GSAP ScrollTrigger WORKS:
 *   1. Ban dinh nghia: "khi element nay ENTER viewport, chay animation nay"
 *   2. ScrollTrigger theo doi scroll position va tinh % progress (0 -> 1)
 *   3. Voi scrub: true, animation bi "bind" vao scroll position
 *      -> Keo xuong = animation tien, keo len = animation lui
 *   4. Voi scrub: 1, co 1 giay "lag" -> tao cam giac smooth
 *
 * PARALLAX FORMULA:
 *   translateY = speed * scrollDistance
 *
 *   speed > 0: element di chuyen CUNG chieu scroll (xuong khi scroll xuong)
 *   speed < 0: element di chuyen NGUOC chieu scroll (len khi scroll xuong)
 *   speed = 0: khong di chuyen (static)
 *
 *   |speed| lon = di chuyen nhieu = layer "gan mat" hon
 *   |speed| nho = di chuyen it = layer "xa" hon
 *
 * SCRUB EXPLAINED:
 *   scrub: true   -> Animation khop chinh xac voi scroll (no lag)
 *   scrub: 0.5    -> 0.5s lag (smooth hon)
 *   scrub: 1      -> 1s lag (rat smooth, dung cho parallax)
 *   scrub: 3      -> 3s lag (qua nhieu, cam giac "nang")
 *
 * TRIGGER POSITIONS (start/end):
 *   "top bottom"  -> Bat dau khi TOP cua element cham BOTTOM cua viewport
 *   "top top"     -> Bat dau khi TOP cua element cham TOP cua viewport
 *   "center center" -> Bat dau khi CENTER cua element o CENTER viewport
 *   "bottom top"  -> Bat dau khi BOTTOM cua element cham TOP (da di qua)
 *
 *   Format: "elementPosition viewportPosition"
 *
 * ====================================================================
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook co ban: Parallax translateY theo scroll
 *
 * @param {number} speed - Toc do parallax (-200 den 200, pixels di chuyen)
 * @param {Object} options - Tuy chinh them
 * @returns {React.RefObject} ref gan vao element can parallax
 *
 * USAGE:
 *   const ref = useParallax(100);  // Di chuyen 100px khi scroll qua
 *   return <div ref={ref}>...</div>
 */
export function useParallax(speed = 50, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      scrub = 1,                      // Do smooth (giay)
      start = "top bottom",           // Bat dau khi element vao viewport
      end = "bottom top",             // Ket thuc khi element roi viewport
      direction = "y",                // "y" | "x" | "both"
    } = options;

    // Tao animation
    const tween = gsap.to(el, {
      y: direction === "x" ? 0 : speed,
      x: direction === "y" ? 0 : speed,
      ease: "none",  // QUAN TRONG: parallax can linear, khong ease
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        // markers: true, // BẬT DONG NAY DE DEBUG - hien thi trigger points
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, options]);

  return ref;
}

/**
 * Hook nang cao: Parallax voi nhieu properties cung luc
 *
 * @param {Object} fromVars - Trang thai BAT DAU (khi scroll = start)
 * @param {Object} toVars - Trang thai KET THUC (khi scroll = end)
 * @param {Object} triggerOptions - Config cho ScrollTrigger
 * @returns {React.RefObject}
 *
 * USAGE:
 *   const ref = useScrollAnimation(
 *     { opacity: 0, y: 100, scale: 0.8, rotation: -5 },  // from
 *     { opacity: 1, y: 0, scale: 1, rotation: 0 },       // to
 *     { scrub: 1, start: "top 80%" }                      // trigger config
 *   );
 *   return <div ref={ref}>...</div>
 */
export function useScrollAnimation(fromVars = {}, toVars = {}, triggerOptions = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      scrub = 1,
      start = "top 85%",
      end = "top 20%",
      toggleActions,  // Alternative: "play none none reverse"
      once = false,   // true = chi chay 1 lan
    } = triggerOptions;

    // Tao fromTo animation
    const tween = gsap.fromTo(el, fromVars, {
      ...toVars,
      ease: scrub ? "none" : "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: toggleActions ? false : scrub,
        toggleActions: toggleActions || undefined,
        once,
        // markers: true, // DEBUG
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

/**
 * Hook: Pin element tai cho trong khi scroll (Sticky effect)
 *
 * @param {Object} options - Config
 * @returns {React.RefObject}
 *
 * HOW PIN WORKS:
 *   Element bi "gim" tai vi tri khi scroll den no.
 *   Trong khi pin, scroll tiep tuc nhung element dung yen.
 *   Khi scroll qua endTrigger, element duoc "tha" va scroll binh thuong.
 *
 * USAGE:
 *   const ref = usePin({ pinSpacing: true, endOffset: "+=500" });
 *   return <section ref={ref}>This stays pinned for 500px of scroll</section>
 */
export function usePin(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      start = "top top",
      end = "+=100%",       // Pin trong bao nhieu scroll distance
      pinSpacing = true,    // true = them khoang trong phia duoi de bu
    } = options;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      pin: true,
      pinSpacing,
      // markers: true, // DEBUG
    });

    return () => trigger.kill();
  }, []);

  return ref;
}
