const jwt = require("jsonwebtoken");
const User = require("../model/User");
const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  try {
    if (header.startsWith("Bearer ")) {
      const token = header.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET);
      const loggedUser = await User.findById(user.id);
      const { password: _, ...safeUser } = loggedUser.toObject();
      req.user = safeUser;
      next();
    } else {
      res.status(401).json({ message: "un authorized" });
    }
  } catch (err) {
    res.status(401).json({ message: "un authorized" });
  }
};

module.exports = protect;
