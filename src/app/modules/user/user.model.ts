import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcryptjs';
import config from '../../config';
const userSchema = new Schema<TUser>(
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

export const User = model<TUser>('User', userSchema);

export const UserMongooseSchema = {
  userSchema,
};
