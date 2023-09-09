require("dotenv").config();
const mongoose = require("mongoose");
const pollMOdel = require("../server/models/pollesmodel");
const userMOdel = require("../server/models/userModels");
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DBSTR);


const users = [
  { username: "username", password: "12345678" },
  { username: "subhadip", password: "12345678" },
];

const polls = [
  {
    question: "Which is the best JavaScript framework",
    options: ["Angular", "React", "VueJS"],
  },
  { question: "Who is the best mutant", options: ["Wolverine", "Deadpool"] },
  { question: "Truth or dare", options: ["Truth", "Dare"] },
  { question: "Boolean?", options: ["True", "False"] },
];

const seed = async () => {
  try {
    await userMOdel.deleteMany();
    console.log("DROP ALL USERS");

    await pollMOdel.deleteMany();
    console.log("DROP ALL POLLS");

    await Promise.all(
      users.map(async (user) => {
        const data = await userMOdel.create(user);
        await data.save();
      })
    );
    console.log("CREATED USERS", JSON.stringify(users));

    await Promise.all(
      polls.map(async (poll) => {
        poll.options = poll.options.map((option) => ({ option, votes: 0 }));
        const data = await pollMOdel.create(poll);
        const user = await userMOdel.findOne({ username: "username" });
        data.user = user;
        user.polls.push(data._id);
        await user.save();
        await data.save();
      })
    );
    console.log("CREATED POLLS", JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  }
};

seed();
