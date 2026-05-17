import React, { useContext, useEffect, useState, useRef } from "react";
import BasicDetails from "../Components/BasicDetails";
import { useReactToPrint } from "react-to-print";
import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaLaptop,
  FaLinkedin,
  FaMailBulk,
  FaPhone,
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
import Education from "../Components/Education";
import WorkExperience from "../Components/Work";
import Projects from "../Components/Projects";
import Certifications from "../Components/Certifications";
import Skills from "../Components/Skills";
import { context } from "../App";
import axios from "axios";
import { useParams } from "react-router-dom";

// Template 1 Component
const Template1 = ({ resume }) => (
  <div className="bg-white shadow-lg max-w-[8.5in] overflow-scroll w-full min-h-[11in] p-8">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-black mb-3">{resume.name}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        {resume.phone && (
          <div className="flex items-center gap-1">
            <FaPhone className="text-gray-600" />
            <span className="text-black">{resume.phone}</span>
          </div>
        )}
        {resume.email && (
          <div className="flex items-center gap-1">
            <IoMdMail className="text-gray-600" />
            <span className="text-black">{resume.email}</span>
          </div>
        )}
        {resume.linkedin && (
          <a
            href={resume.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
        )}
        {resume.github && (
          <a
            href={resume.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <FaGithub />
            <span>GitHub</span>
          </a>
        )}
        {resume.leetcode && (
          <a
            href={resume.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <FaCode />
            <span>LeetCode</span>
          </a>
        )}
        {resume.portfolio && (
          <a
            href={resume.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            <FaLaptop />
            <span>Portfolio</span>
          </a>
        )}
      </div>
    </div>

    {/* About Me Section */}
    {resume.summary && (
      <div className="mb-6">
        <div className="border-b-2 border-gray-300 mb-3"></div>
        <h2 className="text-lg font-bold text-black mb-2">About Me</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {resume.summary}
        </p>
      </div>
    )}

    {/* Education Section */}
    {resume.education && resume.education[0]?.degree && (
      <div className="mb-6">
        <div className="border-b-2 border-gray-300 mb-3"></div>
        <h2 className="text-lg font-bold text-black mb-2">Education</h2>
        <ul className="space-y-3">
          {resume.education.map((edu, index) => (
            <li key={index}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-semibold text-black text-sm">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-xs text-gray-600 text-right">
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
              {edu.grade && (
                <p className="text-xs text-gray-700">Grade: {edu.grade}</p>
              )}
              {edu.description && (
                <p className="text-xs text-gray-700 mt-1">{edu.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Work Experience Section */}
    {resume.workExperience && resume.workExperience[0]?.jobTitle && (
      <div className="mb-6">
        <div className="border-b-2 border-gray-300 mb-3"></div>
        <h2 className="text-lg font-bold text-black mb-2">Work Experience</h2>
        <ul className="space-y-3">
          {resume.workExperience.map((work, index) => (
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
                <p className="text-xs text-gray-700 mt-1">{work.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Projects Section */}
    {resume.projects && resume.projects[0]?.name && (
      <div className="mb-6">
        <div className="border-b-2 border-gray-300 mb-3"></div>
        <h2 className="text-lg font-bold text-black mb-2">Projects</h2>
        <ul className="space-y-3">
          {resume.projects.map((project, index) => (
            <li key={index}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex-1">
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
    {resume.certifications && resume.certifications[0]?.name && (
      <div className="mb-6">
        <div className="border-b-2 border-gray-300 mb-3"></div>
        <h2 className="text-lg font-bold text-black mb-2">Certifications</h2>
        <ul className="space-y-2">
          {resume.certifications.map((cert, index) => (
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

    {/* Skills Section */}
    {resume.skills && resume.skills[0] && (
      <div className="mb-6">
        <div className="border-b-2 border-gray-300 mb-3"></div>
        <h2 className="text-lg font-bold text-black mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill, index) => (
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
    {resume.languages && resume.languages[0] && (
      <div className="mb-6">
        <div className="border-b-2 text-black border-gray-300 mb-3"></div>
        <h2 className="text-lg font-bold text-black mb-2">Languages</h2>
        <div className="flex flex-wrap gap-2">
          {resume.languages.map((lang, index) => (
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
);

// Template 3 Component (Sidebar Layout)
const Template3 = ({ resume }) => (
  <div className="bg-white shadow-lg max-w-[8.5in] w-full min-h-[11in] mx-auto text-xs flex overflow-scroll">
    {/* Left Sidebar */}
    <div className="w-32 bg-slate-800 text-white p-2 flex flex-col">
      {/* Profile Section */}
      <div className="mb-3">
        <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mb-2 mx-auto">
          <FaUser className="text-2xl text-slate-300" />
        </div>
        <h1 className="text-sm font-bold text-center leading-tight">
          {resume?.name}
        </h1>
      </div>

      {/* Contact Info */}
      {(resume?.location || resume?.phone || resume?.email) && (
        <div className="mb-3">
          <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
            <IoMdMail className="mr-1" /> CONTACT
          </h3>
          <div className="space-y-1 text-xs">
            {resume?.location && (
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-0.5 mr-1 text-slate-400 flex-shrink-0" />
                <span className="text-slate-200 leading-tight">
                  {resume.location}
                </span>
              </div>
            )}
            {resume?.phone && (
              <div className="flex items-start">
                <FaPhone className="mt-0.5 mr-1 text-slate-400 flex-shrink-0" />
                <span className="text-slate-200 leading-tight break-all">
                  {resume.phone}
                </span>
              </div>
            )}
            {resume?.email && (
              <div className="flex items-start">
                <IoMdMail className="mt-0.5 mr-1 text-slate-400 flex-shrink-0" />
                <span className="text-slate-200 leading-tight break-all">
                  {resume.email}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Links */}
      {(resume?.linkedin || resume?.github || resume?.portfolio) && (
        <div className="mb-3">
          <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
            <FaGlobe className="mr-1" /> LINKS
          </h3>
          <div className="space-y-1 text-xs">
            {resume?.linkedin && (
              <a
                href={resume.linkedin}
                className="flex items-center text-slate-200 hover:text-white"
              >
                <FaLinkedin className="mr-1 text-slate-400" />
                <span className="truncate">LinkedIn</span>
              </a>
            )}
            {resume?.github && (
              <a
                href={resume.github}
                className="flex items-center text-slate-200 hover:text-white"
              >
                <FaGithub className="mr-1 text-slate-400" />
                <span className="truncate">GitHub</span>
              </a>
            )}
            {resume?.portfolio && (
              <a
                href={resume.portfolio}
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
      {resume.skills && resume.skills[0] && (
        <div className="mb-3">
          <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
            <FaCogs className="mr-1" /> SKILLS
          </h3>
          <div className="flex flex-wrap gap-1">
            {resume.skills.map((skill, index) => (
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
      {resume.languages && resume.languages[0] && (
        <div className="mb-3">
          <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
            <FaGlobe className="mr-1" /> LANGUAGES
          </h3>
          <div className="space-y-1 text-xs">
            {resume.languages.map((lang, index) => (
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
      {resume?.summary && (
        <div className="mb-3">
          <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
            <FaUser className="mr-2 text-slate-600" />
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {resume.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.workExperience && resume.workExperience[0]?.jobTitle && (
        <div className="mb-3">
          <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
            <FaBriefcase className="mr-2 text-slate-600" />
            WORK EXPERIENCE
          </h2>
          <div className="space-y-2">
            {resume.workExperience.map((work, index) => (
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
      {resume.projects && resume.projects[0]?.name && (
        <div className="mb-3">
          <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
            <FaProjectDiagram className="mr-2 text-slate-600" />
            KEY PROJECTS
          </h2>
          <div className="space-y-2">
            {resume.projects.map((project, index) => (
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
      {resume.education && resume.education[0]?.degree && (
        <div className="mb-3">
          <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
            <FaGraduationCap className="mr-2 text-slate-600" />
            EDUCATION
          </h2>
          <div className="space-y-2">
            {resume.education.map((edu, index) => (
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
                      <p className="text-xs text-slate-700">{edu.grade}</p>
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
      {resume.certifications && resume.certifications[0]?.name && (
        <div className="mb-2">
          <h2 className="text-sm font-bold text-slate-800 mb-2 flex items-center border-b border-slate-300 pb-1">
            <FaCertificate className="mr-2 text-slate-600" />
            CERTIFICATIONS
          </h2>
          <div className="space-y-1">
            {resume.certifications.map((cert, index) => (
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
);
// Template 2 Component (Modern Gradient Design)
const Template2 = ({ resume }) => (
  <div className="bg-white shadow-xl rounded-lg max-w-[8.5in] w-full min-h-[11in] p-3 mx-auto text-xs border border-gray-200 overflow-scroll">
    {/* Header with gradient background */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-3 -m-3 mb-3">
      <h1 className="text-lg font-bold mb-1">{resume.name}</h1>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-90">
        {resume.phone && (
          <div className="flex items-center gap-1.5">
            <FaPhone />
            <span>{resume.phone}</span>
          </div>
        )}
        {resume.email && (
          <div className="flex items-center gap-1.5">
            <IoMdMail />
            <span>{resume.email}</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs opacity-90 mt-2 border-t border-white/20 pt-2">
        {resume.linkedin && (
          <a
            href={resume.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
        )}
        {resume.github && (
          <a
            href={resume.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
          >
            <FaGithub />
            <span>GitHub</span>
          </a>
        )}
        {resume.portfolio && (
          <a
            href={resume.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
          >
            <FaLaptop />
            <span>Portfolio</span>
          </a>
        )}
      </div>
    </div>

    {/* About Me Section */}
    {resume.summary && (
      <div className="mb-3">
        <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
          <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
          Professional Summary
        </h2>
        <p className="text-xs text-gray-700 leading-relaxed bg-blue-50/50 p-2 rounded">
          {resume.summary}
        </p>
      </div>
    )}

    {/* Work Experience Section */}
    {resume.workExperience && resume.workExperience[0]?.jobTitle && (
      <div className="mb-3">
        <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
          <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
          Experience
        </h2>
        <div className="space-y-2">
          {resume.workExperience.map((work, index) => (
            <div
              key={index}
              className="bg-gray-50 p-2 rounded border-l-2 border-blue-400"
            >
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
    {resume.projects && resume.projects[0]?.name && (
      <div className="mb-3">
        <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
          <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
          Featured Projects
        </h2>
        <div className="space-y-2">
          {resume.projects.map((project, index) => (
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
                    <FaExternalLinkAlt className="text-xs" />
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
    {resume.education && resume.education[0]?.degree && (
      <div className="mb-3">
        <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
          <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
          Education
        </h2>
        <div className="space-y-2">
          {resume.education.map((edu, index) => (
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
    {resume.skills && resume.skills[0] && (
      <div className="mb-3">
        <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
          <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
          Technical Skills
        </h2>
        <div className="flex flex-wrap gap-1">
          {resume.skills.map((skill, index) => (
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
    {resume.certifications && resume.certifications[0]?.name && (
      <div className="mb-3">
        <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
          <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
          Certifications
        </h2>
        <div className="space-y-1">
          {resume.certifications.map((cert, index) => (
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
                      <FaExternalLinkAlt className="text-xs" />
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
    {resume.languages && resume.languages[0] && (
      <div className="mb-2">
        <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
          <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
          Languages
        </h2>
        <div className="flex flex-wrap gap-1">
          {resume.languages.map((lang, index) => (
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
);

const Preview = () => {
  const params = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:8080/resume/getOne/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResume(data.resume);
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resume?.name || "Resume"}_Resume`,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Resume not found
      </div>
    );
  }

  // Determine which template to use based on resumeId from the resume object
  const getTemplateComponent = () => {
    const templateId = resume?.resumeId || resume?.templateId || 1; // fallback to 1 if not specified

    switch (templateId) {
      case 1:
        return Template1;
      case 2:
        return Template2;
      case 3:
        return Template3;
      default:
        return Template1; // fallback to Template1
    }
  };

  const TemplateComponent = getTemplateComponent();
  const templateName =
    resume?.resumeId === 1
      ? "Classic"
      : resume?.resumeId === 2
      ? "Modern"
      : resume?.resumeId === 3
      ? "Sidebar"
      : "Classic";

  return (
    <div className="overflow-hidden h-screen overflow-y-scroll py-2">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4">
        {/* Print Button */}
        <div className="mb-6 text-center no-print">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Download PDF
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Template {resume?.resumeId || 1} ({templateName})
          </p>
        </div>

        {/* Resume Content */}
        <div className="flex justify-center">
          <div ref={componentRef}>
            <TemplateComponent resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
