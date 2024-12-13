import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = Router();
router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/:id', CourseControllers.getSingleCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.courseFacultyValidationSchema),
  CourseControllers.courseFacultyAssign,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.courseFacultyValidationSchema),
  CourseControllers.removeCourseFaculty,
);
router.delete('/:id', CourseControllers.deleteCourse);
router.get('/', CourseControllers.getAllCourse);

export const CourseRoutes = router;
