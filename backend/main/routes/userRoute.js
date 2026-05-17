const express = require("express");
const User = require("../model/User");
const Resume = require("../model/Resume");
const protect = require("../middlewares/protect");

const userRouter = express.Router();

userRouter
  .get("/profile", protect, async (req, res) => {
    try {
      const loggedUser = await User.findById(req.user._id);
      if (!loggedUser)
        return res.status(404).json({ message: "no user found" });

      const { password: _, ...safe } = loggedUser.toObject();
      console.log(loggedUser);
      console.log(safe);
      res.status(200).json({ message: "fetched", user: safe });
    } catch (err) {
      res.status(500).json({ message: "something went wrong " });
    }
  })
  .put("/edit", protect, async (req, res) => {
    try {
      const found = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: req.body },
        { new: true }
      );
      if (!found) return res.status(404).json({ message: "no user found" });

      const { password: _, ...data } = found.toObject();
      res.status(200).send({ message: "updated", user: data });
    } catch (err) {
      res.status(500).json({ message: "server issue " });
    }
  })
  .delete("/delete", protect, async (req, res) => {
    try {
      const resume = await Resume.deleteMany({ userId: req.user._id });
      const userDeleted = await User.findOneAndDelete({ _id: req.user._id });
      res.status(200).send({ message: "user deleted", deleted: userDeleted });
    } catch (err) {
      res.status(500).json({ message: "something went wrong while deleting" });
    }
  });

module.exports = userRouter;
