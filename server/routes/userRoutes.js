import express from "express";
import {
  registerUser,
  getUserData,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Register User
userRouter.post(
  "/register",
  (req, res, next) => {
    console.log("Register route hit");
    next();
  },
  registerUser
);

// Get User Data
userRouter.post("/data", getUserData);

export default userRouter;