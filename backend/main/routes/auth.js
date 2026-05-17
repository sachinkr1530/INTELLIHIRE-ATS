const express = require("express");
const { login, signUp } = require("../controllers/Auth");
const router = express.Router();
const protect = require("../middlewares/protect");

router.post("/login", login).post("/sign", signUp);

module.exports = router;
