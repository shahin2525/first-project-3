import { z } from 'zod';

// PreRequisiteCourses Schema
const PreRequisiteCoursesSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

// Course Schema
const CourseSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number({ required_error: 'Code is required' }),
    credits: z.number({ required_error: 'Credits are required' }),
    preRequisiteCourses: z.array(PreRequisiteCoursesSchema),
  }),
});

export { PreRequisiteCoursesSchema, CourseSchema };
