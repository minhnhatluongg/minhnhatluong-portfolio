/**
 * InfoCard Component
 * 
 * Component để hiển thị thông tin Education hoặc Work Experience
 * Props:
 *   - icon: Icon emoji (string)
 *   - title: Tiêu đề card (string)
 *   - children: Nội dung bên trong card (React nodes)
 * 
 * Học được từ component này:
 *   - Cách sử dụng children để render complex content
 *   - Icon + Text layout
 *   - Flexible component design
 */

import { Card } from "./Card";

export const InfoCard = ({ icon, title, children }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      <div className="text-gray-300 space-y-2">
        {children}
      </div>
    </Card>
  );
};

