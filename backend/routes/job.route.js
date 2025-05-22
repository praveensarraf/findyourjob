import express from 'express';
import { postJob, getAllJobs, getJobById, getAdminJobs, deleteAdminJob, updateJob } from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router =  express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/:id/update").put(isAuthenticated, updateJob);
router.route("/deleteadminjobs/:id").delete(isAuthenticated, deleteAdminJob);

export default router;