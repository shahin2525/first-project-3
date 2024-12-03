import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Password must be string',
  }),
});
const updateAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Password must be string',
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
