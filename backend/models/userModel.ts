import mongoose from 'mongoose';
import slugify from 'slugify';
import { trim } from 'validator';
import bcrypt from 'bcryptjs';

// Define the interface for the User
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  role: string;
  image?: string;
  dateOfBirth: Date;
  height?: {
    heightMetric: number;
    heightImperial: number;
  };
  weight?: {
    weightMetric: number;
    weightImperial: number;
  };
  symptoms?: string[];
  paymentInfo?: string;
  cart: typeof mongoose.Schema.ObjectId;
  slug: string;
  checkPassword: (candidatePassword: string, userPassword: string) => boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'A user must have a full name specified'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'A user needs a specified email address'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password for the user'],
    minLength: 8, // Minmal security = 8, Optimal security = 12, Maximum security = 15 or 16
    select: false,
    unique: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    select: false,
    validate: {
      // This only works on CREATE and SAVE!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  image: {
    type: String,
    // required: [true, 'The user must have a picture'],
  },
  dateOfBirth: {
    type: Date,
    default: Date.now(),
    // Important because some products are recommended to be taken by people in a certain age range
    required: [true, 'The user must specify their date of birth'],
  },
  height: {
    type: {
      heightMetric: {
        type: Number,
      },
      heightImperial: {
        type: Number,
      },
    },
    // Not required initially, but later if the user wants to see specific information like BMI and calories, etc.
    // required: [true, 'The user must specify their height.'],
  },
  weight: {
    type: {
      weightMetric: {
        type: Number,
      },
      weightImperial: {
        type: Number,
      },
    },
    // Not required initially, but later if the user wants to see specific information like BMI and calories, etc.
    // required: [true, 'The user must specify their weight.'],
  },
  symptoms: [String],
  paymentInfo: {
    type: String,
  },
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cart',
  },
  slug: String,
});

// DOCUMENT MIDDLEWARE
// runs before .save() and .create()
userSchema.pre('save', function (next) {
  // Converts the user name into lowercase and separates them
  // by dashes
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Password encryption usinbg bcrypt
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // bcrypt
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     console.log(changedTimestamp, JWTTimestamp);

//     return JWTTimestamp < changedTimestamp; // 100 < 200
//   }

//   // False === NOT changed
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex');

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   console.log({ resetToken }, this.passwordResetToken);

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

const User = mongoose.model('User', userSchema);

export default User;
