import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
router.post(
  '/login',
  validateRequest(AuthValidations.userLoginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthController.changePassword,
);
router.post(
  '/refresh-token',
  // auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthController.refreshToken,
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
