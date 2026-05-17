import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import {
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaLaptop,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../App";

const Thumbnail = ({ resume, i, onDelete }) => {
  const nav = useNavigate();
  const [visible, setVisible] = useState(false);
  const { res, setres } = useContext(context);
  return (
    <div
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
      key={i}
      className="bg-white relative rounded-2xl w-60 p-3 overflow-hidden shadow-md hover:shadow-xl cursor-pointer hover:scale-105 transition-all"
    >
      <div
        className={`${
          visible ? "flex" : "hidden"
        } absolute h-full w-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white/5 backdrop-blur-[2px] flex-col items-center justify-center gap-2`}
      >
        <button
          className="btn btn-primary w-40"
          onClick={() => nav(`preview/${resume._id}`)}
        >
          download
        </button>{" "}
        <button
          className="btn btn-error w-40"
          onClick={() => onDelete(resume._id)}
        >
          Delete
        </button>
        <NavLink to="/job">
          <button
            className="btn btn-success w-40"
            onClick={() => {
              setres(resume);
            }}
          >
            Search for Jobs
          </button>
        </NavLink>
      </div>

      <h2 className="text-black font-bold text-[8px] mb-1 truncate">
        {resume.name}
      </h2>

      <div className="flex flex-wrap gap-1 text-black text-[8px] mb-1">
        {resume.phone && (
          <div className="flex items-center gap-1">
            <FaPhone /> {resume.phone}
          </div>
        )}
        {resume.email && (
          <div className="flex items-center gap-1">
            <IoMdMail /> {resume.email}
          </div>
        )}
        {resume.linkedin && (
          <a
            href={resume.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <FaLinkedin /> LinkedIn
          </a>
        )}
        {resume.github && (
          <a
            href={resume.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <FaGithub /> Github
          </a>
        )}
        {resume.leetcode && (
          <a
            href={resume.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <FaCode /> Leetcode
          </a>
        )}
        {resume.portfolio && (
          <a
            href={resume.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <FaLaptop /> Portfolio
          </a>
        )}
      </div>

      {resume.summary && (
        <div className="mb-1">
          <h3 className="text-black font-semibold text-[8px]">About Me</h3>
          <p className="text-black text-[8px] truncate">{resume.summary}</p>
        </div>
      )}

      {resume.education?.length > 0 && (
        <div className="mb-1">
          <h3 className="text-black font-semibold text-[8px]">Education</h3>
          {resume.education.map((edu, idx) => (
            <p key={idx} className="text-[8px] text-gray-600 truncate">
              {edu.degree}, {edu.institution} ({edu.startYear}-{edu.endYear})
            </p>
          ))}
        </div>
      )}

      {resume.workExperience?.length > 0 && (
        <div className="mb-1">
          <h3 className="text-black font-semibold text-[8px]">Work</h3>
          {resume.workExperience.map((work, idx) => (
            <p key={idx} className="text-[8px] text-gray-600 truncate">
              {work.jobTitle} @ {work.company} ({work.startYear}-{work.endYear})
            </p>
          ))}
        </div>
      )}

      {resume.projects?.length > 0 && (
        <div className="mb-1">
          <h3 className="text-black font-semibold text-[8px]">Projects</h3>
          {resume.projects.map((project, idx) => (
            <p key={idx} className="text-[8px] text-gray-600 truncate">
              {project.name} [{project.stack}]
            </p>
          ))}
        </div>
      )}

      {resume.certifications?.length > 0 && (
        <div className="mb-1">
          <h3 className="text-black font-semibold text-[8px]">
            Certifications
          </h3>
          {resume.certifications.map((cert, idx) => (
            <p key={idx} className="text-[8px] text-gray-600 truncate">
              {cert.name} ({cert.year})
            </p>
          ))}
        </div>
      )}

      {resume.skills?.length > 0 && (
        <div className="mb-1">
          <h3 className="text-black font-semibold text-[8px]">Skills</h3>
          <p className="text-[8px] text-gray-600 truncate">
            {resume.skills.join(", ")}
          </p>
        </div>
      )}

      {resume.languages?.length > 0 && (
        <div className="mb-1">
          <h3 className="text-black font-semibold text-[8px]">Languages</h3>
          <p className="text-[8px] text-gray-600 truncate">
            {resume.languages.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
