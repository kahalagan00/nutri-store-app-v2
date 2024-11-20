import mongoose from 'mongoose';
import slugify from 'slugify';
import { trim } from 'validator';
import bcrypt from 'bcryptjs';

// Define the interface for the User
interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
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

userSchema.methods.checkPassword = function (
  candidatePassword: string,
  userPassword: string
) {
  candidatePassword === userPassword;

  // For decryption version
  // return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export default User;
