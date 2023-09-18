const userMOdel = require("../models/userModels");

const jwt=require("jsonwebtoken")
exports.register = async (req, res, next) => {
  try {
    const user = await userMOdel.create(req.body);
    const { id, username } = user;

      
      const expirationTime = 30 * 60;
    
      const token = jwt.sign(
        { id, username, exp: Math.floor(Date.now() / 1000) + expirationTime },
        process.env.SECRET_KEY
      );
    
     //console.log("process.env.SECRET_KEY", process.env.SECRET_KEY);
      
      return res.status(201).json({ id, username, token });
  } catch (error) {
      if (error.code === 11000) {
        error.message="sorry useranme is already 🚨  "
    }
  }
};
exports.login = async (req, res, next) => {
  try {
    const user = await userMOdel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json("User not found");
    }
    const { id, username } = user;
    const validPassword = await user.comparePassword(req.body.password);

      if (validPassword) {
        

         const expirationTime = 30 * 60;

         const token = jwt.sign(
           {
             id,
             username,
             exp: Math.floor(Date.now() / 1000) + expirationTime,
           },
           process.env.SECRET_KEY
         );
          //const token = jwt.sign({ id, username }, process.env.SECRET_KEY);
      
          res.status(200).json({ id, username, token });
    } else {
      throw new Error("Opps Invalid  👾  name Or password ");
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
