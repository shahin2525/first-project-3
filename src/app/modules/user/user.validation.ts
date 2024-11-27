import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .max(20, 'password character will not be more than 20 character')
    .optional(),
});

export const UserValidations = {
  userValidationSchema,
};
