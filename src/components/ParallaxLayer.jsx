/**
 * ====================================================================
 * ParallaxLayer Component - Decorative Parallax Background Elements
 * ====================================================================
 *
 * WHAT: Component tao cac lop trang tri (hình, blob, grid) di chuyen
 *       voi toc do khac nhau khi scroll -> tao chieu sau
 *
 * ARCHITECTURE (tu xa -> gan):
 *   Layer -3: Deep background (stars, dots) - speed rat cham
 *   Layer -2: Mid background (blobs, gradients) - speed cham
 *   Layer -1: Near background (geometric shapes) - speed trung binh
 *   Layer  0: Content (text, cards) - scroll binh thuong
 *   Layer +1: Foreground (floating particles) - speed nhanh hon scroll
 *
 * WHY SEPARATE COMPONENT?
 *   - Tach decorative elements khoi content
 *   - De dang bat/tat parallax effects
 *   - Reusable across sections
 *   - Performance: chi re-render decorative layer, khong anh huong content
 *
 * ====================================================================
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxLayer - Wrapper tao parallax cho children
 *
 * @param {number} speed - Toc do parallax (pixels)
 *   - speed > 0: di xuong khi scroll xuong (layer "phia truoc")
 *   - speed < 0: di len khi scroll xuong (layer "phia sau")
 * @param {string} className - Tailwind classes
 * @param {React.ReactNode} children - Noi dung ben trong
 *
 * CACH DUNG:
 *   <ParallaxLayer speed={-50} className="absolute top-20 left-10">
 *     <div className="w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
 *   </ParallaxLayer>
 */
export const ParallaxLayer = ({
  speed = -50,
  className = "",
  children,
  scrub = 1,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      y: speed,
      ease: "none",
      scrollTrigger: {
        trigger: el.parentElement || el, // Trigger theo parent section
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, scrub]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * ====================================================================
 * FloatingShapes - Tao hinh trang tri cho moi section
 * ====================================================================
 *
 * MOI section co 1 set shapes rieng, tao "depth" cho trang.
 * Moi shape co speed khac nhau -> khi scroll, chung di chuyen lech nhau.
 *
 * DESIGN PRINCIPLES:
 *   1. Opacity thap (0.03-0.1) - chi thoang thay, khong phan tan
 *   2. Blur cao - tao cam giac "out of focus" = xa
 *   3. Gradient colors - match voi theme (blue/cyan)
 *   4. Mix shapes: circles (soft), lines (geometric), dots (texture)
 *
 * ====================================================================
 */
export const FloatingShapes = ({ variant = "home" }) => {
  const shapes = {
    // ===== HOME: Nhieu shapes, tao "wow" dau tien =====
    home: (
      <>
        {/* Blob lon o goc trai - di chuyen cham (xa) */}
        <ParallaxLayer speed={-80} className="absolute -top-20 -left-40">
          <div className="w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </ParallaxLayer>

        {/* Blob nho o goc phai - di chuyen nhanh hon (gan) */}
        <ParallaxLayer speed={-30} className="absolute top-1/3 -right-20">
          <div className="w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl" />
        </ParallaxLayer>

        {/* Vong tron outline - di chuyen trung binh */}
        <ParallaxLayer speed={-50} className="absolute bottom-20 left-1/4">
          <div className="w-40 h-40 border border-blue-500/10 rounded-full" />
        </ParallaxLayer>

        {/* Duong cheo trang tri */}
        <ParallaxLayer speed={-100} className="absolute top-1/4 right-1/4">
          <div className="w-px h-40 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent rotate-45" />
        </ParallaxLayer>

        {/* Dot grid nho */}
        <ParallaxLayer speed={-120} className="absolute bottom-1/3 right-10">
          <div className="grid grid-cols-3 gap-3 opacity-20">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-blue-400 rounded-full" />
            ))}
          </div>
        </ParallaxLayer>
      </>
    ),

    // ===== ABOUT: It shapes hon, tap trung vao content =====
    about: (
      <>
        <ParallaxLayer speed={-60} className="absolute -top-10 -right-32">
          <div className="w-72 h-72 bg-blue-600/5 rounded-full blur-3xl" />
        </ParallaxLayer>

        <ParallaxLayer speed={-40} className="absolute bottom-0 -left-20">
          <div className="w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl" />
        </ParallaxLayer>

        {/* Duong ngang trang tri */}
        <ParallaxLayer speed={-90} className="absolute top-1/2 left-0 w-full">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
        </ParallaxLayer>
      </>
    ),

    // ===== PROJECTS: Geometric shapes phu hop voi "tech" feel =====
    projects: (
      <>
        <ParallaxLayer speed={-70} className="absolute -top-20 left-10">
          <div className="w-60 h-60 bg-blue-500/5 rounded-full blur-3xl" />
        </ParallaxLayer>

        {/* Square rotated = diamond */}
        <ParallaxLayer speed={-40} className="absolute top-1/3 -right-10">
          <div className="w-20 h-20 border border-cyan-500/10 rotate-45" />
        </ParallaxLayer>

        {/* Code brackets decorative */}
        <ParallaxLayer speed={-100} className="absolute bottom-20 left-5">
          <span className="text-6xl font-mono text-blue-500/5 select-none">
            {"{ }"}
          </span>
        </ParallaxLayer>
      </>
    ),

    // ===== CONTACT: Nhe nhang, minimal =====
    contact: (
      <>
        <ParallaxLayer speed={-50} className="absolute -top-10 right-1/4">
          <div className="w-56 h-56 bg-blue-500/5 rounded-full blur-3xl" />
        </ParallaxLayer>

        <ParallaxLayer speed={-80} className="absolute bottom-10 left-1/3">
          <div className="w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl" />
        </ParallaxLayer>
      </>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes[variant] || null}
    </div>
  );
};
