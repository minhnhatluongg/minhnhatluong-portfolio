/**
 * InfiniteRibbon - Joly UI (https://jolyui.dev/docs/components/text-animations/infinite-ribbon)
 *
 * Dải text chạy vô hạn (marquee). Dùng cho skills ribbon.
 * Theme mặc định chỉnh sang glass tối cho khớp portfolio.
 */
import { cn } from "../../../lib/utils";

const ribbonAnimationStyles = `
@keyframes joly-infinite-ribbon {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes joly-infinite-ribbon-reverse {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .joly-infinite-ribbon-track {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;

export function InfiniteRibbon({
  repeat = 5,
  duration = 10,
  reverse = false,
  rotation = 0,
  children,
  className,
}) {
  const repeatCount = Math.max(1, Math.floor(repeat));
  const animationName = reverse
    ? "joly-infinite-ribbon-reverse"
    : "joly-infinite-ribbon";

  return (
    <div
      className={cn(
        "w-full max-w-full overflow-hidden border-y border-white/10 bg-white/5 py-2 text-gray-300 text-sm backdrop-blur-sm",
        className,
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <span className="sr-only">{children}</span>
      <div
        aria-hidden="true"
        className="joly-infinite-ribbon-track flex w-max whitespace-nowrap"
        style={{
          animation: `${animationName} ${Math.max(0.1, duration)}s linear infinite`,
        }}
      >
        {Array.from({ length: repeatCount * 2 }, (_, index) => (
          <span className="mr-8 inline-block select-none" key={index}>
            {children}
          </span>
        ))}
      </div>
      <style>{ribbonAnimationStyles}</style>
    </div>
  );
}
