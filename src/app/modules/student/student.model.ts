import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import config from '../../config';

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
const StudentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: UserNameSchema, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    },
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
    // isDeleted: { type: Boolean, default: false },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

// virtual type
const virtual = StudentSchema.virtual('fullName');
virtual.get(function () {
  return this.name.firstName + ' ' + this.name.lastName;
});
// does user exists
StudentSchema.statics.doesUserExists = async function (_id: string) {
  const existingUser = await Student.findById(_id);
  return existingUser;
};
// does not user Exists
StudentSchema.statics.doesNotUserExists = async function (id: string) {
  const notExistingUser = await Student.findById(id);
  return !notExistingUser;
};

// to password bcrypt
StudentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const salt = bcrypt.genSaltSync(Number(config.bcrypt));
  user.password = await bcrypt.hash(user.password, salt);
  // user.password = await bcrypt.hash(user.password,bcrypt.genSaltSync(Number(config.bcrypt)))
  next();
});

StudentSchema.pre('find', function () {
  this.find({ isDeleted: { $ne: true } });
});
StudentSchema.pre('findOne', function () {
  this.find({ isDeleted: { $ne: true } });
});
StudentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// to password empty
StudentSchema.post('save', async function (doc, next) {
  // console.log(doc);
  doc.password = '';
  next();
});

// Exporting the Student model
const Student = model<TStudent, StudentModel>('Student', StudentSchema);

export default Student;
