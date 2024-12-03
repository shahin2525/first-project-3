import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'faculty must be string',
      required_error: 'faculty is required',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    body: z.object({
      name: z
        .string({
          invalid_type_error: 'Name must be string',
        })
        .optional(),
      academicFaculty: z
        .string({
          invalid_type_error: 'faculty must be string',
          required_error: 'faculty is required',
        })
        .optional(),
    }),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
