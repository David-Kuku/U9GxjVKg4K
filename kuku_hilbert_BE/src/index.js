const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require('./models')
const app = express();
const bcrypt = require('bcrypt')

app.use(cors());
// parse application/json
app.use(bodyParser.json());

//create database connection
mongoose.connect(
  `mongodb+srv://David99:David99@cluster0.266ucss.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


//add new user
app.post('/save-data', async (req, res) => {
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt)

  const user = new userModel({
    email: req.body.email,
    password: hashedPassword
  });

  console.log({user})
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Server running successfully on 3000");
});