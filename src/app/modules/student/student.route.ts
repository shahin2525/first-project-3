import { Router } from 'express';
import { StudentController } from './student.controller';

const router = Router();
router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);
export const StudentRoutes = router;
