/**
 * Button Component
 * 
 * Component button tái sử dụng với 2 variants: primary và outline
 * Props:
 *   - children: Nội dung button
 *   - href: Link đích (optional)
 *   - variant: "primary" hoặc "outline" (default: "primary")
 *   - onClick: Hàm xử lý click event (optional)
 *   - className: Class CSS tùy chỉnh thêm (optional)
 * 
 * Học được từ component này:
 *   - Conditional rendering với variant
 *   - Template literals để kết hợp classes
 *   - Component có thể render thành <a> hoặc <button>
 */

export const Button = ({ 
  children, 
  href, 
  variant = "primary", 
  onClick,
  className = "" 
}) => {
  const baseStyles = "py-3 px-6 rounded-lg font-medium transition-all duration-300 inline-block";
  
  const variantStyles = {
    primary: `bg-blue-500 text-white 
      hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
      active:translate-y-0`,
    outline: `border border-blue-500/50 text-blue-500 
      hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] 
      hover:bg-blue-500/10 active:translate-y-0`
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // Nếu có href, render thành <a> tag
  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    );
  }

  // Nếu không, render thành <button> tag
  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
};

