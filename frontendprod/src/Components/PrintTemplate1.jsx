import React from "react";
import {
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaLaptop,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const PrintTemplate1 = ({
  form,
  education,
  workExperience,
  projects,
  certifications,
  skills,
  languages,
}) => {
  return (
    <>
      <style>{`
        /* Reset everything for printing */
        @media print {
          @page {
            size: A4;
            margin: 0.5in;
          }
          
          /* Hide absolutely everything except the resume */
          body * {
            visibility: hidden;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Only show the resume content */
          .print-resume-container,
          .print-resume-container * {
            visibility: visible;
          }
          
          /* Position the resume properly */
          .print-resume-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
          
          .print-resume-content {
            background: white !important;
            color: black !important;
            margin: 0 auto !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          /* Hide all navigation and header elements */
          nav, header, footer, .navbar, .header, .breadcrumb, 
          .navigation, .btn, .button, [role="navigation"],
          [class*="nav"], [class*="header"], [class*="menu"],
          .no-print, .print-button, .page-header {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Ensure links are black in print */
          a, a * {
            color: black !important;
            text-decoration: none !important;
          }
          
          /* Remove any backgrounds */
          * {
            background: transparent !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }

        /* Screen styles */
        @media screen {
          .print-resume-container {
            max-width: 8.5in;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 8px;
          }
          
          .print-button {
            display: block;
            margin: 20px auto;
          }
        }
        
        /* Hide print button when printing */
        @media print {
          .print-button {
            display: none !important;
          }
        }
      `}</style>

      <div className="print-resume-container">
        {/* Print Button - Only visible on screen */}
        <div className="print-button no-print text-center mb-6">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Download PDF
          </button>
        </div>

        <div className="print-resume-content p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black mb-3">{form.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {form.phone && (
                <div className="flex items-center gap-1">
                  <FaPhone className="text-gray-600" />
                  <span className="text-black">{form.phone}</span>
                </div>
              )}
              {form.email && (
                <div className="flex items-center gap-1">
                  <IoMdMail className="text-gray-600" />
                  <span className="text-black">{form.email}</span>
                </div>
              )}
              {form.linkedin && (
                <div className="flex items-center gap-1">
                  <FaLinkedin className="text-gray-600" />
                  <span className="text-black">LinkedIn</span>
                </div>
              )}
              {form.github && (
                <div className="flex items-center gap-1">
                  <FaGithub className="text-gray-600" />
                  <span className="text-black">GitHub</span>
                </div>
              )}
              {form.leetcode && (
                <div className="flex items-center gap-1">
                  <FaCode className="text-gray-600" />
                  <span className="text-black">LeetCode</span>
                </div>
              )}
              {form.portfolio && (
                <div className="flex items-center gap-1">
                  <FaLaptop className="text-gray-600" />
                  <span className="text-black">Portfolio</span>
                </div>
              )}
            </div>
          </div>

          {/* About Me Section */}
          {form.summary && (
            <div className="mb-6">
              <div className="border-b-2 border-gray-300 mb-3"></div>
              <h2 className="text-lg font-bold text-black mb-2">About Me</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {form.summary}
              </p>
            </div>
          )}

          {/* Education Section */}
          {education && education[0]?.degree && (
            <div className="mb-6">
              <div className="border-b-2 border-gray-300 mb-3"></div>
              <h2 className="text-lg font-bold text-black mb-2">Education</h2>
              <ul className="space-y-3">
                {education.map((edu, index) => (
                  <li key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-black text-sm">
                          {edu.degree}
                        </h3>
                        <p className="text-xs text-gray-600">
                          {edu.institution}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 text-right">
                        {edu.startYear} - {edu.endYear}
                      </p>
                    </div>
                    {edu.grade && (
                      <p className="text-xs text-gray-700">
                        Grade: {edu.grade}
                      </p>
                    )}
                    {edu.description && (
                      <p className="text-xs text-gray-700 mt-1">
                        {edu.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Work Experience Section */}
          {workExperience && workExperience[0]?.jobTitle && (
            <div className="mb-6">
              <div className="border-b-2 border-gray-300 mb-3"></div>
              <h2 className="text-lg font-bold text-black mb-2">
                Work Experience
              </h2>
              <ul className="space-y-3">
                {workExperience.map((work, index) => (
                  <li key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-black text-sm">
                          {work.jobTitle}
                        </h3>
                        <p className="text-xs text-gray-600">{work.company}</p>
                      </div>
                      <p className="text-xs text-gray-600">
                        {work.startYear} - {work.endYear}
                      </p>
                    </div>
                    {work.description && (
                      <p className="text-xs text-gray-700 mt-1">
                        {work.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Projects Section */}
          {projects && projects[0]?.name && (
            <div className="mb-6">
              <div className="border-b-2 border-gray-300 mb-3"></div>
              <h2 className="text-lg font-bold text-black mb-2">Projects</h2>
              <ul className="space-y-3">
                {projects.map((project, index) => (
                  <li key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-black text-sm">
                            {project.name}
                          </h3>
                          {project.link && (
                            <FaExternalLinkAlt className="text-xs text-gray-600" />
                          )}
                        </div>
                        {project.stack && (
                          <p className="text-xs text-gray-600 italic">
                            {project.stack}
                          </p>
                        )}
                      </div>
                    </div>
                    {project.description && (
                      <p className="text-xs text-gray-700 mt-1">
                        {project.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications Section */}
          {certifications && certifications[0]?.name && (
            <div className="mb-6">
              <div className="border-b-2 border-gray-300 mb-3"></div>
              <h2 className="text-lg font-bold text-black mb-2">
                Certifications
              </h2>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li key={index}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-black text-sm">
                          {cert.name}
                        </h3>
                        <span className="text-xs  text-gray-600">
                          by {cert.issuer}
                        </span>
                        {cert.link && (
                          <FaExternalLinkAlt className="text-xs text-gray-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{cert.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Section */}
          {skills && skills[0] && (
            <div className="mb-6">
              <div className="border-b-2 border-gray-300 mb-3"></div>
              <h2 className="text-lg font-bold text-black mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 text-black py-1 bg-gray-100 text-xs font-medium rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {languages && languages[0] && (
            <div className="mb-6">
              <div className="border-b-2 text-black border-gray-300 mb-3"></div>
              <h2 className="text-lg font-bold text-black mb-2">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-black bg-gray-100 text-xs font-medium rounded"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PrintTemplate1;
