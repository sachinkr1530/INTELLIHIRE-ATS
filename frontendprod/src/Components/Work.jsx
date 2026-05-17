import React, { useState } from "react";
import axios from "axios";
const WorkExperience = ({ workExperience, setWorkExperience }) => {
  const handleChange = (index, field, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = value;
    setWorkExperience(newWorkExperience);
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        jobTitle: "",
        company: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience.splice(index, 1);
    setWorkExperience(newWorkExperience);
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
              text: `You are an expert resume and LinkedIn profile optimizer, specializing in helping professionals stand out to hiring managers and automated Applicant Tracking Systems (ATS). Your goal is to take raw text from a professional's Work Experience section and rewrite it to be impactful, concise, and keyword-rich.

Use strong action verbs, integrate relevant industry keywords, and highlight achievements, responsibilities, certifications, and projects that demonstrate technical expertise. Convert accomplishments into quantifiable results wherever possible. Do not include placeholders or company names in the output. The final output should be a polished, ATS-friendly Work Experience section description ready to be used on a resume. Original description is: ${workExperience[index].description} and just give me the final output without starting lines like "Okay, I'm ready to transform your prompt" and without using symbols such as * or bullets that may reduce the ATS score.`,
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

      setWorkExperience((prev) =>
        prev.map((edu, i) =>
          i === index ? { ...edu, description: newDescription } : edu
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handelDelete = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {workExperience.map((work, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-4 border border-gray-600 rounded-lg"
        >
          {index !== 0 && (
            <button
              className="text-xl text-red-500 px-4 py-2 border-2 border-white rounded-lg hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer "
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          )}
          <input
            type="text"
            placeholder="Job Title"
            className="input w-full bg-transparent text-white outline-none"
            value={work.jobTitle}
            onChange={(e) => handleChange(index, "jobTitle", e.target.value)}
          />
          <input
            type="text"
            placeholder="Company Name"
            className="input w-full bg-transparent text-white outline-none"
            value={work.company}
            onChange={(e) => handleChange(index, "company", e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Start Year"
              className="input w-full bg-transparent text-white outline-none"
              value={work.startYear}
              onChange={(e) => handleChange(index, "startYear", e.target.value)}
            />
            <input
              type="text"
              placeholder="End Year (or Present)"
              className="input w-full bg-transparent text-white outline-none"
              value={work.endYear}
              onChange={(e) => handleChange(index, "endYear", e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="Description (responsibilities, achievements)"
              className="input w-full bg-transparent py-2 text-white outline-none"
              cols={10}
              rows={10}
              value={work.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            ></textarea>
            <button className="btn btn-primary" onClick={() => fetchAI(index)}>
              AI suggestion
            </button>
          </div>
        </div>
      ))}

      <button
        className="btn btn-outline btn-success w-full"
        onClick={addWorkExperience}
      >
        Add More
      </button>
    </div>
  );
};

export default WorkExperience;
