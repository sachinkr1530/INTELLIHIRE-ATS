import { useState } from "react";
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

// Template 1 Component
const Template1 = () => {
  const form = {
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    linkedin: "https://linkedin.com/in/johnsmith",
    github: "https://github.com/johnsmith",
    leetcode: "https://leetcode.com/johnsmith",
    portfolio: "https://johnsmith.dev",
    summary:
      "Passionate Full Stack Developer with 3+ years of experience building scalable web applications. Proficient in modern JavaScript.",
  };

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      startYear: "2018",
      endYear: "2022",
      grade: "3.8 GPA",
      description:
        "Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems, Computer Networks",
    },
  ];

  const workExperience = [
    {
      jobTitle: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      startYear: "Jan 2023",
      endYear: "Present",
    },
    {
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      startYear: "Jun 2022",
      endYear: "Dec 2022",
    },
  ];

  const projects = [
    {
      name: "E-Commerce Platform",
      link: "https://github.com/johnsmith/ecommerce-platform",
      stack: "React, Node.js, MongoDB, Stripe API",
      description:
        "Built a full-featured e-commerce platform with user authentication, payment processing, and admin dashboard.",
    },
  ];

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Node.js",
    "Express.js",
    "Python",
    "Django",
    "FastAPI",
    "Java",
    "Spring Boot",
    "MongoDB",
    "PostgreSQL",
  ];

  return (
    <div className="h-[500px] w-[380px] bg-gray-100 py-2 px-1">
      <div className="max-w-full mx-auto h-full">
        <div className="printable-content bg-white overflow-y-auto shadow-lg w-full h-full p-2 mx-auto text-xs">
          <div className="mb-2">
            <h1 className="text-sm font-bold text-black mb-1">{form.name}</h1>
            <div className="flex flex-wrap items-center gap-1 text-xs">
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
                <a
                  href={form.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {form.summary && (
            <div className="mb-2">
              <div className="border-b border-gray-300 mb-1"></div>
              <h2 className="text-xs font-bold text-black mb-1">About Me</h2>
              <p className="text-xs text-gray-700 leading-tight">
                {form.summary}
              </p>
            </div>
          )}

          {workExperience && workExperience[0]?.jobTitle && (
            <div className="mb-2">
              <div className="border-b border-gray-300 mb-1"></div>
              <h2 className="text-xs font-bold text-black mb-1">
                Work Experience
              </h2>
              <ul className="space-y-1">
                {workExperience.map((work, index) => (
                  <li key={index}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-black text-xs">
                          {work.jobTitle}
                        </h3>
                        <p className="text-xs text-gray-600">{work.company}</p>
                      </div>
                      <p className="text-xs text-gray-600 ml-1">
                        {work.startYear} - {work.endYear}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skills && skills[0] && (
            <div className="mb-2">
              <div className="border-b border-gray-300 mb-1"></div>
              <h2 className="text-xs font-bold text-black mb-1">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.slice(0, 10).map((skill, index) => (
                  <span
                    key={index}
                    className="px-1 text-black py-0.5 bg-gray-100 text-xs font-medium rounded"
                  >
                    {skill}
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

// Template 2 Component
const Template2 = () => {
  const form = {
    name: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    email: "sarah.johnson@email.com",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    github: "https://github.com/sarahjohnson",
    portfolio: "https://sarahjohnson.dev",
    location: "San Francisco, CA",
    summary:
      "Creative Frontend Developer with 4+ years of experience in building responsive web applications and user interfaces.",
  };

  const workExperience = [
    {
      jobTitle: "Senior Frontend Developer",
      company: "Meta",
      startYear: "Feb 2023",
      endYear: "Present",
    },
    {
      jobTitle: "Frontend Developer",
      company: "Airbnb",
      startYear: "Jul 2022",
      endYear: "Jan 2023",
    },
  ];

  const skills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Vue.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "SASS",
    "Node.js",
  ];

  return (
    <div className="h-[500px] w-[380px] bg-gradient-to-br from-blue-50 to-indigo-100 py-2 px-1">
      <div className="max-w-full mx-auto h-full">
        <div className="printable-content bg-white overflow-y-auto shadow-xl rounded-lg w-full h-full p-3 mx-auto text-xs border border-gray-200">
          <div className=" bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-3 -m-3 mb-3">
            <h1 className="text-lg font-bold mb-1">{form.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs opacity-90">
              {form.location && (
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  <span>{form.location}</span>
                </div>
              )}
              {form.phone && (
                <div className="flex items-center gap-1">
                  <FaPhone />
                  <span>{form.phone}</span>
                </div>
              )}
            </div>
          </div>

          {form.summary && (
            <div className="mb-3">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
                Professional Summary
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed bg-blue-50 p-2 rounded">
                {form.summary}
              </p>
            </div>
          )}

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
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <h3 className="font-semibold text-black text-xs">
                          {work.jobTitle}
                        </h3>
                        <p className="text-xs text-blue-600 font-medium">
                          {work.company}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 bg-white px-1 py-0.5 rounded">
                        {work.startYear} - {work.endYear}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills && skills[0] && (
            <div className="mb-3">
              <h2 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                <div className="w-1 h-4 bg-blue-600 rounded mr-2"></div>
                Technical Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.slice(0, 8).map((skill, index) => (
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
        </div>
      </div>
    </div>
  );
};

// Template 3 Component
const Template3 = () => {
  const form = {
    name: "Michael Chen",
    phone: "+1 (555) 456-7890",
    email: "michael.chen@email.com",
    linkedin: "https://linkedin.com/in/michaelchen",
    github: "https://github.com/michaelchen",
    portfolio: "https://michaelchen.dev",
    location: "Seattle, WA",
    summary:
      "Experienced Backend Developer specializing in microservices architecture and cloud infrastructure.",
  };

  const workExperience = [
    {
      jobTitle: "Senior Backend Engineer",
      company: "Amazon Web Services",
      startYear: "Mar 2022",
      endYear: "Present",
    },
    {
      jobTitle: "Backend Developer",
      company: "Microsoft",
      startYear: "Aug 2021",
      endYear: "Feb 2022",
    },
  ];

  const skills = [
    "Go",
    "Python",
    "Rust",
    "Java",
    "Kubernetes",
    "Docker",
    "AWS",
    "PostgreSQL",
    "Redis",
    "Kafka",
  ];

  return (
    <div className="h-[500px] w-[380px] bg-gray-50 py-2 px-1">
      <div className="max-w-full mx-auto h-full">
        <div className="printable-content bg-white overflow-y-auto shadow-lg w-full h-full mx-auto text-xs flex">
          <div className="w-32 bg-slate-800 text-white p-2 flex flex-col">
            <div className="mb-3">
              <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <FaUser className="text-2xl text-slate-300" />
              </div>
              <h1 className="text-sm font-bold text-center leading-tight">
                {form.name}
              </h1>
            </div>

            <div className="mb-3">
              <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
                <IoMdMail className="mr-1" /> CONTACT
              </h3>
              <div className="space-y-1 text-xs">
                {form.location && (
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mt-0.5 mr-1 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-200 leading-tight">
                      {form.location}
                    </span>
                  </div>
                )}
                {form.phone && (
                  <div className="flex items-start">
                    <FaPhone className="mt-0.5 mr-1 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-200 leading-tight break-all">
                      {form.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {skills && skills[0] && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold mb-2 text-slate-300 flex items-center">
                  <FaCogs className="mr-1" /> SKILLS
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.slice(0, 8).map((skill, index) => (
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
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            {form.summary && (
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

const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const handleTemplateSelect = (templateNumber) => {
    setSelectedTemplate(templateNumber);
  };

  return (
    <div className="w-full h-full flex items-center px-10 justify-between bg-zinc-900">
      <div
        className={`cursor-pointer transition-all duration-300 ${
          selectedTemplate === 1
            ? "border-2 border-green-200 rounded-lg shadow-lg shadow-green-200/20"
            : "border-2 border-transparent hover:border-gray-600 rounded-lg"
        }`}
        onClick={() => handleTemplateSelect(1)}
      >
        <Template1 />
        <div className="text-center mt-2">
          <span className="text-white text-sm font-medium">
            Classic Template
          </span>
        </div>
      </div>

      <div
        className={`cursor-pointer transition-all duration-300 ${
          selectedTemplate === 2
            ? "border-4 border-green-200 rounded-lg shadow-lg shadow-green-200/20"
            : "border-2 border-transparent hover:border-gray-600 rounded-lg"
        }`}
        onClick={() => handleTemplateSelect(2)}
      >
        <Template2 />
        <div className="text-center mt-2">
          <span className="text-white text-sm font-medium">
            Modern Template
          </span>
        </div>
      </div>

      <div
        className={`cursor-pointer transition-all duration-300 ${
          selectedTemplate === 3
            ? "border-4 border-green-200 rounded-lg shadow-lg shadow-green-200/20"
            : "border-2 border-transparent hover:border-gray-600 rounded-lg"
        }`}
        onClick={() => handleTemplateSelect(3)}
      >
        <Template3 />
        <div className="text-center mt-2">
          <span className="text-white text-sm font-medium">
            Professional Template
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
