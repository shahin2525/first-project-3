import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = Router();
router.post(
  '/create-academic-faculty',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/:facultyId', CourseControllers.getSingleCourse);
router.patch(
  '/:facultyId',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.get('/', CourseControllers.getAllCourse);

export const CourseRoutes = router;
