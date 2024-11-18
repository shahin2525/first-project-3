import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';

// UserName schema
const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

// Guardian schema
const GuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

// LocalGuardian schema
const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// Main Student schema
const StudentSchema = new Schema<TStudent>({
  id: { type: String, required: true, unique: true },
  name: { type: UserNameSchema, required: true },
  gender: { type: String, enum: ['male', 'female', 'others'], required: true },
  email: { type: String, required: true, unique: true },
  dataOfBirth: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  BloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  localGuardian: { type: LocalGuardianSchema, required: true },
  profileImg: { type: String },
  isActive: { type: String, enum: ['active', 'blocked'], required: true },
});

// Exporting the Student model
const Student = model<TStudent>('Student', StudentSchema);
// 3. Create a Model.
// const User = model<IUser>('User', userSchema);
export default Student;
