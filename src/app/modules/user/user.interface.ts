import { Model } from 'mongoose';

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
  doesNotUserExists(id: string): Promise<boolean | null>;
}
