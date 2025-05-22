import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { registerCompany, getCompany, getCompanyById, updateCompany, deleteCompany, getAllCompanies } from '../controllers/company.controller.js';
import { uploadFields } from './../middlewares/multer.js';

const router =  express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route('/companies').get(isAuthenticated, getAllCompanies);
router.route("/update/:id").put(isAuthenticated, uploadFields, updateCompany);
router.route("/delete/:id").delete(isAuthenticated, deleteCompany);

export default router;