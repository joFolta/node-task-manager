const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// const me = new User({
//   name: "Andrew",
//   age: "Mike",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

const Task = mongoose.model("Task", {
  // mongoose auto-annoyingly pluralizes and lowcases "Task" model to "tasks" collection
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

const homework = new Task({
  description: "Finish Calculus Exersizes 15-25",
  completed: true,
});

homework
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
