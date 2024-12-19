import { Model } from 'mongoose';
import { USER_ROLE } from './user.const';

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  userExists(id: string): Promise<TUser>;
  isPasswordMatch(
    // eslint-disable-next-line no-unused-vars
    plainTextPassword: string,
    // eslint-disable-next-line no-unused-vars
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
