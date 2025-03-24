import {Router} from 'express';
import {applyJob, getAppliedJobs, getOneJOb} from '../controller/applicantJobController.js';
import {  validateJobID } from '../middleware/validationMiddleware.js';
import { getApplicant } from '../controller/applicantController.js';
import { updateApplicantAvatar, updateApplicant } from '../controller/userController.js';
import upload from '../middleware/multerMiddleware.js';
import { validateApplicantUpdate } from '../middleware/applicantAuthMiddleware.js';



const router = Router();
router.route('/jobs/:id').get(validateJobID, getOneJOb);
router.route('/applyJob/:id').post( validateJobID,  upload.single('resume'), applyJob);
router.get('/getApplicant', getApplicant);
router.patch('/updateApplicantAvatar', upload.single('avatar'), updateApplicantAvatar);
router.route('/updateApplicant').patch(validateApplicantUpdate, updateApplicant); 
router.route('/getAppliedJobs').get(getAppliedJobs);
export default router;
