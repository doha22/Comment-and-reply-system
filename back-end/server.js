const http = require('http');
const express = require('express');


const cors = require('cors');
const app = express();
const router = require('./router');
const server = http.createServer(app);
var mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require('body-parser')

// require("./models/user");



const jwt = require('jsonwebtoken')

app.use(cors());
// mongodb connection 

try{

const uri = "mongodb+srv://admin:1234@cluster0.09j4d.mongodb.net/guestbook?retryWrites=true&w=majority";
    mongoose.connect(uri, { useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
      );
      const connection = mongoose.connection;
      connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
      });
    
    }catch (err) {
        console.error(err.message);
    }
  
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.use(router);
 app.use("/user", require("./routes/user"));

app.use("/home",require("./routes/messages"))


// creating middle for if site is down or not accepting request 
app.use((req , res , next)=>{
  res.status(503).send("site is currently down , try later");
 })

 server.listen(8088);























