import React, { useState } from "react";

// --- SVG Icons ---
// I've replaced the external react-icons with inline SVGs to remove dependencies.

const PhoneIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const CodeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const LaptopIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.7 20H3.3a1 1 0 0 1-.58-1.45L4 16"></path>
  </svg>
);

const ExternalLinkIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const MapMarkerIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

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
                  <PhoneIcon className="text-gray-600" />
                  <span className="text-black">{form.phone}</span>
                </div>
              )}
              {form.email && (
                <div className="flex items-center gap-2">
                  <MailIcon className="text-gray-600" />
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
                  <LinkedinIcon />
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
                  <GithubIcon />
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
                  <CodeIcon />
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
                  <LaptopIcon />
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
                          <ExternalLinkIcon className="text-xs" />
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
                            <ExternalLinkIcon className="text-xs" />
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

const Template2 = ({
  form,
  education,
  workExperience,
  projects,
  certifications,
  skills,
  languages,
}) => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-full mx-auto h-full">
        <div className="printable-content bg-white overflow-y-auto shadow-xl rounded-lg w-full h-full p-3 mx-auto text-xs border border-gray-200">
          {/* Header with gradient background */}
          <div className=" bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-3 -m-3 mb-3">
            <h1 className="text-lg font-bold mb-1">{form.name}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-90">
              {form.location && (
                <div className="flex items-center gap-1.5">
                  <MapMarkerIcon />
                  <span>{form.location}</span>
                </div>
              )}
              {form.phone && (
                <div className="flex items-center gap-1.5">
                  <PhoneIcon />
                  <span>{form.phone}</span>
                </div>
              )}
              {form.email && (
                <div className="flex items-center gap-1.5">
                  <MailIcon />
                  <span>{form.email}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-90 mt-2 border-t border-white/20 pt-2">
              {form.linkedin && (
                <a
                  href={form.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                </a>
              )}
              {form.github && (
                <a
                  href={form.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                >
                  <GithubIcon />
                  <span>GitHub</span>
                </a>
              )}
              {form.portfolio && (
                <a
                  href={form.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                >
                  <LaptopIcon />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          {/* About Me Section */}
          {form.summary && (
            <div className="mb-3">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
                Professional Summary
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed bg-blue-50/50 p-2 rounded">
                {form.summary}
              </p>
            </div>
          )}

          {/* Work Experience Section */}
          {workExperience && workExperience[0]?.jobTitle && (
            <div className="mb-3">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
                Experience
              </h2>
              <div className="space-y-2">
                {workExperience.map((work, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-2 rounded border-l-2 border-blue-400"
                  >
                    {" "}
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h3 className="font-semibold text-black text-xs">
                          {work.jobTitle}
                        </h3>
                        <p className="text-xs text-blue-600 font-medium">
                          {work.company}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 bg-white px-1 py-0.5 rounded text-right ml-1">
                        {work.startYear} - {work.endYear}
                      </span>
                    </div>
                    {work.description && (
                      <p className="text-xs text-gray-700 leading-tight">
                        {work.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {projects && projects[0]?.name && (
            <div className="mb-3">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>Featured
                Projects
              </h2>
              <div className="space-y-2">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-indigo-50/50 p-2 rounded border border-indigo-200"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="font-semibold text-black text-xs">
                        {project.name}
                      </h3>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <ExternalLinkIcon className="text-xs" />
                        </a>
                      )}
                    </div>
                    {project.stack && (
                      <p className="text-xs text-indigo-600 font-medium mb-1">
                        {project.stack}
                      </p>
                    )}
                    {project.description && (
                      <p className="text-xs text-gray-700 leading-tight">
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education && education[0]?.degree && (
            <div className="mb-3">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-green-50/50 p-2 rounded border-l-2 border-green-400"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h3 className="font-semibold text-black text-xs">
                          {edu.degree}
                        </h3>
                        <p className="text-xs text-green-600 font-medium">
                          {edu.institution}
                        </p>
                        {edu.grade && (
                          <p className="text-xs text-gray-700">{edu.grade}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 bg-white px-1 py-0.5 rounded">
                        {edu.startYear} - {edu.endYear}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-xs text-gray-700 leading-tight">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {skills && skills[0] && (
            <div className="mb-3">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications Section */}
          {certifications && certifications[0]?.name && (
            <div className="mb-3">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
                Certifications
              </h2>
              <div className="space-y-1">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-yellow-50/50 p-2 rounded border border-yellow-200"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <h3 className="font-semibold text-black text-xs">
                          {cert.name}
                        </h3>
                        <span className="text-xs text-yellow-700">
                          • {cert.issuer}
                        </span>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <ExternalLinkIcon className="text-xs" />
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 bg-white px-1 py-0.5 rounded">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {languages && languages[0] && (
            <div className="mb-2">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
                Languages
              </h2>
              <div className="flex flex-wrap gap-1">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded border border-purple-200"
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

export default Template2;
