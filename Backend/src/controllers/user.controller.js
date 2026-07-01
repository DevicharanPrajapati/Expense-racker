const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// const generatingJwtToken = ()=>{

// }

const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });
    }

    const RegisterUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        id: RegisterUser._id,
        name: RegisterUser.name,
        email: RegisterUser.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(401)
        .json({ success: false, message: "Name is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // Which user?
      //  {
      //    name: name, // What to update?
      //  },
      {
        returnDocument: "after",
      },
      {
        new: true, // Return updated document
      },
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Name is required" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    const updatedPassword = await User.findByIdAndUpdate(
      user, // Which user?
      {
        password: newPassword, // What to update?
      },
      {
        returnDocument: "after",
      },
      {
        new: true, // Return updated document
      },
    );


    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      user: updatedPassword,});
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password is required!" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  const hashedPassword = user.password;

  const correctPass = await bcrypt.compare(password, hashedPassword);
  if (!correctPass) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  return res.status(201).json({
    success: true,
    message: "User login successfully!",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const profile = async (req, res) => {
  try {
    const profileData = await User.findById(req.user.id).select(
      "-password -createdAt -updatedAt",
    );

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successful",
      profile: profileData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logout successful!",
  });
};

module.exports = {
  userRegistration,
  logout,
  login,
  profile,
  updateProfile,
  updatePassword,
};
