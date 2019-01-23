const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");


const router = express.Router();


const dbRoute = "mongodb://Person:PersonPerson1@ds211265.mlab.com:11265/cookingapp";


mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
  );
// im setting up my constants and requires here to start the server for my app. 
// i want to have an express server and a react server so i can deploy to heroku 


let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
  app.listen(PORT, () => {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });