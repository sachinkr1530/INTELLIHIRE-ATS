const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/auth");
const resumeRouter = require("./routes/ResumeRoutes");
const userRouter = require("./routes/userRoute");
const jobController = require("./controllers/Scrape");
const cors = require("cors");
const linkedIn = require("linkedin-jobs-api");

dotenv.config();
const server = express();

server.use(express.json());

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
server.use("/auth", router);
server.use("/resume", resumeRouter);
server.use("/user", userRouter);
server.use("/api", jobController);

const main = async () => {
  await mongoose.connect(process.env.URI);
  console.log("MONGODB CONNECTED ");
};

server.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED ${process.env.PORT}`);

  main().catch(() => {
    console.log("ERROR IN DB");
  });
});
