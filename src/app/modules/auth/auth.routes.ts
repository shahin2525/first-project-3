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

  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthController.refreshToken,
);
router.post(
  '/forget-password',

  validateRequest(AuthValidations.forgetPasswordValidationSchema),
  AuthController.forgetPassword,
);
// reset password

router.post(
  '/reset-password',

  validateRequest(AuthValidations.resetPasswordValidationSchema),
  AuthController.resetPassword,
);
export const AuthRoutes = router;
