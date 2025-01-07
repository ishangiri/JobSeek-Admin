import {Router} from 'express';
import {getAllJobs} from '../controller/applicantJobController.js';



const router = Router();

router.route('/').get(getAllJobs);


export default router;
