import {Router} from 'express';
import {applyJob, getOneJOb} from '../controller/applicantJobController.js';
import {  validateJobID } from '../middleware/validationMiddleware.js';
import { getApplicant } from '../controller/applicantController.js';
import upload from '../middleware/multerMiddleware.js';


const router = Router();
router.route('/jobs/:id').get(validateJobID, getOneJOb);
router.route('/applyJob/:id').post( validateJobID,  upload.single('resume'), applyJob);
router.get('/getApplicant', getApplicant);


export default router;
