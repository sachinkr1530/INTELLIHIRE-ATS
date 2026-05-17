const express = require("express");
const protect = require("../middlewares/protect");
const resumeRouter = express.Router();
const Resume = require("../model/Resume");
const linkedIn = require("linkedin-jobs-api");

resumeRouter
  .post("/create", protect, async (req, res) => {
    try {
      const id = req.user._id;
      req.body.userId = id;
      const data = { userId: id, ...req.body };
      const resume = new Resume(data);
      const saved = await resume.save();
      res.status(201).json({ message: "created", resume: saved });
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  })
  .get("/getAll/:page", protect, async (req, res) => {
    try {
      const user = req.user._id;
      const page = parseInt(req.params.page);
      const limit = 10;
      const skip = (page - 1) * limit;
      const userResumes = await Resume.find({ userId: user })
        .sort({
          lastUpdated: -1,
        })
        .skip(skip)
        .limit(limit);
      if (userResumes.length == 0)
        return res.status(404).json({ message: "no resumes" });
      console.log(userResumes);
      res.status(200).json({ resumes: userResumes, count: userResumes.length });
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  })
  .get("/getOne/:id", protect, async (req, res) => {
    try {
      const user = req.user._id;
      const resume = await Resume.findById(req.params.id);

      if (!resume) {
        return res.status(404).json({ message: "no resume found" });
      }
      if (!resume.userId.equals(req.user._id)) {
        return res.status(403).json({
          message: "unauthorized access ",
        });
      }

      res.status(200).json({ resume: resume });
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  })
  .delete("/delete/:id", protect, async (req, res) => {
    try {
      const user = req.user._id;
      const resume = await Resume.findById(req.params.id);

      if (!resume) {
        return res.status(404).json({ message: "no resume found" });
      }
      if (!resume.userId.equals(req.user._id)) {
        return res.status(403).json({
          message: "unauthorized access ",
        });
      }

      await Resume.deleteOne({ _id: req.params.id });

      res.status(200).json({ message: "resume deleted" });
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  })
  .put("/update/:id", protect, async (req, res) => {
    try {
      const id = req.user._id;
      const data = { userId: id, ...req.body };
      const resume = await Resume.findById(req.params.id);
      if (!resume)
        return res.status(404).json({ message: "No Resume found to update" });
      if (!resume.userId.equals(req.user._id)) {
        return res.status(403).json({
          message: "unauthorized access ",
        });
      }
      data.lastUpdated = Date.now();
      const updated = await Resume.findOneAndUpdate(
        { _id: resume._id },
        { $set: data },
        { new: true }
      );
      res.status(200).json({ message: "updated", resume: updated });
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  })
  .get("/job/:data", async (req, res) => {
    try {
      req.params;
      const queryOptions = {
        keyword: req.params.data,
        location: "India",
        dateSincePosted: "past Week",
        jobType: "full time",
        remoteFilter: "remote",
        salary: "100000",
        experienceLevel: "entry level",
        limit: "10",
        page: "0",
        has_verification: false,
        under_10_applicants: false,
      };

      linkedIn.query(queryOptions).then((response) => {
        res.json(response);
      });
    } catch (err) {
      res.status(500).json({ message: "server error" });
    }
  });

module.exports = resumeRouter;
