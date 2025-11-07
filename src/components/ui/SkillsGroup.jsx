/**
 * SkillsGroup Component
 * 
 * Component để hiển thị một nhóm skills (Frontend hoặc Backend)
 * Props:
 *   - title: Tiêu đề nhóm (string)
 *   - skills: Array các skills (array of strings)
 * 
 * Học được từ component này:
 *   - Component composition (sử dụng component khác bên trong)
 *   - Props drilling
 *   - Flex layout với Tailwind
 */

import { SkillBadge } from "./SkillBadge";
import { Card } from "./Card";

export const SkillsGroup = ({ title, skills }) => {
  return (
    <Card className="group">
      <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <SkillBadge key={index} skill={skill} />
        ))}
      </div>
    </Card>
  );
};

