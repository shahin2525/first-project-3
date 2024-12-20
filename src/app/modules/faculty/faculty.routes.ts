import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
router.use(auth(USER_ROLE.admin, USER_ROLE.faculty));
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculty);

export const FacultyRoutes = router;
