
//Use express is very easy to do work with backend side
// require('dotenv').config()
// const express = require("express");
// const { errors, notfound } = require("./controllers/errorHandler");
// const cors = require("cors")
// const bodyparser = require("body-parser")
// const app = express()
// const routes=require("./Routes/routes")

// app.get("/", (req, res) => {
//    res.json({"helllo":"world"});
// })


// const db=require("./models/db.js")
// const PORT = process.env.PORT
// app.use(cors())
// app.use(bodyparser.json())
// app.use(notfound);
// app.use("/api/auth", routes);
// app.use(errors);
// app.listen(PORT,console.log(`server is running on port ${PORT}`));



const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const routes = require("./Routes/routes");
require("dotenv").config();
app.use(bodyParser.json());

const DBSTR=process.env.DBSTR
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