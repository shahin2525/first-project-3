/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TFacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TFacultyName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty> {
  doesUserExists(id: string): Promise<TFaculty | null>;
}
export interface FacultyModel extends Model<TFaculty> {
  doesNotUserExists(id: string): Promise<TFaculty | null>;
}
