import React, { useState } from "react";
import axios from "axios";
const BasicDetails = ({ setForm, form }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fetchAI = async () => {
    console.log(form.summary);
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    const apiKey = "AIzaSyCF_ItOgDEXk9K_XPG6MlJ0ipaTZjPMU_s";

    const data = {
      contents: [
        {
          parts: [
            {
              text: `You are an expert resume and LinkedIn profile optimizer, specializing in helping professionals stand out to hiring managers and automated Applicant Tracking Systems (ATS). Your goal is to take a raw text summary from a professional's "About Me" section and rewrite it to be impactful, concise, and keyword-rich.

Use powerful action verbs, integrate relevant industry keywords, and convert accomplishments into quantifiable achievements wherever possible. The final output should be a professional, polished summary ready to be used on a resume.

I will provide the original "About Me" text. My primary goal is to make it ATS-friendly.

original "About Me" text here.${form.summary} and just give me the final output dont start it like this eg'Okay, I'm ready to transforming your prompt'`,
            },
          ],
        },
      ],
    };

    const headers = {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    };

    axios
      .post(url, data, { headers })
      .then((response) => {
        setForm((prev) => ({
          ...prev,
          summary: response.data.candidates[0].content.parts[0].text,
        }));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4  justify-center items-start mt-4  h-full p-4 rounded-lg text-black"
    >
      {/* Name */}
      <label className="input validator">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Full Name"
          className="w-full text-white bg-transparent outline-none"
        />
      </label>

      {/* Social Media Section */}
      <h2 className="text-green-300 font-semibold ">Professional Accounts</h2>
      <label className="input validator">
        <input
          type="text"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="w-full text-white  bg-transparent outline-none"
        />
      </label>
      <label className="input validator">
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full text-white  bg-transparent outline-none"
        />
      </label>
      <label className="input validator">
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full text-white  bg-transparent outline-none"
        />
      </label>
      <label className="input validator">
        <input
          type="url"
          name="github"
          value={form.github}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="w-full text-white  bg-transparent outline-none"
        />
      </label>
      <label className="input validator">
        <input
          type="url"
          name="leetcode"
          value={form.leetcode}
          onChange={handleChange}
          placeholder="LeetCode URL"
          className="w-full  text-white  bg-transparent outline-none"
        />
      </label>
      <label className="input validator">
        <input
          type="url"
          name="portfolio"
          value={form.portfolio}
          onChange={handleChange}
          placeholder="Portfolio Website"
          className="w-full text-white  bg-transparent outline-none"
        />
      </label>

      {/* Summary */}

      <label
        className="
      "
      >
        <div>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Write a short summary about yourself..."
            rows={4}
            cols={50}
            className="w-full text-white bg-transparent outline-2  border-white border-2 active:outline-2 focus:outline-green-400 focus:border-none px-4 py-2 text-lg "
          />
          <button
            onClick={fetchAI}
            className="text-white text-[12px] btn btn-primary py-1 "
          >
            AI suggestion{" "}
          </button>
        </div>
      </label>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full mt-4">
        Save Profile
      </button>
    </form>
  );
};

export default BasicDetails;
