const mongoose = require("mongoose")
const bcrypt=require("bcrypt")
const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default:Date.now()
  },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
});

// bcrypt password 
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (attempt,next) {
  try {
    return await bcrypt.compare(attempt,this.password)

  } catch (err) {
    next(err)
  }
}
module.exports=mongoose.model("User",userSchema)