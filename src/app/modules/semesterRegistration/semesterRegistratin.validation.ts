import { z } from 'zod';
import { semesterRegistrationStatus } from './semesterRegistration.const';

export const semesterRegistrationValidationSchema = z.object({
  academicSemester: z.string(),
  status: z.enum(semesterRegistrationStatus as [string, ...string[]]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
});
