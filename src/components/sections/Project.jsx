/**
 * ====================================================================
 * Projects Section - Stagger Parallax Cards
 * ====================================================================
 *
 * PARALLAX EFFECTS:
 *   1. Moi ProjectCard co GSAP ScrollTrigger rieng
 *   2. Cards xuat hien lan luot voi delay stagger (0, 0.15, 0.3, 0.45)
 *   3. Cards co nhe scale effect (0.95 -> 1) khi scroll vao
 *   4. FloatingShapes: geometric/tech-themed backgrounds
 *
 * STAGGER PATTERN:
 *   Card 1: delay 0.0s  ─── xuat hien
 *   Card 2: delay 0.15s ─────── xuat hien
 *   Card 3: delay 0.3s  ─────────── xuat hien
 *   Card 4: delay 0.45s ─────────────── xuat hien
 *
 *   Tao cam giac "cascade" / "waterfall" tu nhien
 *
 * SCALE TRICK:
 *   Tu 0.95 -> 1.0 (chi 5% zoom)
 *   Mat thuong KHONG nhan ra no dang zoom
 *   Nhung NAO nhan ra "co gi do dang den gan" -> cam giac depth
 *   -> Subtle nhung hieu qua
 *
 * ====================================================================
 */

import { RevealOnScroll } from "../RevealOnScroll";
import { SectionTitle } from "../ui/SectionTitle";
import { ProjectCard } from "../ui/ProjectCard";
import { FloatingShapes } from "../ParallaxLayer";
import { useParallax } from "../../hooks/useParallax";

export const Projects = () => {
  const projectsData = [
    {
      title: "Discord Music Bot",
      description:
        "A feature-rich Discord music bot with TypeScript and discord.js v14. Plays from YouTube/Spotify/SoundCloud, persistent coin economy on SQL Server, daily check-in streaks, smart /artist command. Interactive Spotify-themed commands reference page.",
      technologies: ["TypeScript", "discord.js v14", "SQL Server", "Node.js"],
      githubLink: "https://github.com/minhnhatluongg",
      liveLink: "#/commands-bot",
    },
    {
      title: "Ecommerce-LaptopShop API",
      description:
        "Backend API for E-commerce Laptop Shop using Clean Architecture, CQRS pattern, MediatR, and Repository Pattern for scalable and maintainable code.",
      technologies: ["C#", ".NET", "SQL Server", "Docker", "CQRS", "Repository", "MediatR"],
      githubLink: "https://github.com/minhnhatluongg/E-LaptopShop",
    },
    {
      title: "API ERP System",
      description:
        "The Enterprise Resource Planning (ERP) system is built on Clean Architecture. The API focuses on high performance, managing digital signature processes, and integrating consistent data across departments.",
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
      liveLink: "https://winsale.wininvoice.vn/login",
    },
    {
      title: "90 Coffe Shop",
      description: "Practice to code with Reactjs",
      technologies: ["React", "Chart.js"],
      githubLink: "https://github.com/minhnhatluongg/90-store-coffe",
      liveLink: "https://90-store-coffe.vercel.app/",
    },
    {
      title: "De-Captcha Service",
      description:
        "A self-hosted CAPTCHA solving service using a custom-trained CNN model (ResNet18) achieving ~95% accuracy. Built with FastAPI, it replaces paid third-party APIs for Vietnamese Tax Authority CAPTCHA recognition.",
      technologies: ["Python", "FastAPI", "PyTorch", "OpenCV", "CNN"],
      githubLink: "https://github.com/minhnhatluongg/decapcha",
    },
  ];

  // Title parallax
  const titleRef = useParallax(-20);

  return (
    <section
      id="projects"
      className="min-h-screen flex justify-center items-center py-20 relative overflow-hidden"
    >
      {/* Background decorations */}
      <FloatingShapes variant="projects" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Title voi parallax */}
        <div ref={titleRef} className="will-change-transform">
          <SectionTitle>Featured Projects</SectionTitle>
        </div>

        {/* Grid layout - moi card co delay stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <RevealOnScroll
              key={index}
              direction="up"
              distance={50}
              delay={index * 0.3}  // Stagger: 0, 0.15, 0.3, 0.45
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
