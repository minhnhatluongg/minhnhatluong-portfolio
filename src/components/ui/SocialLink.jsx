/**
 * SocialLink Component - ⭐ Dễ
 * 
 * Component hiển thị một social media link với icon và hover effect
 * 
 * Props:
 *   - href: URL của social link
 *   - icon: SVG icon (React element)
 *   - label: Tên của social network (cho accessibility)
 *   - bgColor: Màu background khi hover (optional)
 *   - showLabel: Hiển thị text label (default: true)
 * 
 * Học được:
 *   - External links best practices
 *   - Accessibility với aria-label
 *   - Custom hover colors
 *   - SVG icons trong React
 *   - Flexbox layout
 */

export const SocialLink = ({ 
  href, 
  icon, 
  label, 
  bgColor = "hover:bg-blue-500/20",
  showLabel = true 
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`
        p-4 rounded-xl 
        border border-white/10 
        backdrop-blur-sm bg-white/5
        transition-all duration-300
        hover:-translate-y-1 hover:border-blue-500/50
        hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)]
        ${bgColor}
        group
        flex flex-col items-center gap-2
      `}
    >
      {/* Icon */}
      <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
        {icon}
      </div>
      
      {/* Label Text */}
      {showLabel && (
        <span className="text-sm font-medium text-gray-400 group-hover:text-blue-400 transition-colors">
          {label}
        </span>
      )}
    </a>
  );
};

