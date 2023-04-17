const express = require("express");
const app = express();
// const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const cors = require("cors");
const dotenv = require("dotenv").config();
const URL = process.env.DB;
const DB = "Crud";

var ObjectId=require('mongodb').ObjectId;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/userspost", async function (request, response) {
    try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("Crud");
     await db.collection("users_crud").insertOne(request.body);
      await connection.close();
      response.json({
        message: "User post!",
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/users",async function (request, response) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Crud");
    let user1 = await db.collection("users_crud").find().toArray();
    
    //   .find({ userid: mongodb.ObjectId(request.userid) })
    //   .toArray();
    await connection.close();
    response.json(user1);
    } catch (error) {
    console.log(error);
  }
});

  
app.get("/users/:id",async function (request, response) {
  try {
    const connection = await mongoClient.connect(URL);
    console.log(connection);
    const db = connection.db("Crud");  
    let user2 = await db.collection("users_crud").findOne({_id:new ObjectId(request.params.id)});
    console.log(user2);
    //   .find({ userid: mongodb.ObjectId(request.userid) })
    //   .toArray();
    await connection.close();
    response.json(user2);
  } catch (error) {
    console.log(error);
  }
});

app.put("/users/:id", async function (request, response) {
  try {
    const connection = await mongoClient.connect(URL);
    console.log(connection);
    const db = connection.db("Crud");
    let user3 = await db.collection("users_crud").findOneAndUpdate({_id:new ObjectId(request.params.id)},{$set:request.body});
    console.log(user3);
    //   .find({ userid: mongodb.ObjectId(request.userid) })
    //   .toArray();
    await connection.close();
    response.json(user3);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/users/:id", async function (request, response) {
  try {
    const connection = await mongoClient.connect(URL);
    console.log(connection);
    const db = connection.db("Crud");
    let user4 = await db.collection("users_crud").deleteOne({_id:new ObjectId(request.params.id)});
    console.log(user4);
    //   .find({ userid: mongodb.ObjectId(request.userid) })
    //   .toArray();
    await connection.close();
    response.json(user4);
  } catch (error) {
    console.log(error);
  }
});




app.listen((process.env.PORT || 3001));
