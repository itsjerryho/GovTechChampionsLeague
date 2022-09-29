const express = require("express");

// resultRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /result.
const resultRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

resultRoutes.route("/result").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("results")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

resultRoutes.route("/result/add").post(function (req, response) {
  console.log('req:', req);
  let db_connect = dbo.getDb();
  let myobj = {
    FirstTeam: req.body.firstTeam,
    SecondTeam: req.body.secondTeam,
    FirstTeamGoals: req.body.firstTeamGoals,
    SecondTeamGoals: req.body.secondTeamGoals,
    Group: req.body.group,
  };
  db_connect.collection("results").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

resultRoutes.route("/result/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("results").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

resultRoutes.route("/result").delete((req, response) => {
  let db_connect = dbo.getDb();
  db_connect.collection("results").deleteMany({}, function (err, obj) {
    if (err) throw err;
    console.log("All documents deleted");
    response.json(obj);
  });
});

module.exports = resultRoutes;