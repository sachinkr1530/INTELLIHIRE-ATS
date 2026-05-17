const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(401).json({ message: "user already exists" });
    }

    const encrypt = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: encrypt });
    const saved = await user.save();

    const token = jwt.sign(
      { id: saved._id, email: saved.email },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    const { password: _, ...obj } = saved.toObject(); // imp
    res
      .status(201)
      .send({ message: "user created successfully", token: token, user: obj });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "no user found" });

    console.log(password);
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      const { password: _, ...savedUser } = user.toObject();
      return res.status(200).json({ token: token, user: savedUser });
    }

    return res.status(401).send({ message: "invalid username or password" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server issue while login " });
  }
};
