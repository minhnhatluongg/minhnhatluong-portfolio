/**
 * RainbowButton - Joly UI (https://jolyui.dev/docs/components/buttons/rainbow-button)
 *
 * Button với viền gradient cầu vồng xoay 360° liên tục.
 * Đã chuyển sang JSX + hỗ trợ render thành <a> khi có href
 * để dùng được cho anchor navigation (#projects, mailto:...).
 */
import { motion as Motion } from "motion/react";
import { forwardRef } from "react";
import { cn } from "../../../lib/utils";

const RainbowButton = forwardRef(
  (
    {
      children,
      colors = ["#f43f5e", "#8b5cf6", "#3b82f6", "#22c55e", "#f43f5e"],
      duration = 2,
      borderWidth = 2,
      animated = true,
      className,
      innerClassName,
      href,
      onClick,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const gradientColors = colors.join(", ");
    const Tag = href ? "a" : "button";

    return (
      <Tag
        ref={ref}
        {...(href ? { href } : { type, disabled })}
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        style={{ padding: borderWidth }}
        {...props}
      >
        {/* Vien gradient xoay */}
        <Motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(var(--gradient-angle, 0deg), ${gradientColors})`,
          }}
          animate={
            animated ? { "--gradient-angle": ["0deg", "360deg"] } : undefined
          }
          transition={
            animated
              ? { duration, repeat: Infinity, ease: "linear" }
              : undefined
          }
        />
        {/* Noi dung button */}
        <span
          className={cn(
            "relative z-10 flex items-center gap-2 rounded-md bg-[#0b0f19] px-6 py-2.5 font-medium text-sm text-white transition-colors hover:bg-[#0b0f19]/90",
            innerClassName,
          )}
          style={{ borderRadius: `calc(0.5rem - ${borderWidth}px)` }}
        >
          {children}
        </span>
      </Tag>
    );
  },
);
RainbowButton.displayName = "RainbowButton";

export { RainbowButton };
