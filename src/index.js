const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parses incoming JSON to an object
app.use(userRouter); // allows use of another express.Router
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const bcrypt = require("bcrypt");

const myFunction = async () => {
  const password = "Red12345!";
  const hashedPassword = await bcrypt.hash(password, 8);

  console.log(password);
  console.log(hashedPassword);

  const isMatch = await bcrypt.compare("red12345!", hashedPassword);
  // TODO REMOVE LOG
  console.log("isMatch", isMatch);
};

myFunction();
