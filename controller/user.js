import jwt from "jsonwebtoken";
import User from "../model/user.js";

// Register a new user
export const register = async (req, res, next) => {
  const { mobile, username, password } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (user) {
      return res
        .status(404)
        .json({ message: "Mobile number already exist" });
    }

    const newuser = new User({ username, mobile, password });
    await newuser.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
export const login = async (req, res, next) => {
  const { mobile, password } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, mobile: user.mobile },
      process.env.SECRET_KEY,
      {
        expiresIn: "1 hour",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
