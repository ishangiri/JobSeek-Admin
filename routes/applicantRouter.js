import {Router} from 'express';
import {applyJob} from '../controller/applicantJobController.js';
import { validateJobID } from '../middleware/validationMiddleware.js';


const router = Router();

router.route('/:id').post( validateJobID, applyJob);



export default router;
