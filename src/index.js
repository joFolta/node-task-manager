const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.json()); // parses incoming JSON to an object

app.post("/users", (req, res) => {
  console.log(req.body); // without app.use(express.json()) req.body is undefined
  res.send("testing...");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
