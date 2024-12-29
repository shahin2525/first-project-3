import { z } from 'zod';
import { UserStatus } from './user.const';

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .min(6, 'Password must be at least 6 characters.')
    .max(20, 'password character will not be more than 20 character')
    .optional(),
});

const changeUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
export const UserValidations = {
  userValidationSchema,
  changeUserStatusValidationSchema,
};
