// CRUD create read update delete

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    db.collection("tasks")
      // .updateOne(
      //   {
      //     _id: new ObjectID("602fbe7f974651529d755b3d"),
      //   },
      //   {
      //     $inc: {
      //       age: 1,
      //     },
      //   }
      // )
      .updateMany(
        { completed: false },
        {
          $set: {
            completed: true,
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
