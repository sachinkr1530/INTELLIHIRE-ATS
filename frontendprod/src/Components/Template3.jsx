import {
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaLaptop,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCogs,
  FaCertificate,
  FaGlobe,
  FaProjectDiagram,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Template3 = ({
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
        <div className="printable-content bg-white overflow-y-auto shadow-lg w-full h-full mx-auto text-xs flex">
          {/* Left Sidebar */}
          <div className="w-32 bg-slate-800 text-white p-2 flex flex-col">
            {/* Profile Section */}
            <div className="mb-3">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <FaUser className="text-2xl text-slate-300" />
              </div>
              <h1 className="text-sm font-bold text-center leading-tight">
                {form?.name}
              </h1>
            </div>

            {/* Contact Info */}
            {(form?.location || form?.phone || form?.email) && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
                  <IoMdMail className="mr-1" /> CONTACT
                </h3>
                <div className="space-y-1 text-xs">
                  {form?.location && (
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="mt-0.5 mr-1 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-200 leading-tight">
                        {form.location}
                      </span>
                    </div>
                  )}
                  {form?.phone && (
                    <div className="flex items-start">
                      <FaPhone className="mt-0.5 mr-1 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-200 leading-tight break-all">
                        {form.phone}
                      </span>
                    </div>
                  )}
                  {form?.email && (
                    <div className="flex items-start">
                      <IoMdMail className="mt-0.5 mr-1 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-200 leading-tight break-all">
                        {form.email}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Links */}
            {(form?.linkedin || form?.github || form?.portfolio) && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
                  <FaGlobe className="mr-1" /> LINKS
                </h3>
                <div className="space-y-1 text-xs">
                  {form?.linkedin && (
                    <a
                      href={form.linkedin}
                      className="flex items-center text-slate-200 hover:text-white"
                    >
                      <FaLinkedin className="mr-1 text-slate-400" />
                      <span className="truncate">LinkedIn</span>
                    </a>
                  )}
                  {form?.github && (
                    <a
                      href={form.github}
                      className="flex items-center text-slate-200 hover:text-white"
                    >
                      <FaGithub className="mr-1 text-slate-400" />
                      <span className="truncate">GitHub</span>
                    </a>
                  )}
                  {form?.portfolio && (
                    <a
                      href={form.portfolio}
                      className="flex items-center text-slate-200 hover:text-white"
                    >
                      <FaLaptop className="mr-1 text-slate-400" />
                      <span className="truncate">Portfolio</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills && skills[0] && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
                  <FaCogs className="mr-1" /> SKILLS
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-1 py-0.5 bg-slate-700 text-slate-200 text-xs rounded text-center leading-tight"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages && languages[0] && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
                  <FaGlobe className="mr-1" /> LANGUAGES
                </h3>
                <div className="space-y-1 text-xs">
                  {languages.map((lang, index) => (
                    <div key={index} className="text-slate-200 leading-tight">
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 p-3 overflow-y-auto">
            {/* Summary */}
            {form?.summary && (
              <div className="mb-3">
                <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
                  <FaUser className="mr-2 text-slate-600" />
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {form.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {workExperience && workExperience[0]?.jobTitle && (
              <div className="mb-3">
                <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
                  <FaBriefcase className="mr-2 text-slate-600" />
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-2">
                  {workExperience.map((work, index) => (
                    <div key={index} className="relative pl-3">
                      <div className="absolute left-0 top-1 w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 text-xs leading-tight">
                            {work.jobTitle}
                          </h3>
                          <p className="text-xs text-slate-600 font-medium">
                            {work.company}
                          </p>
                        </div>
                        <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                          {work.startYear} - {work.endYear}
                        </span>
                      </div>
                      {work.description && (
                        <p className="text-xs text-slate-700 leading-tight">
                          {work.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects[0]?.name && (
              <div className="mb-3">
                <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
                  <FaProjectDiagram className="mr-2 text-slate-600" />
                  KEY PROJECTS
                </h2>
                <div className="space-y-2">
                  {projects.map((project, index) => (
                    <div key={index} className="relative pl-3">
                      <div className="absolute left-0 top-1 w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="flex items-center gap-1 mb-1">
                        <h3 className="font-semibold text-slate-800 text-xs">
                          {project.name}
                        </h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-slate-800"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}
                      </div>
                      {project.stack && (
                        <p className="text-xs text-slate-600 font-medium mb-1">
                          {project.stack}
                        </p>
                      )}
                      {project.description && (
                        <p className="text-xs text-slate-700 leading-tight">
                          {project.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education[0]?.degree && (
              <div className="mb-3">
                <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
                  <FaGraduationCap className="mr-2 text-slate-600" />
                  EDUCATION
                </h2>
                <div className="space-y-2">
                  {education.map((edu, index) => (
                    <div key={index} className="relative pl-3">
                      <div className="absolute left-0 top-1 w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 text-xs leading-tight">
                            {edu.degree}
                          </h3>
                          <p className="text-xs text-slate-600 font-medium">
                            {edu.institution}
                          </p>
                          {edu.grade && (
                            <p className="text-xs text-slate-700">
                              {edu.grade}
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 ml-2 flex-shrink-0">
                          {edu.startYear} - {edu.endYear}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-xs text-slate-700 leading-tight">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications[0]?.name && (
              <div className="mb-2">
                <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
                  <FaCertificate className="mr-2 text-slate-600" />
                  CERTIFICATIONS
                </h2>
                <div className="space-y-1">
                  {certifications.map((cert, index) => (
                    <div key={index} className="relative pl-3">
                      <div className="absolute left-0 top-1 w-1 h-1 bg-slate-600 rounded-full"></div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 flex-1">
                          <h3 className="font-semibold text-slate-800 text-xs">
                            {cert.name}
                          </h3>
                          <span className="text-xs text-slate-600">
                            • {cert.issuer}
                          </span>
                          {cert.link && (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 hover:text-slate-800"
                            >
                              <FaExternalLinkAlt className="text-xs" />
                            </a>
                          )}
                        </div>
                        <span className="text-xs text-slate-500 ml-2">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;
