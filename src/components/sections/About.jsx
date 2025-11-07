/**
 * About Section Component
 * 
 * Component hiển thị thông tin About Me, Skills, Education và Work Experience
 * 
 * Học được từ component này:
 *   - Cách tổ chức code với nhiều sub-components
 *   - Separation of concerns (tách logic và UI)
 *   - Responsive grid layout
 *   - Component reusability
 */

import { RevealOnScroll } from "../RevealOnScroll";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { SkillsGroup } from "../ui/SkillsGroup";
import { InfoCard } from "../ui/InfoCard";

export const About = () => {
  // Data organization - dễ maintain và update
  const frontEndSkills = ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"];
  const backEndSkills = ["Node.js", ".NET", "MongoDB", "SQL Server", "Docker"];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle>About Me</SectionTitle>

          {/* Introduction Card */}
          <Card className="mb-8" hoverEffect={false}>
            <p className="text-gray-300 leading-relaxed text-lg">
              Passionate full-stack developer with a knack for creating
              efficient and scalable web applications. Skilled in JavaScript,
              React, Node.js, and database management. Committed to continuous
              learning and staying updated with the latest industry trends to
              deliver cutting-edge solutions.
            </p>
          </Card>

          {/* Skills Section - Sử dụng SkillsGroup component */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SkillsGroup title="Frontend" skills={frontEndSkills} />
            <SkillsGroup title="Backend" skills={backEndSkills} />
          </div>

          {/* Education & Work Experience - Sử dụng InfoCard component */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard icon="🏫" title="Education">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Software Engineer</strong> - HO CHI MINH CITY
                  UNIVERSITY OF TECHNICAL EDUCATION
                </li>
                <li>
                  <strong>Relevant Coursework:</strong> Web Development,
                  Artificial Intelligence, Data Structures
                </li>
              </ul>
            </InfoCard>

            <InfoCard icon="👩🏻‍💻" title="Work Experience">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-400">
                    Software Engineer at WinGroup
                  </h4>
                  <p className="text-sm text-gray-400 mb-1">
                    July 2025 - Present
                  </p>
                  <p>
                    Developed and maintained APIs, tools, and web applications.
                    Collaborated with Odoo team to create an ERP System for the
                    company.
                  </p>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
