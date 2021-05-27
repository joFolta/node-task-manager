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

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  // create a token
  const token = jwt.sign({ _id: 'abc123' }, 'secretToSignToken', {expiresIn: '7 days'})
  // TODO REMOVE LOG 
   console.log('token', token);

  //  verify a token
  const data = jwt.verify(token, 'secretToSignToken')
  // TODO REMOVE LOG 
   console.log('data', data);
}

myFunction();
