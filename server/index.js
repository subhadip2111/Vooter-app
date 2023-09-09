const express = require("express");

const cors = require("cors")

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const routes = require("./Routes/routes");
require("dotenv").config();

app.use(cors())
app.use(bodyParser.json());


const DBSTR = process.env.DBSTR;
mongoose
  .connect(DBSTR, {
    useNewUrlParser: true,
  })

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/api/v1", routes);

app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
