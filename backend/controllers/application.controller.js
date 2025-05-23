import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });

        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job!",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully!",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });

        if(!application){
            return res.status(404).json({
                message: "No jobs applied!",
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });
        
    } catch (error) {
        console.log(error);
    }
};


// To see how many candidates have applied for this job (By Job-Recruiter)
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message: "Job not found!",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
        
    } catch (error) {
        console.log(error);
    }
};


// To update the status of applied jobs (By Job-Recruiter)
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if(!status){
            return res.status(400).json({
                message: "Status is required!",
                success: false
            });
        }

        // Find the application by application Id
        const application = await Application.findOne({ _id: applicationId });

        if(!application){
            return res.status(404).json({
                message: "Application not found!",
                success: false
            });
        }
        
        // Update the application status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully!",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};
