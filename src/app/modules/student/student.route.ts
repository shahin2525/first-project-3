import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();
router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudent);
export const StudentRoutes = router;
