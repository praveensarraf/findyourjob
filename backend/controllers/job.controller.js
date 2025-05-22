import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// Posting Job by Job-Recruiter
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing. Please fill in all fields!",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map(item => item.trim()),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


// Get all jobs (for Job-Seekers)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


// Get single job by their id (for Job-Seekers)
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


// Get Jobs created by admin or Job-Recruiter
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
      .sort({ createdAt: -1 })
      .populate({
        path: "company",
        createdAt: -1,
      });

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


// delete Job created by admin or Job-Recruiter
export const deleteAdminJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const jobs = await Job.find();

    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};


// Update Job by Job-Recruiter (admin)
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updates = req.body;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required!",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    // Check if the logged-in user is the creator of the job
    if (job.created_by.toString() !== req.id) {
      return res.status(403).json({
        message: "You are not authorized to update this job!",
        success: false,
      });
    }

    // Update the job with the provided fields
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: updates },
      { new: true, runValidators: true } // Return updated document and enforce schema validations
    );

    return res.status(200).json({
      message: "Job updated successfully!",
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    console.error(error);
  }
};