import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  changePassword,
  addBookmark,
  removeBookmark,
  getBookmarks,
  deleteAccount,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { uploadFields } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(uploadFields, register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);
router
  .route("/profile/update")
  .put(isAuthenticated, uploadFields, updateProfile);
router.route("/changePassword").put(isAuthenticated, changePassword);

// Routes for bookmarking jobs
router.route("/bookmark/:id").post(isAuthenticated, addBookmark);
router.route("/bookmark/:id").delete(isAuthenticated, removeBookmark);
router.route("/bookmarks").get(isAuthenticated, getBookmarks);

// Delete Account
router.route("/delete").delete(isAuthenticated, deleteAccount);

export default router;
