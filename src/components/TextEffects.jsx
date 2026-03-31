/**
 * ====================================================================
 * TextEffects - Hieu ung chu dac biet
 * ====================================================================
 *
 * BAO GOM:
 *   1. SplitTextReveal - Chu xuat hien tung ky tu sau khi loading
 *   2. MagneticChar - Moi ky tu "nay" ra khi hover
 *   3. GlitchText - Hieu ung glitch khi click
 *   4. WaveText - Chu nhay theo song khi hover
 *
 * KY THUAT CHUNG:
 *   - Tach string thanh array cac ky tu (split(""))
 *   - Moi ky tu la 1 <span> rieng -> animate doc lap
 *   - GSAP stagger: animate lan luot voi delay giua moi ky tu
 *
 * PERFORMANCE:
 *   - Dung transform thay vi top/left
 *   - will-change: transform cho GPU acceleration
 *   - Cleanup GSAP tweens khi unmount
 *
 * ====================================================================
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

/**
 * ====================================================================
 * SplitTextReveal - Chu xuat hien tung ky tu voi GSAP
 * ====================================================================
 *
 * HOW:
 *   1. Tach text thanh tung ky tu
 *   2. Tat ca ky tu bat dau o opacity: 0, y: 80px (duoi)
 *   3. GSAP stagger animate tung ky tu len vi tri goc
 *   4. Moi ky tu co random rotation nhe -> tu nhien hon
 *
 * STAGGER EXPLAINED:
 *   stagger: 0.04 = moi ky tu cach nhau 0.04s
 *   "Hi, I'm Luong" co 14 ky tu
 *   -> Tong thoi gian stagger = 14 * 0.04 = 0.56s
 *   -> Ca animation (duration + stagger) ~ 1.5s
 *
 * ====================================================================
 */
export const SplitTextReveal = ({
  text,
  className = "",
  delay = 0,
  staggerTime = 0.04,
  charColor = "",  // Mau cho tung ky tu (de fix bg-clip-text issue)
  onComplete,
}) => {
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isRevealed) return;

    const chars = charsRef.current.filter(Boolean);
    if (chars.length === 0) return;

    gsap.set(chars, {
      opacity: 0,
      y: 80,
      rotateX: -90,
    });

    const tl = gsap.timeline({
      delay,
      onComplete: () => {
        setIsRevealed(true);
        onComplete?.();
      },
    });

    tl.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      stagger: {
        each: staggerTime,
        from: "start",
      },
    });

    return () => tl.kill();
  }, [delay, staggerTime, isRevealed, onComplete]);

  const chars = text.split("");

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ perspective: "1000px" }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => (charsRef.current[i] = el)}
          className="inline-block will-change-transform"
          style={{
            whiteSpace: char === " " ? "pre" : "normal",
            // Neu co charColor, set truc tiep (fix bg-clip-text issue)
            ...(charColor ? { WebkitTextFillColor: charColor } : {}),
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

/**
 * ====================================================================
 * MagneticText - Chu "nay" ra khi hover + ripple khi click
 * ====================================================================
 *
 * HOVER EFFECT:
 *   Moi ky tu di chuyen HUONG VE PHIA chuot (magnetic attract)
 *   Ky tu cang GAN chuot cang di chuyen NHIEU
 *   Ky tu XA chuot khong di chuyen
 *   -> Tao cam giac "nam cham" hut chu
 *
 * CLICK EFFECT (Ripple/Scatter):
 *   Khi click, cac ky tu "no" ra tu diem click
 *   Ky tu gan diem click bay xa hon
 *   Sau do tu dong quay ve vi tri goc
 *
 * MATH:
 *   distance = sqrt((charX - mouseX)^2 + (charY - mouseY)^2)
 *   influence = max(0, 1 - distance / radius)
 *   moveX = (mouseX - charX) * influence * strength
 *   moveY = (mouseY - charY) * influence * strength
 *
 * ====================================================================
 */
export const MagneticText = ({
  text,
  className = "",
  magnetStrength = 0.3,    // Luc hut (0.1 = nhe, 0.5 = manh)
  magnetRadius = 150,       // Ban kinh anh huong (pixels)
  clickScatter = true,      // Bat hieu ung click
  baseColor = "#38bdf8",    // Mau mac dinh cua chu (cyan-400)
  hoverColor = "#ffffff",   // Mau khi hover gan (trang sang)
  clickColor = "#60a5fa",   // Mau khi click scatter
  onClickCallback,           // Goi sau khi scatter xong (VD: doi mood)
}) => {
  const containerRef = useRef(null);
  const charsRef = useRef([]);
  const isAnimating = useRef(false);

  // HOVER: Tinh toan va animate moi ky tu theo vi tri chuot
  const handleMouseMove = useCallback(
    (e) => {
      if (isAnimating.current) return;

      const chars = charsRef.current.filter(Boolean);

      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const distX = e.clientX - charCenterX;
        const distY = e.clientY - charCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const influence = Math.max(0, 1 - distance / magnetRadius);

        const moveX = distX * influence * magnetStrength;
        const moveY = distY * influence * magnetStrength;

        // Dung WebkitTextFillColor vi text dang dung -webkit-text-fill-color
        // (bg-clip-text text-transparent set -webkit-text-fill-color: transparent)
        // Phai override truc tiep property nay, KHONG dung color
        gsap.to(char, {
          x: moveX,
          y: moveY,
          scale: 1 + influence * 0.2,
          duration: 0.3,
          ease: "power2.out",
        });

        // Set mau truc tiep qua style (GSAP khong ho tro WebkitTextFillColor)
        if (influence > 0.3) {
          char.style.webkitTextFillColor = hoverColor;
          char.style.textShadow = `0 0 20px rgba(59, 130, 246, 0.6)`;
        } else {
          char.style.webkitTextFillColor = baseColor;
          char.style.textShadow = "none";
        }
      });
    },
    [magnetStrength, magnetRadius, baseColor, hoverColor]
  );

  // MOUSE LEAVE: Reset tat ca ky tu
  const handleMouseLeave = useCallback(() => {
    if (isAnimating.current) return;

    const chars = charsRef.current.filter(Boolean);
    gsap.to(chars, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
    // Reset mau ve mac dinh
    chars.forEach((char) => {
      char.style.webkitTextFillColor = baseColor;
      char.style.textShadow = "none";
    });
  }, [baseColor]);

  // CLICK: Scatter roi quay ve + goi callback (doi mood)
  const handleClick = useCallback(
    (e) => {
      if (!clickScatter || isAnimating.current) return;
      isAnimating.current = true;

      // Goi callback NGAY khi click (de background doi mau song song voi scatter)
      onClickCallback?.();

      const chars = charsRef.current.filter(Boolean);

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      // Phase 1: Scatter
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(charCenterY - e.clientY, charCenterX - e.clientX);
        const distance = Math.sqrt(
          (charCenterX - e.clientX) ** 2 + (charCenterY - e.clientY) ** 2
        );

        const force = Math.max(20, 80 - distance * 0.3);
        const scatterX = Math.cos(angle) * force;
        const scatterY = Math.sin(angle) * force;

        // Doi mau khi scatter
        char.style.webkitTextFillColor = clickColor;
        char.style.textShadow = `0 0 25px rgba(59, 130, 246, 0.8)`;

        tl.to(
          char,
          {
            x: scatterX,
            y: scatterY,
            rotation: (Math.random() - 0.5) * 40,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        );
      });

      // Phase 2: Bay ve
      tl.to(chars, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
        stagger: 0.02,
      });
    },
    [clickScatter, baseColor, clickColor, onClickCallback]
  );

  const chars = text.split("");

  return (
    <span
      ref={containerRef}
      className={`inline-block cursor-pointer select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => (charsRef.current[i] = el)}
          className="inline-block will-change-transform"
          style={{
            whiteSpace: char === " " ? "pre" : "normal",
            // SET MAU TRUC TIEP - khong dung bg-clip-text o parent nua
            WebkitTextFillColor: baseColor,
            transition: "color 0.2s, text-shadow 0.2s, -webkit-text-fill-color 0.2s",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

/**
 * ====================================================================
 * GlowText - Chu co hieu ung glow chay doc theo text
 * ====================================================================
 *
 * HOW:
 *   Dung CSS gradient mask chay tu trai sang phai
 *   Tao cam giac "anh sang luot qua" chu
 *   Loop infinite -> attention grabbing
 *
 * ====================================================================
 */
export const GlowText = ({ text, className = "" }) => {
  return (
    <span className={`glow-sweep-text ${className}`}>
      {text}
    </span>
  );
};

/**
 * ====================================================================
 * RotatingRoles - Typewriter xoay vong qua cac vai tro
 * ====================================================================
 *
 * FLOW:
 *   1. Go tung ky tu cua role hien tai (type)
 *   2. Dung 2 giay (pause)
 *   3. Xoa tung ky tu (delete)
 *   4. Chuyen sang role tiep theo
 *   5. Lap lai
 *
 * TAO TO MO:
 *   - Nguoi xem thay text thay doi -> tu hoi "con gi nua?"
 *   - Cursor nhap nhay tao cam giac "dang live"
 *   - Moi role co mau rieng -> visual variety
 *
 * ====================================================================
 */
export const RotatingRoles = ({
  roles = [],
  typingSpeed = 80,     // ms moi ky tu khi go
  deletingSpeed = 40,   // ms moi ky tu khi xoa (nhanh hon go)
  pauseDuration = 2000, // ms dung giua moi role
  className = "",
}) => {
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (roles.length === 0) return;

    const currentRole = roles[roleIndex].text;

    // Dang dung -> cho het pause roi bat dau xoa
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    // Dang xoa
    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        return;
      }
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    // Dang go
    if (currentText.length < currentRole.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentRole.slice(0, currentText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }

    // Go xong -> pause
    setIsPaused(true);
  }, [currentText, roleIndex, isDeleting, isPaused, roles, typingSpeed, deletingSpeed, pauseDuration]);

  const currentColor = roles[roleIndex]?.color || "#38bdf8";

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span
        className="font-semibold transition-colors duration-300"
        style={{ WebkitTextFillColor: currentColor, color: currentColor }}
      >
        {currentText}
      </span>
      <span
        className="animate-blink ml-0.5 font-light"
        style={{ WebkitTextFillColor: currentColor, color: currentColor }}
      >
        |
      </span>
    </span>
  );
};
