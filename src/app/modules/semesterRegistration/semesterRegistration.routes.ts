import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { SemesterRegistrationControllers } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';

const router = Router();
router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
router.get(
  '/:sRegisterId',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);
router.patch(
  '/:sRegisterId',
  validateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);

export const SemesterRegistrationRoutes = router;
