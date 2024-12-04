export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
// export interface StudentModel extends Model<TUser> {
//   // eslint-disable-next-line no-unused-vars
//   doesUserExists(id: string): Promise<boolean | null>;
// }
