import { Model } from 'mongoose';

export type TLoginUser = {
  id: string;
  password: string;
};

export interface UserModel extends Model<TLoginUser> {
  isUserExists(id: string): number;
}
