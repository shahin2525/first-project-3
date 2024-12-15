import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { OfferedCourseControllers } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = Router();
router.post(
  '/create-offer-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);
router.get('/', OfferedCourseControllers.getAllOfferedCourse);

export const OfferedCourseRoutes = router;
