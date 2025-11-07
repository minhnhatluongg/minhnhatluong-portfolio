/**
 * ProjectCard Component
 * 
 * Component để hiển thị thông tin một project
 * Props:
 *   - title: Tên project (string)
 *   - description: Mô tả project (string)
 *   - technologies: Array các technology được sử dụng (array of strings)
 *   - githubLink: Link đến GitHub repo (string)
 *   - liveLink: Link đến live demo (string, optional)
 * 
 * Học được từ component này:
 *   - Cách truyền và sử dụng nhiều props phức tạp
 *   - Map qua array để render nhiều elements
 *   - Conditional rendering với &&
 *   - External links với target="_blank" và rel="noopener noreferrer"
 */

import { SkillBadge } from "./SkillBadge";

export const ProjectCard = ({ 
  title, 
  description, 
  technologies, 
  githubLink, 
  liveLink 
}) => {
  return (
    <div
      className="p-6 rounded-xl border border-white/10 
        backdrop-blur-sm bg-white/5
        hover:-translate-y-2 hover:border-blue-500/30 
        hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] 
        transition-all duration-300 group"
    >
      {/* Project Title */}
      <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      {/* Project Description */}
      <p className="text-gray-400 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Technologies Used */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <SkillBadge key={index} skill={tech} />
        ))}
      </div>

      {/* Links Section */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
        {/* GitHub Link */}
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 
            transition-colors duration-200 group/link"
        >
          <svg
            className="w-5 h-5 group-hover/link:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>GitHub</span>
        </a>

        {/* Live Demo Link (Optional) */}
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 
              transition-colors duration-200 group/link"
          >
            <svg
              className="w-5 h-5 group-hover/link:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};

