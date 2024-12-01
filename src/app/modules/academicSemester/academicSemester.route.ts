import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { academicSemesterValidations } from './academicSemester.validation';

const router = Router();
router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidations.createAcademicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);
// router.get('/', StudentController.getAllStudent);
// router.get('/:id', StudentController.getSingleStudent);
// router.patch('/:id', StudentController.updateStudent);
// router.delete('/:id', StudentController.deleteStudent);
export const AcademicSemesterRoutes = router;
