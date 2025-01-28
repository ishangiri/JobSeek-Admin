import {Router} from 'express';
import {getAllJobs, getOneJOb} from '../controller/applicantJobController.js';



const router = Router();

router.route('/').get(getAllJobs);
router.route('/:id').get(getOneJOb);


export default router;
