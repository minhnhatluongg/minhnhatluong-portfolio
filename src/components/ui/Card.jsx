/**
 * Card Component
 * 
 * Component card tái sử dụng với hover effects
 * Props:
 *   - children: Nội dung của card
 *   - className: Class CSS tùy chỉnh thêm (optional)
 *   - hoverEffect: Bật/tắt hover effect (default: true)
 * 
 * Học được từ component này:
 *   - Wrapper components
 *   - Conditional classes
 *   - Glass morphism effect
 */

export const Card = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`
        p-6 rounded-xl border border-white/10 
        backdrop-blur-sm bg-white/5
        transition-all duration-300
        ${hoverEffect ? "hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

