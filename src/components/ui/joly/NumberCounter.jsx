/**
 * NumberCounter - Joly UI (https://jolyui.dev/docs/components/text-animations/number-counter)
 *
 * Số đếm tăng dần với easing khi scroll vào viewport.
 * Dùng cho quick stats (4+ Projects, 5+ Technologies...).
 */
import { useInView } from "motion/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";

const easingFunctions = {
  linear: [0, 0, 1, 1],
  easeOut: [0.16, 1, 0.3, 1],
  easeIn: [0.7, 0, 0.84, 0],
  easeInOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
  bounce: [0.68, -0.55, 0.27, 1.55],
};

const formatNumber = (value, decimals, separator, decimalSeparator) => {
  const fixed = value.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const formattedInt = (intPart || "").replace(
    /\B(?=(\d{3})+(?!\d))/g,
    separator,
  );
  return decPart
    ? `${formattedInt}${decimalSeparator}${decPart}`
    : formattedInt;
};

const NumberCounter = forwardRef(
  (
    {
      value,
      from = 0,
      duration = 2,
      delay = 0,
      decimals = 0,
      separator = ",",
      decimalSeparator = ".",
      prefix = "",
      suffix = "",
      easing = "easeOut",
      className,
      once = true,
      formatFn,
    },
    ref,
  ) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once });
    const [count, setCount] = useState(from);

    useEffect(() => {
      if (!isInView) return;

      const startTime = Date.now() + delay * 1000;
      const endTime = startTime + duration * 1000;

      const bezier = easingFunctions[easing] || easingFunctions.linear;
      const cubicBezier = (t) => {
        const [x1 = 0, y1 = 0, x2 = 1, y2 = 1] = bezier;
        const cx = 3 * x1;
        const bx = 3 * (x2 - x1) - cx;
        const ax = 1 - cx - bx;
        const cy = 3 * y1;
        const by = 3 * (y2 - y1) - cy;
        const ay = 1 - cy - by;

        const sampleCurveX = (u) => ((ax * u + bx) * u + cx) * u;
        const sampleCurveY = (u) => ((ay * u + by) * u + cy) * u;

        let x = t;
        for (let i = 0; i < 8; i++) {
          const currentX = sampleCurveX(x) - t;
          if (Math.abs(currentX) < 0.0001) break;
          const dx = (3 * ax * x + 2 * bx) * x + cx;
          if (Math.abs(dx) < 0.0001) break;
          x -= currentX / dx;
        }
        return sampleCurveY(x);
      };

      let animationFrame;

      const animate = () => {
        const now = Date.now();
        if (now < startTime) {
          animationFrame = requestAnimationFrame(animate);
          return;
        }
        if (now >= endTime) {
          setCount(value);
          return;
        }
        const progress = (now - startTime) / (endTime - startTime);
        setCount(from + (value - from) * cubicBezier(progress));
        animationFrame = requestAnimationFrame(animate);
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [isInView, value, from, duration, delay, easing]);

    const formatted = formatFn
      ? formatFn(count)
      : formatNumber(count, decimals, separator, decimalSeparator);

    return (
      <span ref={containerRef} className={cn("tabular-nums", className)}>
        {prefix}
        <span ref={ref}>{formatted}</span>
        {suffix}
      </span>
    );
  },
);

NumberCounter.displayName = "NumberCounter";

export { NumberCounter };
