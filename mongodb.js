// CRUD create read update delete

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

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
    // db.collection("users").insertOne(
    //   {
    //     name: "Josh",
    //     age: 42,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 28,
    //     },
    //     {
    //       name: "Emilio",
    //       age: 21,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents!");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    db.collection("tasks").insertMany(
      [
        { description: "Clean bathroom", completed: true },
        {
          description: "Complete tutorial",
          completed: false,
        },
        { description: "Eat breakfast", completed: false },
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert documents!");
        }

        console.log(result.ops);
      }
    );
  }
);
