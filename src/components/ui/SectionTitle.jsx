/**
 * SectionTitle Component
 *
 * Component để hiển thị tiêu đề của mỗi section
 * Props:
 *   - children: Nội dung tiêu đề (text)
 *   - className: Class CSS tùy chỉnh thêm (optional)
 *
 * Học được từ component này:
 *   - Cách sử dụng children prop
 *   - Gradient text effect với Tailwind
 *   - Optional props với default values
 */

export const SectionTitle = ({ children, className = "" }) => {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold mb-8 
        bg-gradient-to-r from-blue-500 to-cyan-400 
        bg-clip-text text-transparent text-center
        animate-fade-in
        ${className}`}
    >
      {children}
    </h2>
  );
};
