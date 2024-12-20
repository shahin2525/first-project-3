import { Router } from 'express';

import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from '../student/student.validation';
import { FacultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';

const router = Router();
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);
// router.get('/', StudentController.getAllStudent);
// router.get('/:id', StudentController.getSingleStudent);
// router.patch('/:id', StudentController.updateStudent);
// router.delete('/:id', StudentController.deleteStudent);
export const UserRoutes = router;
