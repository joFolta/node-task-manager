const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  // mongoose auto-annoyingly pluralizes and lowcases "Task" model to "tasks" collection
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
