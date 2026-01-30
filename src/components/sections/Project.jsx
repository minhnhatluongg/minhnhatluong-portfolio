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
      technologies: ["C#", ".NET", "SQL Server", "Docker", "CQRS", "Repository", "MediatR"],
      githubLink: "https://github.com/minhnhatluongg/E-LaptopShop",
      // liveLink: "https://demo-link.com" // Uncomment nếu có live demo
    },
    {
      title: "API ERP System",
      description:
        "The Enterprise Resource Planning (ERP) system is built on Clean Architecture. The API focuses on high performance, managing digital signature processes, and integrating consistent data across departments."
      ,
      technologies: ["C#", ".NET", "Docker", "MySQL", "Entity Framework"],
      githubLink: "https://github.com/minhnhatluongg/api-erp-reCode",
      liveLink: "#",
    },
    {
      title: "Tool Sale",
      description:
        "A comprehensive sales management solution that supports invoice processing and real-time data synchronization. The system features optimized user interface (UI/UX) with React and Tailwind CSS, accelerating sales transaction processing.",
      technologies: ["React", "Tailwind", "React Hot Toast"],
      githubLink: "https://github.com/minhnhatluongg/demo-tool-sale",
      liveLink : "https://winsale.wininvoice.vn/login",
    },
    {
      title: "90 Coffe Shop",
      description:
        "Practice to code with Reactjs",
      technologies: ["React", "Chart.js"],
      githubLink: "https://github.com/minhnhatluongg/90-store-coffe",
      liveLink: "https://90-store-coffe.vercel.app/",
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
