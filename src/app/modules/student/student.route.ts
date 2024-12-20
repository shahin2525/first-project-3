import { Router } from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
// router.post('/create-student', StudentController.createStudent);
router.use(auth(USER_ROLE.student));
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidations.UpdateStudentValidationSchema),
  StudentController.updateStudent,
);
router.delete('/:id', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudent);
export const StudentRoutes = router;
