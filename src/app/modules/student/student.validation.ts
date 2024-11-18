import { z } from 'zod';

// Zod schema for TUserName
const UserNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

// Zod schema for TGuardian
const GuardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Zod schema for TLocalGuardian
const LocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Zod schema for TStudent
const StudentValidationSchema = z.object({
  id: z.string(),
  name: UserNameSchema,
  gender: z.enum(['male', 'female', 'others']),
  email: z.string().email(),
  dataOfBirth: z.string(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  BloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']),
});

// Export the schemas and inferred TypeScript types
export {
  UserNameSchema,
  GuardianSchema,
  LocalGuardianSchema,
  StudentValidationSchema,
};

// Example usage:
// const student = StudentSchema.parse(data); // Validate and parse data
