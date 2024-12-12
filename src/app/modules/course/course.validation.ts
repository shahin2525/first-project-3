import { z } from 'zod';

// PreRequisiteCourses Schema
const PreRequisiteCoursesSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

// Course Schema
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number({ required_error: 'Code is required' }),
    credits: z.number({ required_error: 'Credits are required' }),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(PreRequisiteCoursesSchema).optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number({ required_error: 'Code is required' }).optional(),
    credits: z.number({ required_error: 'Credits are required' }).optional(),
    preRequisiteCourses: z.array(PreRequisiteCoursesSchema).optional(),
  }),
});
// course faculty validation schema
const createCourseFacultyValidationSchema = z.object({
  body: z.object({
    course: z.string(),
    faculties: z.array(z.string()),
  }),
});
export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  createCourseFacultyValidationSchema,
};
