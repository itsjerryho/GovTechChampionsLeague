const express = require("express");

// teamRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /team.
const teamRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

teamRoutes.route("/team").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("teams")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

teamRoutes.route("/team/add").post(function (req, response) {
  console.log('req:', req);
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    groupNum: req.body.groupNum,
    registrationDate: req.body.registrationDate,
  };
  db_connect.collection("teams").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

teamRoutes.route("/team/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("teams").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

teamRoutes.route("/team").delete((req, response) => {
  let db_connect = dbo.getDb();
  db_connect.collection("teams").deleteMany({}, function (err, obj) {
    if (err) throw err;
    console.log("All documents deleted");
    response.json(obj);
  });
});

module.exports = teamRoutes;