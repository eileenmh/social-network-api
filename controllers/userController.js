const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const result = await User.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get a single user by its _id and populated thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate([
        "friends",
        "thoughts",
      ]);

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new user
  /**** Example data:
      {
      "username": "lernantino",
      "email": "lernantino@gmail.com"
      }
  ****/
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add friend to a user
  async addFriend(req, res) {
    try {
      const updateUser1 = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );
      const updateUser2 = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $push: { friends: req.params.userId } },
        { new: true }
      );
      res.json({ message: "Friend added" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const updateUser1 = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      const updateUser2 = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );
      res.json({ message: "Friend removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      const thoughts = user.thoughts.map((thought) => thought.toString());
      const deleteThoughts = await Thought.deleteMany({
        _id: {
          $in: thoughts,
        },
      });

      const result = await User.deleteOne({ _id: req.params.userId });

      res.status(200).json({ message: "Success! The user has been deleted." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
