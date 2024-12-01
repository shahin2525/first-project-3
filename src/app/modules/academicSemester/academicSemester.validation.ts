import { z } from 'zod';
import { Code, Months, Name } from './academicSemester.const';

const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...Name] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...Code] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidation,
};
