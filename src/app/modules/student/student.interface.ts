import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;

  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  email: string;
  dataOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  BloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;

  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  doesUserExists(id: string): Promise<boolean | null>;
}
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  doesNotUserExists(id: string): Promise<boolean | null>;
}
