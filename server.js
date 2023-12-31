require("dotenv").config();
const express = require("express");
const dbConnect = require("./app/startup/dbConnect");
const { PORT } = require("./config");
const userRoute = require("./app/router/userRoutes");

const app = express();

app.use(express.json());

app.use(userRoute);

dbConnect()
  .then((val) => {
    app.listen(PORT, () => {
      console.log("server running at port no:", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
