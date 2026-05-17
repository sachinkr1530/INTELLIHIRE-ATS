import React, { useContext, useState } from "react";
import BasicDetails from "../Components/BasicDetails";
import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaLaptop,
  FaLinkedin,
  FaMailBulk,
  FaPhone,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaCertificate,
  FaCogs,
  FaGlobe,
  FaSave,
  FaCheckCircle,
  FaEdit,
  FaEye,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Education from "../Components/Education";
import WorkExperience from "../Components/Work";
import Projects from "../Components/Projects";
import Certifications from "../Components/Certifications";
import Skills from "../Components/Skills";
import { context } from "../App";
import axios from "axios";
import Template1 from "../Components/Template1";
import Template2 from "../Components/Template2";
import Template3 from "../Components/Template3";
import TemplateSelector from "../Components/TemplateSelector";

const Form = () => {
  const [navigation, setNavigation] = React.useState("Select Template");
  const { user } = useContext(context);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const fields = [
    {
      id: "Select Template",
      label: "Template",
      icon: FaEdit,
    },
    {
      id: "Basic Information",
      label: "Basic Info",
      icon: FaUser,
    },
    {
      id: "Education",
      label: "Education",
      icon: FaGraduationCap,
    },
    {
      id: "Work Experience",
      label: "Experience",
      icon: FaBriefcase,
    },
    {
      id: "Projects",
      label: "Projects",
      icon: FaProjectDiagram,
    },
    {
      id: "Certifications",
      label: "Certifications",
      icon: FaCertificate,
    },
    {
      id: "Skills",
      label: "Skills",
      icon: FaCogs,
    },
    {
      id: "Languages",
      label: "Languages",
      icon: FaGlobe,
    },
    {
      id: "Save ",
      label: "Save",
      icon: FaSave,
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    leetcode: "",
  });

  const [education, setEducation] = useState([
    {
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      grade: "",
      description: "",
    },
  ]);

  const [certifications, setCertifications] = useState([
    { name: "", issuer: "", year: "", link: "" },
  ]);

  const [projects, setProjects] = useState([
    { name: "", stack: "", link: "", description: "" },
  ]);

  const [languages, setLanguages] = useState([""]);
  const [language, setLanguage] = useState("");

  const [workExperience, setWorkExperience] = useState([
    {
      jobTitle: "",
      company: "",
      startYear: "",
      endYear: "",
      description: "",
    },
  ]);

  const [skills, setSkills] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user2 = localStorage.getItem("user");
    console.log(JSON.parse(user2));
    const formData = {
      ...form,
      userId: JSON.parse(user2)._id,
      resumeId: selectedTemplate,
      education,
      certifications,
      projects,
      languages,
      workExperience,
      skills,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/resume/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Resume saved:", res.data);
      alert("Resume saved successfully!");
    } catch (err) {
      console.error("Error saving resume:", err.response?.data || err.message);
      alert("Error saving resume. Please try again.");
    }
  };

  const isSectionCompleted = (sectionId) => {
    switch (sectionId) {
      case "Basic Information":
        return form.name && form.email;
      case "Education":
        return education[0]?.degree && education[0]?.institution;
      case "Work Experience":
        return workExperience[0]?.jobTitle && workExperience[0]?.company;
      case "Projects":
        return projects[0]?.name;
      case "Certifications":
        return certifications[0]?.name;
      case "Skills":
        return skills[0] && skills[0].trim();
      case "Languages":
        return languages[0] && languages[0].trim();
      default:
        return false;
    }
  };

  const completedCount = fields.filter((field) =>
    isSectionCompleted(field.id)
  ).length;
  const totalSections = fields.length - 1;
  const progressPercentage = (completedCount / totalSections) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6">
      <div className="w-full mx-auto">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Resume Builder Pro
              </h1>
              <p className="text-gray-300 mt-3 text-lg">
                Craft your professional resume with our intuitive builder
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-800/60 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-700">
                <div className="text-sm text-gray-300 font-medium">
                  <span className="text-blue-400">
                    Template {selectedTemplate}
                  </span>{" "}
                  •<span className="text-green-400"> {completedCount}</span>/
                  <span className="text-gray-400">{totalSections}</span>{" "}
                  completed
                </div>
              </div>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-3 px-2 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FaEye className="text-lg" />
                {showPreview ? "Hide Preview" : "Live Preview"}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="w-full bg-gray-700/80 backdrop-blur-sm rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="absolute -bottom-6 left-0 text-sm text-gray-400">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl p-5 sticky top-6">
              <div className="mb-4 pb-4 border-b border-gray-700/50">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FaUser className="text-blue-400" />
                  Navigation
                </h3>
                <p className="text-gray-400 text-sm">Complete all sections</p>
              </div>

              <div className="space-y-2">
                {fields.map((field, index) => {
                  const IconComponent = field.icon;
                  const isActive = navigation === field.id;
                  const isCompleted = isSectionCompleted(field.id);

                  return (
                    <button
                      key={field.id}
                      onClick={() => setNavigation(field.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-4 border-blue-400 shadow-lg"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-l-4 hover:border-gray-500"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-opacity duration-300 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-50"
                        }`}
                      />

                      <IconComponent
                        className={`text-xl flex-shrink-0 transition-colors ${
                          isActive
                            ? "text-blue-400"
                            : "text-gray-400 group-hover:text-blue-300"
                        }`}
                      />

                      <span className="font-medium relative z-10">
                        {field.label}
                      </span>

                      {isCompleted && !isActive && (
                        <FaCheckCircle className="text-green-400 text-lg ml-auto relative z-10 animate-pulse" />
                      )}

                      {isActive && (
                        <div className="ml-auto relative z-10">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col xl:flex-row gap-2 lg:gap-8">
              <div
                className={`${
                  showPreview ? "xl:w-1/2" : "w-full"
                } transition-all duration-500`}
              >
                <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl p-2 lg:p-4">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          navigation === "Select Template"
                            ? "bg-purple-500/20"
                            : navigation === "Basic Information"
                            ? "bg-blue-500/20"
                            : navigation === "Education"
                            ? "bg-green-500/20"
                            : navigation === "Work Experience"
                            ? "bg-orange-500/20"
                            : navigation === "Projects"
                            ? "bg-cyan-500/20"
                            : navigation === "Certifications"
                            ? "bg-yellow-500/20"
                            : navigation === "Skills"
                            ? "bg-red-500/20"
                            : navigation === "Languages"
                            ? "bg-indigo-500/20"
                            : "bg-emerald-500/20"
                        }`}
                      >
                        {fields.find((f) => f.id === navigation)?.icon &&
                          React.createElement(
                            fields.find((f) => f.id === navigation).icon,
                            {
                              className: `text-2xl ${
                                navigation === "Select Template"
                                  ? "text-purple-400"
                                  : navigation === "Basic Information"
                                  ? "text-blue-400"
                                  : navigation === "Education"
                                  ? "text-green-400"
                                  : navigation === "Work Experience"
                                  ? "text-orange-400"
                                  : navigation === "Projects"
                                  ? "text-cyan-400"
                                  : navigation === "Certifications"
                                  ? "text-yellow-400"
                                  : navigation === "Skills"
                                  ? "text-red-400"
                                  : navigation === "Languages"
                                  ? "text-indigo-400"
                                  : "text-emerald-400"
                              }`,
                            }
                          )}
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white">
                        {navigation}
                      </h2>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  </div>

                  <div className="max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar">
                    {navigation === "Select Template" && (
                      <TemplateSelector
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                      />
                    )}

                    {navigation === "Basic Information" && (
                      <BasicDetails setForm={setForm} form={form} />
                    )}

                    {navigation === "Education" && (
                      <Education
                        education={education}
                        setEducation={setEducation}
                      />
                    )}

                    {navigation === "Work Experience" && (
                      <WorkExperience
                        workExperience={workExperience}
                        setWorkExperience={setWorkExperience}
                      />
                    )}

                    {navigation === "Projects" && (
                      <Projects projects={projects} setProjects={setProjects} />
                    )}

                    {navigation === "Certifications" && (
                      <Certifications
                        certifications={certifications}
                        setCertifications={setCertifications}
                      />
                    )}

                    {navigation === "Skills" && (
                      <Skills skills={skills} setSkills={setSkills} />
                    )}

                    {navigation === "Languages" && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-lg font-semibold text-white mb-4">
                            Add Language
                          </label>
                          <div className="flex gap-3">
                            <input
                              placeholder="Enter language (e.g., English, Spanish)"
                              className="flex-1 px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                              value={language}
                              onKeyDown={(e) => {
                                if (
                                  e.key === "Enter" &&
                                  language.trim() !== ""
                                ) {
                                  setLanguages([...languages, language.trim()]);
                                  setLanguage("");
                                }
                              }}
                              type="text"
                              onChange={(e) => setLanguage(e.target.value)}
                            />
                            <button
                              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                              onClick={() => {
                                if (language.trim() !== "") {
                                  setLanguages([...languages, language.trim()]);
                                  setLanguage("");
                                }
                              }}
                            >
                              Add
                            </button>
                          </div>
                        </div>

                        {languages.filter((lang) => lang.trim()).length > 0 && (
                          <div>
                            <label className="block text-lg font-semibold text-white mb-4">
                              Added Languages
                            </label>
                            <div className="flex flex-wrap gap-3">
                              {languages.map(
                                (lang, index) =>
                                  lang.trim() && (
                                    <div
                                      key={index}
                                      className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl border border-gray-600 shadow-lg animate-fade-in"
                                    >
                                      <span className="text-sm font-medium text-white">
                                        {lang}
                                      </span>
                                      <button
                                        className="text-red-400 hover:text-red-300 font-bold text-lg leading-none transition-colors duration-200 hover:scale-110"
                                        onClick={() => {
                                          const newLanguages = languages.filter(
                                            (_, i) => i !== index
                                          );
                                          setLanguages(newLanguages);
                                        }}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {navigation === "Save " && (
                      <div className="text-center space-y-6 py-8">
                        <div className="p-8 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl border border-green-500/30 shadow-2xl">
                          <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-6 animate-bounce" />
                          <h3 className="text-3xl font-bold text-white mb-4">
                            Ready to Save Your Resume!
                          </h3>
                          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                            Your professional resume is ready. Review all
                            sections and save when you're satisfied with the
                            content.
                          </p>
                          <button
                            onClick={handleSubmit}
                            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 text-lg"
                          >
                            <FaSave className="inline mr-3 text-xl" />
                            Save Resume to Dashboard
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {showPreview && navigation !== "Select Template" && (
                <div className="xl:w-1/2">
                  <div className="bg-gray-800/40 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl p-6 lg:p-2 sticky top-6">
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <FaEye className="text-2xl text-purple-400" />
                        <h3 className="text-2xl font-bold text-white">
                          Live Preview
                        </h3>
                      </div>
                      <p className="text-gray-400 flex items-center gap-2">
                        Template{" "}
                        <span className="text-blue-400 font-semibold">
                          {selectedTemplate}
                        </span>
                        <span className="text-gray-600">•</span>
                        <span className="text-green-400">
                          Real-time Updates
                        </span>
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 max-h-[65vh] overflow-y-auto custom-scrollbar shadow-inner border border-gray-200">
                      {selectedTemplate === 1 && (
                        <Template1
                          form={form}
                          education={education}
                          workExperience={workExperience}
                          projects={projects}
                          certifications={certifications}
                          skills={skills}
                          languages={languages}
                        />
                      )}
                      {selectedTemplate === 2 && (
                        <Template2
                          form={form}
                          education={education}
                          workExperience={workExperience}
                          projects={projects}
                          certifications={certifications}
                          skills={skills}
                          languages={languages}
                        />
                      )}
                      {selectedTemplate === 3 && (
                        <Template3
                          form={form}
                          education={education}
                          workExperience={workExperience}
                          projects={projects}
                          certifications={certifications}
                          skills={skills}
                          languages={languages}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Form;
