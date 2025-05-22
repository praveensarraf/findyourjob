import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Create a new user
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, confirmPassword, role } =
      req.body;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return res.status(400).json({
        message: "Something is missing. Please Check again!",
        success: false,
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password do not match!",
        success: false,
      });
    }

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists with this email. Please use another one!",
        success: false,
      });
    }

    // Handle profile photo upload
    let profilePhotoUrl = null;

    if (req.files && req.files.profilePhoto) {
      const file = req.files.profilePhoto[0];
      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profilePhotoUrl = cloudResponse.secure_url;
      } catch (error) {
        console.log(error);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
      bookmarkedJobs: [],
    });

    return res.status(201).json({
      message: "Account created successfully. Please login to continue!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// user login
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing. Please Check again!",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or Password. Please try again!",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect Email or Password. Please try again!",
        success: false,
      });
    }

    // Check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role!",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      bookmarkedJobs: user.bookmarkedJobs,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        message: `Welcome back, ${user.fullName}!`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// user logout
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("token", {
        sameSite: "None",
        secure: true,
      })
      .json({
        message: "Logged out successfully. Goodbye!",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;

    const userId = req.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized access.",
        success: false,
      });
    }

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    let cloudResponseProfilePhoto, cloudResponseResume;

    // Handle Profile Photo Upload
    if (req.files && req.files.profilePhoto) {
      const profilePhoto = req.files.profilePhoto[0];
      try {
        const fileUri = getDataUri(profilePhoto);
        cloudResponseProfilePhoto = await cloudinary.uploader.upload(
          fileUri.content
        );
      } catch (error) {
        console.error(error);
      }
    }

    // Handle Resume Upload
    if (req.files && req.files.resume) {
      const resume = req.files.resume[0];
      try {
        const resumeUri = getDataUri(resume);
        cloudResponseResume = await cloudinary.uploader.upload(
          resumeUri.content
        );
      } catch (error) {
        console.error(error);
      }
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;

    // Update the profile photo URL if it's uploaded
    if (cloudResponseProfilePhoto) {
      user.profile.profilePhoto = cloudResponseProfilePhoto.secure_url;
    }

    // Update the resume URL if it's uploaded
    if (cloudResponseResume) {
      user.profile.resume = cloudResponseResume.secure_url;
      user.profile.resumeOriginalName = req.files.resume[0].originalname;
    }

    await user.save();

    const responseUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully!",
      user: responseUser,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        message: "New Password and Confirm Password do not match!",
        success: false,
      });
    }

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Old Password is incorrect!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Add Bookmark Job
export const addBookmark = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    if (!user.bookmarkedJobs.includes(jobId)) {
      user.bookmarkedJobs.push(jobId);
      await user.save();
      return res.status(200).json({
        message: "Job bookmarked successfully!",
        success: true,
      });
    }
    return res
      .status(400)
      .json({ message: "Job already bookmarked!", success: false });
  } catch (error) {
    console.error(error);
  }
};

// Remove Bookmarked Job
export const removeBookmark = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    user.bookmarkedJobs = user.bookmarkedJobs.filter(
      (id) => id.toString() !== jobId
    );
    await user.save();
    return res.status(200).json({
      message: "Job removed from bookmarks!",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

// Get Bookmarked Jobs
export const getBookmarks = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).populate("bookmarkedJobs");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    return res.status(200).json({
      bookmarkedJobs: user.bookmarkedJobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

// Delete Account
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    // Verify if user exists
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password!",
        success: false,
      });
    }

    // Delete profile photo from Cloudinary
    if (user.profile.profilePhoto) {
      const publicId = user.profile.profilePhoto.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(error);
      }
    }

    // Delete resume from Cloudinary
    if (user.profile.resume) {
      const publicId = user.profile.resume.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(error);
      }
    }

    // Delete user account
    await User.findByIdAndDelete(req.id);

    return res.status(200).json({
      message: "Account deleted successfully. All data has been removed!",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};
