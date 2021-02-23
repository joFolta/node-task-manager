const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
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
});

const me = new User({
  name: "  Andrew       ",
  email: "great@email.co.kr    ",
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error!", error);
  });

// const Task = mongoose.model("Task", {
//   // mongoose auto-annoyingly pluralizes and lowcases "Task" model to "tasks" collection
//   description: {
//     type: String,
//   },
//   completed: {
//     type: Boolean,
//   },
// });

// const homework = new Task({
//   description: "Finish Calculus Exersizes 15-25",
//   completed: true,
// });

// homework
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });
