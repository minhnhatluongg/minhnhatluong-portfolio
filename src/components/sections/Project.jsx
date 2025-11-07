/**
 * Projects Section Component
 *
 * Component hiển thị danh sách các projects
 *
 * Học được từ component này:
 *   - Cách tổ chức data trong array of objects
 *   - Map qua array để render nhiều components
 *   - Import và sử dụng các components con
 *   - Grid layout responsive với Tailwind
 */

import { RevealOnScroll } from "../RevealOnScroll";
import { SectionTitle } from "../ui/SectionTitle";
import { ProjectCard } from "../ui/ProjectCard";

export const Projects = () => {
  // Data cho các projects - dễ dàng thêm/sửa/xóa projects
  const projectsData = [
    {
      title: "Ecommerce-LaptopShop API",
      description:
        "Backend API for E-commerce Laptop Shop using Clean Architecture, CQRS pattern, MediatR, and Repository Pattern for scalable and maintainable code.",
      technologies: ["C#", ".NET", "SQL Server", "Docker", "Swagger"],
      githubLink: "https://github.com/minhnhatluongg/E-LaptopShop",
      // liveLink: "https://demo-link.com" // Uncomment nếu có live demo
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio website built with React and Tailwind CSS. Features smooth animations, responsive design, and modern UI components.",
      technologies: ["React", "Tailwind CSS", "Vite", "JavaScript"],
      githubLink: "https://github.com/yourusername/portfolio",
      liveLink: "https://yourportfolio.com",
    },
    {
      title: "Task Management App",
      description:
        "Full-stack task management application with user authentication, real-time updates, and drag-and-drop functionality.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      githubLink: "https://github.com/yourusername/task-manager",
    },
    {
      title: "Weather Dashboard",
      description:
        "Weather forecast dashboard that displays current weather and 7-day forecast using OpenWeather API with beautiful data visualizations.",
      technologies: ["React", "Chart.js", "OpenWeather API", "CSS"],
      githubLink: "https://github.com/yourusername/weather-dashboard",
      liveLink: "https://weather-app-demo.com",
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex justify-center items-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle>Featured Projects</SectionTitle>

          {/* Grid layout cho projects - responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
