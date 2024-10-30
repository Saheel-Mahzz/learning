import { validationResult } from "express-validator";
import User from "../Models/authModal.js";

export const updateUser = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(401).json({ errors: error.array() });
  }

  const { username, email } = req.body;

  const userId = req.user.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .josn({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "user updated successfully!",
      updatedUser,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const deleteduser = await User.findByIdAndDelete({ userId });

    if (!deleteduser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
