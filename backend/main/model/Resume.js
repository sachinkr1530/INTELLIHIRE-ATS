const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeId: { type: Number },

  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  linkedin: { type: String },
  github: { type: String },
  portfolio: { type: String },
  summary: { type: String },
  leetcode: { type: String },

  education: [
    {
      degree: { type: String },
      institution: { type: String },
      startYear: { type: String },
      endYear: { type: String },
      grade: { type: String },
      description: { type: String },
    },
  ],

  certifications: [
    {
      name: { type: String },
      issuer: { type: String },
      year: { type: String },
      link: { type: String },
    },
  ],

  projects: [
    {
      name: { type: String },
      stack: { type: String },
      link: { type: String },
      description: { type: String },
    },
  ],

  languages: [{ type: String }],

  skills: [{ type: String }],

  workExperience: [
    {
      jobTitle: { type: String },
      company: { type: String },
      startYear: { type: String },
      endYear: { type: String },
      description: { type: String },
    },
  ],

  keywords: [String],

  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resume", resumeSchema);
