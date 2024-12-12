import { Model, Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: [TPreRequisiteCourses];
};

export type TCourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};

export interface CourseModel extends Model<TCourse> {
  // eslint-disable-next-line no-unused-vars
  doesNotCourseExists(id: string): Promise<TCourse | null>;
}
