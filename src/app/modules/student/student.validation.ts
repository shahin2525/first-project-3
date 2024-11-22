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
  password: z.string(),
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
  isDeleted: z.boolean().optional().default(false),
});
// update validation schema
// Define Zod schemas for individual types
const UpdateUserNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const UpdateGuardianSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const UpdateLocalGuardianSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Main UpdateStudent schema
const UpdateStudentValidationSchema = z.object({
  id: z.string().optional(),
  password: z.string().optional(),
  name: UpdateUserNameSchema.optional(),
  gender: z.enum(['male', 'female', 'others']).optional(),
  email: z.string().optional(),
  dataOfBirth: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  BloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  guardian: UpdateGuardianSchema.optional(),
  localGuardian: UpdateLocalGuardianSchema.optional(),
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).optional(),
  isDeleted: z.boolean().optional(),
});

// Export the schemas for reuse

// Export the schemas and inferred TypeScript types
export { StudentValidationSchema, UpdateStudentValidationSchema };

// Export the schemas and inferred TypeScript types
