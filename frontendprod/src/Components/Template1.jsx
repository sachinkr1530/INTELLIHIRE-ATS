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

const Template1 = ({
  form,
  education,
  workExperience,
  projects,
  certifications,
  skills,
  languages,
}) => {
  return (
    <div className="h-full w-full bg-gray-100 p-4">
      <div className="max-w-full mx-auto h-full">
        <div className="printable-content bg-white overflow-y-auto shadow-lg w-full h-full p-6 mx-auto text-sm">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-black mb-2">{form.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              {form.phone && (
                <div className="flex items-center gap-2">
                  <FaPhone className="text-gray-600" />
                  <span className="text-black">{form.phone}</span>
                </div>
              )}
              {form.email && (
                <div className="flex items-center gap-2">
                  <IoMdMail className="text-gray-600" />
                  <span className="text-black">{form.email}</span>
                </div>
              )}
              {form.linkedin && (
                <a
                  href={form.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
              )}
              {form.github && (
                <a
                  href={form.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
              {form.leetcode && (
                <a
                  href={form.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <FaCode />
                  <span>LeetCode</span>
                </a>
              )}
              {form.portfolio && (
                <a
                  href={form.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <FaLaptop />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          {/* About Me Section */}
          {form.summary && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
                About Me
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed">
                {form.summary}
              </p>
            </div>
          )}

          {/* Work Experience Section */}
          {workExperience && workExperience[0]?.jobTitle && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
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
                      <p className="text-xs text-gray-600 text-right">
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
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
                Projects
              </h2>
              <ul className="space-y-3">
                {projects.map((project, index) => (
                  <li key={index}>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-black text-sm">
                        {project.name}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      )}
                    </div>
                    {project.stack && (
                      <p className="text-xs text-gray-600 italic">
                        {project.stack}
                      </p>
                    )}
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

          {/* Education Section */}
          {education && education[0]?.degree && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
                Education
              </h2>
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
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills Section */}
          {skills && skills[0] && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-black text-xs font-medium rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {certifications && certifications[0]?.name && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
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
                        <span className="text-xs text-gray-600">
                          by {cert.issuer}
                        </span>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{cert.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages Section */}
          {languages && languages[0] && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-black text-xs font-medium rounded"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Template1;
