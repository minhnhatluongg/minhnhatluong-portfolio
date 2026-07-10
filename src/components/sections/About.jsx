/**
 * ====================================================================
 * About Section - Parallax voi Staggered Reveal
 * ====================================================================
 *
 * PARALLAX EFFECTS:
 *   1. Section title: parallax nhe (-20) -> tao depth cho heading
 *   2. Intro card: RevealOnScroll tu duoi len
 *   3. Skill groups: RevealOnScroll tu trai va phai (tao cam giac "gap nhau")
 *   4. Info cards: RevealOnScroll voi delay stagger (lan luot xuat hien)
 *   5. FloatingShapes: background decorations
 *
 * STAGGER TECHNIQUE:
 *   Thay vi tat ca element xuat hien CUNG LUC, chung xuat hien LIEN TIEP
 *   voi delay nho giua moi element (0.15s - 0.3s)
 *   -> Mat nguoi theo doi duoc tung element -> chuyen nghiep hon
 *
 * ====================================================================
 */

import { RevealOnScroll } from "../RevealOnScroll";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { SkillsGroup } from "../ui/SkillsGroup";
import { InfoCard } from "../ui/InfoCard";
import { HighlightText } from "../ui/joly";
import { FloatingShapes } from "../ParallaxLayer";
import { useParallax } from "../../hooks/useParallax";

export const About = () => {
  const frontEndSkills = ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "TypeScript"];
  const backEndSkills = ["Node.js", ".NET", "MongoDB", "SQL Server", "Docker", "Git", "Postman", "Redis"];

  // Title parallax - nhe thoi
  const titleRef = useParallax(-20);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
    >
      {/* Background decorations */}
      <FloatingShapes variant="about" />

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Title voi parallax nhe */}
        <div ref={titleRef} className="will-change-transform">
          <SectionTitle>About Me</SectionTitle>
        </div>

        {/* Intro Card - reveal tu duoi len */}
        <RevealOnScroll direction="up" distance={40}>
          <Card className="mb-8" hoverEffect={false}>
            <p className="text-gray-300 leading-relaxed text-lg">
              Passionate full-stack developer with a knack for creating{" "}
              <HighlightText variant="underline" color="#38bdf8" animationDelay={0.3}>
                efficient and scalable
              </HighlightText>{" "}
              web applications. Skilled in JavaScript, React, Node.js, and
              database management. Committed to{" "}
              <HighlightText variant="marker" color="#8b5cf6" animationDelay={0.8}>
                continuous learning
              </HighlightText>{" "}
              and staying updated with the latest industry trends to deliver{" "}
              <HighlightText variant="circle" color="#34d399" animationDelay={1.3}>
                cutting-edge
              </HighlightText>{" "}
              solutions.
            </p>
          </Card>
        </RevealOnScroll>

        {/* Skills - reveal tu 2 phia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Frontend tu ben trai */}
          <RevealOnScroll direction="left" distance={50} delay={0}>
            <SkillsGroup title="Frontend" skills={frontEndSkills} />
          </RevealOnScroll>

          {/* Backend tu ben phai */}
          <RevealOnScroll direction="right" distance={50} delay={0.15}>
            <SkillsGroup title="Backend" skills={backEndSkills} />
          </RevealOnScroll>
        </div>

        {/* Education & Work - staggered reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealOnScroll direction="up" distance={40} delay={0}>
            <InfoCard icon="🏫" title="Education">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-400">Software Engineering</h4>
                  <p className="text-gray-300">Ho Chi Minh City University of Technology and Education</p>
                </div>
                <div className="text-sm text-gray-400">
                  <strong>Specialization:</strong> Full-stack Web Development, Data Structures & Algorithms, and Database Management Systems.
                </div>
              </div>
            </InfoCard>
          </RevealOnScroll>

          <RevealOnScroll direction="up" distance={40} delay={0.2}>
            <InfoCard icon="💼" title="Work Experience">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-400">Software Engineer | WinGroup</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">July 2025</p>
                  <p className="text-gray-300 leading-relaxed">
                    Contributed to the **internal ERP ecosystem** by developing robust APIs and web utilities.
                    Collaborated closely with the Odoo team to streamline business workflows and ensure seamless data integration across departments.
                  </p>
                </div>
              </div>
            </InfoCard>
          </RevealOnScroll>

          <RevealOnScroll direction="up" distance={40} delay={0.4}>
            <InfoCard icon="🚀" title="Current Role">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-400">Software Engineer | WINTECH</h4>
                  <p className="text-xs text-blue-500/70 uppercase tracking-wider mb-2">Jan 2026 - Present</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                    <li>Architecting and optimizing **high-performance APIs** for invoice lookup and financial services.</li>
                    <li>Designing complex **SQL stored procedures and triggers** to ensure data integrity and system speed.</li>
                    <li>Maintaining and scaling the **Core ERP System**, focusing on automation and internal tool efficiency.</li>
                  </ul>
                </div>
              </div>
            </InfoCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
