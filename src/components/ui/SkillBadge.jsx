/**
 * SkillBadge Component
 * 
 * Component đơn giản để hiển thị một skill/technology badge
 * Props:
 *   - skill: Tên của skill (string)
 * 
 * Học được từ component này:
 *   - Cách tạo component tái sử dụng
 *   - Cách sử dụng props
 *   - Tailwind CSS cho styling
 *   - Hover effects và transitions
 */

export const SkillBadge = ({ skill }) => {
  return (
    <span
      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm
        hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] 
        transition-all duration-300 cursor-default inline-block"
    >
      {skill}
    </span>
  );
};

