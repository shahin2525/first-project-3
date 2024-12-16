import { z } from 'zod';
import { Days } from './offeredCourse.const';
const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
const timeStringSchema = z.string().refine(
  (time) => {
    const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
  },
  {
    message: 'invalid time format ,expected  "HH:MM" in 24 hours format ',
  },
);
const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
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
      // endTime: z.string().regex(timeRegex, 'time is not format'),
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body?.startTime}:00`);
        const end = new Date(`1970-01-01T${body?.endTime}:00`);
        return end > start;
      },
      {
        message: 'start time should be before end time',
      },
    ),
});
// update offered corse schema
const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),

      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body?.startTime}:00`);
        const end = new Date(`1970-01-01T${body?.endTime}:00`);
        return end > start;
      },
      {
        message: 'start time should be before end time',
      },
    ),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
