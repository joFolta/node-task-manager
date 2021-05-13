const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot include 'password'");
      }
    },
  },
});

// Middleware to hash password before saving to db
// https://mongoosejs.com/docs/middleware.html
// "pre" happens before the "save"
// we are using "save" for posting and patching users
userSchema.pre("save", async function (next) {
  // "this" would not be avail in arrow-function, but works with our normal function
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // "next" called when done with async operation and then actualy "save"s the user
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
