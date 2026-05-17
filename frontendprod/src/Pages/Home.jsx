import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import {
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaCode,
  FaLaptop,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../Components/Thumbnail";

const Home = () => {
  const nav = useNavigate();
  const [resumes, setResumes] = useState([{ name: "abc" }]);

  const getAll = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:8080/resume/getAll/1",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResumes(data.resumes);
    } catch (err) {
      if (err.message == "Request failed with status code 401") {
        if (localStorage.getItem("token") && localStorage.getItem("user")) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    }
  };

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:8080/resume/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      setResumes((e) => e.filter((res) => res._id != id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <main className="min-h-[80%] flex flex-col gap-4">
      <div
        onClick={() => nav("/form")}
        className="h-60 w-50 border-dashed border-2 rounded-2xl flex items-center justify-center border-zinc-400 hover:cursor-pointer hover:bg-zinc-900 hover:border-zinc-600 transition-all duration-300 ease-in-out flex-col hover:text-green-400 hover:scale-105"
      >
        <IoMdAddCircle
          className="text-5xl hover:rotate-180 transition-all text-zinc-400 m-10"
          size={100}
        />
        <h1>Create A New Resume</h1>
      </div>

      <div className="flex flex-wrap gap-4 ">
        {resumes.map((resume, i) => (
          <Thumbnail resume={resume} onDelete={handleDelete} i={i}></Thumbnail>
        ))}
      </div>
    </main>
  );
};

export default Home;
