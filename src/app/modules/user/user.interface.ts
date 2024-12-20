/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  changePasswordAt?: Date;
};
export interface UserModel extends Model<TUser> {
  userExists(id: string): Promise<TUser>;
  isPasswordMatch(
    plainTextPassword: string,

    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
