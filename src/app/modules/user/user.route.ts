import { Router } from 'express';

import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from '../student/student.validation';
import { FacultyValidations } from '../faculty/faculty.validation';

const router = Router();
router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  // validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createStudent,
);
// router.get('/', StudentController.getAllStudent);
// router.get('/:id', StudentController.getSingleStudent);
// router.patch('/:id', StudentController.updateStudent);
// router.delete('/:id', StudentController.deleteStudent);
export const UserRoutes = router;
