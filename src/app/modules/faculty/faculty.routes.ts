import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidations } from './faculty.validation';

const router = Router();
router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
