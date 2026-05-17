import React, { useState } from "react";
import axios from "axios";
const Education = ({ education, setEducation }) => {
  const handleChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      {
        degree: "",
        institution: "",
        startYear: "",
        endYear: "",
        grade: "",
        description: "",
      },
    ]);
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
              text: `You are an expert resume and LinkedIn profile optimizer, specializing in helping professionals stand out to hiring managers and automated Applicant Tracking Systems (ATS). Your goal is to take raw text from a professional's Education section and rewrite it to be impactful, concise, and keyword-rich.

Use strong action verbs, integrate relevant industry keywords, and highlight academic achievements, coursework, certifications, and projects that demonstrate technical expertise. Convert accomplishments into quantifiable results wherever possible. The final output should be a polished, ATS-friendly Education section description ready to be used on a resume. Original description is: ${education[index].description} and just give me the final output dont start it like this eg'Okay, I'm ready to transforming your prompt' dont use placeholders like [] if there is information about education degree ${education[index].degree} and college name ${education[index].institution} then use it else just ignore this dont use ** and * and anything that might reduce the ATS Score dont use * or bullets dont mention college name   `,
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

      setEducation((prev) =>
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
      {education.map((edu, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-4 border border-gray-600 rounded-lg"
        >
          {index != 0 && (
            <button
              className="text-xl text-red-500 px-4 py-2 border-2 border-white rounded-lg hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer"
              onClick={() => handelDelete(index)}
            >
              delete
            </button>
          )}
          <input
            type="text"
            placeholder="Degree Name"
            className="input w-full bg-transparent text-white outline-none"
            value={edu.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
          />
          <input
            type="text"
            placeholder="Institution Name"
            className="input w-full bg-transparent text-white outline-none"
            value={edu.institution}
            onChange={(e) => handleChange(index, "institution", e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Start Year"
              className="input w-full bg-transparent text-white outline-none"
              value={edu.startYear}
              onChange={(e) => handleChange(index, "startYear", e.target.value)}
            />
            <input
              type="text"
              placeholder="End Year"
              className="input w-full bg-transparent text-white outline-none"
              value={edu.endYear}
              onChange={(e) => handleChange(index, "endYear", e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Grade/Percentage"
            className="input w-full bg-transparent text-white outline-none"
            value={edu.grade}
            onChange={(e) => handleChange(index, "grade", e.target.value)}
          />
          <div>
            <textarea
              placeholder="Description (optional)"
              value={edu.description}
              rows={4}
              cols={50}
              className="w-full text-white bg-transparent outline-2  border-white border-2 active:outline-2 focus:outline-green-400 focus:border-none px-4 py-2 text-lg "
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            ></textarea>
            <button
              onClick={() => fetchAI(index)}
              className="text-white text-[12px] btn btn-primary py-1 "
            >
              AI suggestion
            </button>
          </div>
        </div>
      ))}

      <button
        className="btn btn-outline btn-success w-full"
        onClick={addEducation}
      >
        Add More
      </button>
    </div>
  );
};

export default Education;
