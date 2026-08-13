/**
 * ====================================================================
 * ProjectsSection - "Featured Projects" trong style liquid glass
 * ====================================================================
 *
 * - Du lieu projects tu portfolio cu (giu nguyen noi dung + links)
 * - Cards: liquid-glass rounded-3xl, whileInView (once) stagger nhe
 * - Tech pills bg-white/[0.06], links GitHub / Live Demo o footer card
 * - Live link "#" (chua co demo) -> khong render
 *
 * ====================================================================
 */

import { useRef } from "react";
import { motion as Motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../icons";

const PROJECTS = [
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
    technologies: ["C#", ".NET", "SQL Server", "Docker", "CQRS", "MediatR"],
    githubLink: "https://github.com/minhnhatluongg/E-LaptopShop",
  },
  {
    title: "API ERP System",
    description:
      "The Enterprise Resource Planning (ERP) system is built on Clean Architecture. The API focuses on high performance, managing digital signature processes, and integrating consistent data across departments.",
    technologies: ["C#", ".NET", "Docker", "MySQL", "Entity Framework"],
    githubLink: "https://github.com/minhnhatluongg/api-erp-reCode",
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
    description: "Practice to code with Reactjs.",
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

const isExternal = (href) => href.startsWith("http");

export const ProjectsSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      {/* Radial gradient nhe */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header row - giong ServicesSection */}
        <Motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between md:mb-16"
        >
          <h2 className="text-3xl tracking-tight text-white md:text-5xl">
            Featured{" "}
            <span className="font-instrument italic text-white/60">
              projects
            </span>
          </h2>
          <p className="hidden text-sm text-white/40 md:block">
            Selected work
          </p>
        </Motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {PROJECTS.map((project, i) => (
            <Motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.15 }}
              className="liquid-glass group flex flex-col rounded-3xl p-6 md:p-8"
            >
              {/* Title row */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="text-xl tracking-tight text-white md:text-2xl">
                  {project.title}
                </h3>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="liquid-glass shrink-0 rounded-full p-2 text-white/70 transition-colors hover:text-white"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* Description */}
              <p className="mb-6 text-sm leading-relaxed text-white/50">
                {project.description}
              </p>

              {/* Tech pills */}
              <div className="mb-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-auto flex items-center gap-6 border-t border-white/10 pt-5">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <GithubIcon size={16} />
                  GitHub
                </a>
                {project.liveLink && project.liveLink !== "#" && (
                  <a
                    href={project.liveLink}
                    target={isExternal(project.liveLink) ? "_blank" : undefined}
                    rel={
                      isExternal(project.liveLink)
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <ArrowUpRight size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
