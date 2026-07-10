/**
 * AnimatedTooltip - Joly UI (https://jolyui.dev/docs/components/feedback/animated-tooltip)
 *
 * Tooltip với animation (fade/scale/slide/spring), tự tính vị trí và
 * giữ trong viewport. Theme chỉnh sang glass tối cho khớp portfolio.
 * Chỉ port core AnimatedTooltip (bỏ các biến thể Rich/Confirm/Status...).
 */
import { AnimatePresence, motion as Motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";

export function AnimatedTooltip({
  children,
  content,
  placement = "top",
  animation = "fade",
  delay = 0,
  duration = 0.15,
  className,
  contentClassName,
  arrow = true,
  offset = 8,
  disabled = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let x = 0;
    let y = 0;

    switch (placement) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "top-start":
        x = triggerRect.left;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "top-end":
        x = triggerRect.right - tooltipRect.width;
        y = triggerRect.top - tooltipRect.height - offset;
        break;
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + offset;
        break;
      case "bottom-start":
        x = triggerRect.left;
        y = triggerRect.bottom + offset;
        break;
      case "bottom-end":
        x = triggerRect.right - tooltipRect.width;
        y = triggerRect.bottom + offset;
        break;
      case "left":
        x = triggerRect.left - tooltipRect.width - offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case "right":
        x = triggerRect.right + offset;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8));

    setPosition({ x, y });
  }, [placement, offset]);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener("scroll", calculatePosition);
      window.addEventListener("resize", calculatePosition);
    }
    return () => {
      window.removeEventListener("scroll", calculatePosition);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [isVisible, calculatePosition]);

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const getAnimationVariants = () => {
    const baseDirection = placement.split("-")[0];

    switch (animation) {
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case "slide": {
        const slideOffset = 10;
        const slideVariants = {
          top: {
            hidden: { opacity: 0, y: slideOffset },
            visible: { opacity: 1, y: 0 },
          },
          bottom: {
            hidden: { opacity: 0, y: -slideOffset },
            visible: { opacity: 1, y: 0 },
          },
          left: {
            hidden: { opacity: 0, x: slideOffset },
            visible: { opacity: 1, x: 0 },
          },
          right: {
            hidden: { opacity: 0, x: -slideOffset },
            visible: { opacity: 1, x: 0 },
          },
        };
        return slideVariants[baseDirection] || slideVariants.top;
      }
      case "spring":
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const getArrowPosition = () => {
    const baseDirection = placement.split("-")[0];
    const alignment = placement.split("-")[1];

    const arrowClasses = {
      top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-800 border-x-transparent border-b-transparent",
      bottom:
        "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-800 border-x-transparent border-t-transparent",
      left: "right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-gray-800 border-y-transparent border-r-transparent",
      right:
        "left-0 top-1/2 -translate-y-1/2 -translate-x-full border-r-gray-800 border-y-transparent border-l-transparent",
    };

    let alignmentClass = "";
    if (alignment === "start") {
      alignmentClass =
        baseDirection === "top" || baseDirection === "bottom"
          ? "left-4 -translate-x-0"
          : "";
    } else if (alignment === "end") {
      alignmentClass =
        baseDirection === "top" || baseDirection === "bottom"
          ? "left-auto right-4 translate-x-0"
          : "";
    }

    return cn(arrowClasses[baseDirection], alignmentClass);
  };

  return (
    <>
      <span
        ref={triggerRef}
        className={cn("inline-block", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {children}
      </span>

      <AnimatePresence>
        {isVisible && (
          <Motion.div
            ref={tooltipRef}
            className={cn(
              "fixed z-50 max-w-xs rounded-md border border-white/10 bg-gray-800 px-3 py-1.5 text-gray-100 text-sm shadow-lg",
              contentClassName,
            )}
            style={{ left: position.x, top: position.y }}
            variants={getAnimationVariants()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={
              animation === "spring"
                ? { type: "spring", stiffness: 500, damping: 25 }
                : { duration }
            }
          >
            {content}
            {arrow && (
              <div
                className={cn("absolute h-0 w-0 border-4", getArrowPosition())}
              />
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
