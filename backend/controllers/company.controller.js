import { Company } from '../models/company.model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';

// Register Company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company created successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// Get Company
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId}).sort({ createdAt: -1 });
        if(!companies){
            return res.status(404).json({
                message: "No companies found",
                success: false
            });    
        }

        return res.status(200).json({
            message: "Companies retrieved successfully",
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// Get company by Id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found!",
                success: false
            });
        }
        
        return res.status(200).json({
            message: "Company founded!",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// Get all registered companies
export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "All companies retrieved successfully",
            companies,
            success: true,
        });
    } catch (error) {
        console.error(error);
    }
};


// Update company
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;

        // Handle file upload to Cloudinary if a file is provided
        if (req.files && req.files.logo) {
            const logo = req.files.logo[0];
            try {
                const fileUri = getDataUri(logo);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                updateData.logo = cloudResponse.secure_url;
            } catch (error) {
                console.error(error);
            }
        }

        // Update the company document
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully!",
            company,
            success: true,
        });
    } catch (error) {
        console.error("Update company error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};


export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Check if the company exists before attempting to delete
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        // Delete the company
        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
    }
};