import { z } from 'zod';
import { Days } from './offeredCourse.const';
const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),

    // academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string().regex(timeRegex, 'time is not format'),
    endTime: z.string().regex(timeRegex, 'time is not format'),
  }),
});
// update offered corse schema
const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),

    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
