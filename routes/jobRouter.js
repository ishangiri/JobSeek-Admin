import { Router } from 'express';
const router = Router();
 
import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js';


import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    getAllApplicants,
    updateApplicantStatus,
    scheduleInterview
  } from '../controller/jobController.js';


  
  router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router.route('/:id').get(validateIdParam, getJob).patch( validateJobInput , validateIdParam, updateJob).delete(validateIdParam, deleteJob);
router.route('/applicants/:id').get(getAllApplicants);
router.route('/applicant/:applicantId/job/:id').patch(validateIdParam, updateApplicantStatus);
router.route('/applicant/:applicantId/schedule-interview/job/:id').post(validateIdParam, scheduleInterview);


export default router;