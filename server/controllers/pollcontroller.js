const pollMOdel = require("../models/pollesmodel");

const userMOdel = require("../models/userModels");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { error } = require("console");

exports.createPoll = async function (req, res, next) {
  try {
    const { id } = req.decoded;

    const user = await userMOdel.findById(id);

    const { question, options } = req.body;
    const poll = await pollMOdel.create({
      question,
      user,
      options: options.map((option) => ({
        option,
        votes: 0,
      })),
    });

    user.polls.push(poll._id);
    await user.save();
    return res.status(201).json({ ...poll._doc, user: user._id });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.getPoll = async function (req, res, next) {
  try {
    const polls = await pollMOdel.find().populate("user", ["username", "id"]);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.usersPolls = async function (req, res, next) {
  try {
    const { id } = req.decoded;
    const user = await userMOdel.findById(id).populate("polls");

    return res.status(200).json(user.polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.getPollById = async function (req, res, next) {
  try {
    const { id } = req.params;

    const poll = await pollMOdel
      .findById(id)
      .populate("user", ["username", "id"]);
    if (!poll) return res.status(404).send("no poll found")
    return res.status(200).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
//hardest challenge -- But i did it
exports.giveVote = async function (req, res, next) {

try {
    
  const { id: pollId } = req.params;
  const { id: userId } = req.decoded;

    const { answer } = req.body;
    if (answer) {
        const poll = await pollMOdel.findById(pollId)
        if(!poll) return res.status(404).send("Opps no poll Found!")
    
        const vote = poll.options.map(option => {
            if (option.option === answer) {
                return {
                    option: option.option,
                    _id: option._id,
                    votes:option.votes+1
                };
            } else {
                return option;
            }
        }
            
            
           )
        if (poll.voted.filter(user =>
            user.toString() === userId) <= 0) {
        //push the userid when he/or she voted     
            poll.voted.push(userId)
            poll.options = vote
            await poll.save()

            return  res.status(202).json(poll)
    }
        else {
        return  res.send("already voted") 
    }
    } else {
         return res.send("  NO ans provided"); 
    }
    
    
    
} catch (error) {
     error.status = 400;
     next(error);
}


};
exports.deletePollById = async function (req, res, next) {
  try {
    const { id: pollId } = req.params;
    const { id: userId } = req.decoded;
    const poll = await pollMOdel.findById(pollId);

    if (!poll) {
      throw new Error("No Poll found");
    }

    if (poll.user.toString() !== userId) {
      throw new Error(" Unauthorized access");
    }

    await poll.deleteOne();
    res.status(202).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
