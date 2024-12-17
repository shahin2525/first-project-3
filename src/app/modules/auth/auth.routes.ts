import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = Router();
router.post(
  '/login',
  validateRequest(AuthValidations.userLoginValidationSchema),
  AuthController.loginUser,
);
// router.post(
//   '/create-faculty',
//   validateRequest(FacultyValidations.createFacultyValidationSchema),
//   UserControllers.createFaculty,
// );
// router.post(
//   '/create-admin',
//   validateRequest(AdminValidations.createAdminValidationSchema),
//   UserControllers.createAdmin,
// );
// router.get('/', StudentController.getAllStudent);
// router.get('/:id', StudentController.getSingleStudent);
// router.patch('/:id', StudentController.updateStudent);
// router.delete('/:id', StudentController.deleteStudent);
export const AuthRoutes = router;
