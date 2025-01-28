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
  } from '../controller/jobController.js';


  
  router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router.route('/:id').get(validateIdParam, getJob).patch( validateJobInput , validateIdParam, updateJob).delete(validateIdParam, deleteJob);
router.route('/applicants/:id').get(getAllApplicants);


export default router;