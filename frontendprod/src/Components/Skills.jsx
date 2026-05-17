import React, { useState } from "react";

const Skills = ({ skills, setSkills }) => {
  const [skill, setSkill] = useState("");
  return (
    <div>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSkills([...skills, skill]);
            setSkill("");
          }
        }}
        type="text"
        placeholder="Skills"
        className="input w-full bg-transparent text-white outline-none"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <button
        className="btn btn-outline btn-success mt-4"
        onClick={() => {
          setSkills([...skills, skill]);
          setSkill("");
        }}
      >
        Add Skill
      </button>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((sk, index) => (
          <div
            key={index}
            className="px-2 py-1 bg-gray-700 rounded text-sm flex items-center gap-2"
          >
            <span>{sk}</span>
            <button
              className="text-red-500 font-bold"
              onClick={() => {
                const newSkills = skills.filter((_, i) => i !== index);
                setSkills(newSkills);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
