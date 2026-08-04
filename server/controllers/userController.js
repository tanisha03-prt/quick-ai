import User from "../models/userModel.js";

// Register New User
export const registerUser = async (req, res) => {
  try {
    const { clerkId, name, email, image } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      return res.json({
        success: true,
        message: "User already exists",
        user: existingUser,
      });
    }

    // Create new user
    const user = await User.create({
      clerkId,
      name,
      email,
      image,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};