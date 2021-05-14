const express = require("express");
const { update } = require("../models/user");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    // custom findByCredentials method
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (e) {
    res.status(400).send({ error: "Could not login" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}); // https://mongoosejs.com/docs/queries.html#queries:~:text=Model.find()
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  // if request is "localhost:3000/users/12234567", req.params == { id: '12234567' }
  const _id = req.params.id;

  try {
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    // mongoose automatically converts ObjectId to string Id
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  // error message and 400 (vs 200) if trying to update a non-existent property
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach(
      (updateField) => (user[updateField] = req.body[updateField])
    );
    // where the models/users.js "save" Middleware gets executed
    await user.save();

    // findByIdAndUpdate BYPASSES mongoose (performs direct operation on the db)
    // DOESN'T work with Middleware
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    if (!user) {
      return res
        .status(404)
        .send({ error: "No matching user found. Couldn't update!" });
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ error: "No matching user to delete!" });
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
