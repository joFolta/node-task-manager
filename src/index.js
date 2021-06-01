const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

// 
// Without middleware:    new request -> run route handler
// 
// With middleware:       new request -> do something -> run route handler
// 

// Middleware function
// - use send() to proceed to route handler step
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send('GET requests are disabled')
//   } else {
//     next()
//   }
// })

// // Middleware exercise - "Site Under Maintenance"
// app.use((req, res, next) => {
//   res.status(503).send({error: "Site under maintenance. Please try again later. "})
// })

// NOTE: app.use() middleware in index.js causes it to run for all requests. We will now target the middleware to run only for specific methods in a given route. 

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
