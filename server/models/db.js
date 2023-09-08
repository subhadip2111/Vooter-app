const mongoose = require('mongoose')
mongoose.set("debug", true);
mongoose.Promise = global.Promise;


mongoose.connect(
  "mongodb+srv://subhadipshee20010521:79LVOSZM7apN0hBS@cluster0.0v3vvoo.mongodb.net/?retryWrites=true&w=majority"
);

//
module.exports.User= require("./userModels")

module.exports.Poll=require("./pollesmodel")