import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidations } from './academicFaculty.validation';

const router = Router();
router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty);

export const AcademicFacultyRoutes = router;
