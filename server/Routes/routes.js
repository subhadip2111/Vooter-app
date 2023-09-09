const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth=require("../middlewares/auth")
const pollController=require("../controllers/pollcontroller")
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/createpoll", auth, pollController.createPoll);

//show the All poll 
router.get("/", pollController.getPoll);
//get usersAllpoll
router.get("/user", auth, pollController.usersPolls);
 router.get("/:id", pollController.getPollById);
 router.post("/:id", auth, pollController.giveVote);
 router.delete("/:id",auth, pollController.deletePollById);
module.exports = router;