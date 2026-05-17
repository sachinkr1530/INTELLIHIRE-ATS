import React from "react";
import axios from "axios";
const Projects = ({ projects, setProjects }) => {
  const addMore = () => {
    const newField = { name: "", stack: "", link: "", description: "" };
    setProjects([...projects, newField]);
  };

  const fetchAI = async (index) => {
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const apiKey = "AIzaSyCF_ItOgDEXk9K_XPG6MlJ0ipaTZjPMU_s";

    const data = {
      contents: [
        {
          parts: [
            {
              text: `You are an expert resume and LinkedIn profile optimizer, specializing in helping professionals stand out to hiring managers and automated Applicant Tracking Systems (ATS). Your goal is to take raw text from a professional's Project section and rewrite it to be impactful, concise, and keyword-rich.

Use strong action verbs, integrate relevant industry keywords, and highlight technical skills, tools, and methodologies applied in the project. Convert outcomes into quantifiable results wherever possible. Do not include placeholders or project titles in the output. The final output should be a polished, ATS-friendly Project section description ready to be used on a resume. Original description is: ${projects[index].description} and just give me the final output without starting lines like "Okay, I'm ready to transform your prompt" and without using symbols such as * or bullets that may reduce the ATS score.`,
            },
          ],
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json",
      "X-goog-api-key": "AIzaSyCF_ItOgDEXk9K_XPG6MlJ0ipaTZjPMU_s",
    };

    try {
      const response = await axios.post(url, data, { headers });

      const newDescription = response.data.candidates[0].content.parts[0].text;

      setProjects((prev) =>
        prev.map((edu, i) =>
          i === index ? { ...edu, description: newDescription } : edu
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {projects.map((project, index) => {
        return (
          <div
            key={index}
            className="w-full border-1 border-gray-100/40 rounded"
          >
            <div className="flex flex-col gap-4 p-4">
              {index !== 0 && (
                <button
                  className="text-xl text-red-500 px-4 py-2 border-2 border-white rounded-lg hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer "
                  onClick={() => {
                    const newProjects = [...projects];
                    newProjects.splice(index, 1);
                    setProjects(newProjects);
                  }}
                >
                  Delete
                </button>
              )}
              <input
                type="text"
                placeholder="Project Name"
                className="input w-full bg-transparent text-white outline-none"
                value={project.name}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[index].name = e.target.value;
                  setProjects(newProjects);
                }}
              />
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                className="input w-full bg-transparent text-white outline-none"
                value={project.stack}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[index].stack = e.target.value;
                  setProjects(newProjects);
                }}
              />

              <input
                type="text"
                placeholder="Project Link"
                className="input w-full bg-transparent text-white outline-none"
                value={project.link}
                onChange={(e) => {
                  const newProjects = [...projects];
                  newProjects[index].link = e.target.value;
                  setProjects(newProjects);
                }}
              />
              <div>
                <textarea
                  rows={20}
                  cols={50}
                  placeholder="Description (optional)"
                  className="input w-full bg-transparent py-2 text-white outline-none"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].description = e.target.value;
                    setProjects(newProjects);
                  }}
                ></textarea>
                <button
                  className="btn btn-primary"
                  onClick={() => fetchAI(index)}
                >
                  AI suggestion
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <button onClick={addMore} className=" btn btn-outline btn-success w-full">
        Add
      </button>
    </div>
  );
};

export default Projects;
