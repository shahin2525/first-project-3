import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';
import AppError from '../../error/appError';
import { StatusCodes } from 'http-status-codes';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, unique: true },
    password: { type: String },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,

      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,

      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
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

userSchema.statics.doesNotUserExists = async function (id: string) {
  const notExistingUser = await User.findOne({ id });
  return !notExistingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
