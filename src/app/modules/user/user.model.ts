import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';
import AppError from '../../error/appError';
import { StatusCodes } from 'http-status-codes';
import { UserStatus } from './user.const';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, select: 0 },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,

      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,

      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
    changePasswordAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
// to password bcrypt
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.password) {
    const salt = bcrypt.genSaltSync(Number(config.bcrypt));
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

// to password empty
userSchema.post('save', async function (doc, next) {
  // console.log(doc);
  doc.password = '';
  next();
});

// if user exists

userSchema.pre('save', async function (next) {
  const doesUserExists = await User.findOne({
    id: this.id,
  });
  if (doesUserExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'user is already exists');
  }
  next();
});
// is login in id match

userSchema.statics.userExists = async function (id: string) {
  const existingUser = await User.findOne({ id }).select('+password');
  return existingUser;
};

// change password timesAt
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  // console.log(passwordChangedTimestamp, jwtIssuedTimestamp);
  const passwordChangeTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangeTime > jwtIssuedTimestamp;
};

// is password match
userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  const passwordIsMatch = bcrypt.compare(plainTextPassword, hashedPassword);
  return passwordIsMatch;
};
export const User = model<TUser, UserModel>('User', userSchema);
