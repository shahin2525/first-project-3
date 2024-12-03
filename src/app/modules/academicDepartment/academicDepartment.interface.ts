import { Model } from 'mongoose';
import { Types } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
};
export interface DepartmentModel extends Model<TAcademicDepartment> {
  // eslint-disable-next-line no-unused-vars
  doesDepartmentExists(id: string): Promise<TAcademicDepartment | null>;
}
