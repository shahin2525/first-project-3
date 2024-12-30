import { NextFunction, Request, Response, Router } from 'express';

import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
// import { StudentValidations } from '../student/student.validation';
import { FacultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';
import { UserValidations } from './user.validation';
import { upload } from '../../utils/sendImageCludinary';
import { StudentValidations } from '../student/student.validation';

const router = Router();
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
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
  // auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.get(
  '/get-me',
  auth('admin', 'faculty', 'student'),

  UserControllers.getMe,
);
router.patch(
  '/change-user-status/:id',
  validateRequest(UserValidations.changeUserStatusValidationSchema),
  auth('admin'),

  UserControllers.changeUserStatus,
);

export const UserRoutes = router;
