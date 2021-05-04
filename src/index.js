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
