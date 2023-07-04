const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://MAYANK:mayankMS8952@cluster0.lr7dlna.mongodb.net/Task-List?retryWrites=true&w=majority&authMechanism=DEFAULT";
const PORT = 4000;

const taskRouter = require("./taskRouter");

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database successfully");
    app.listen(PORT, () => {
      console.log("Server is listening on PORT:", PORT);
    });
  });

  app.use("/api", taskRouter);

app.get("/", (req, res) => {
  res.send("Welcome! to my server");
});