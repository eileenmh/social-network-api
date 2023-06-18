const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const result = await Thought.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought (push the created thought's `_id` to the associated user's thoughts array field)
  /**** Example data:
  {
     "thoughtText": "Here's a cool thought...",
     "username": "lernantino",
     "userId": "5edff358a0fcb779aa7b118b"
  }
  ****/
  async createThought(req, res) {
    try {
      const thought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });

      const updateUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought.id } },
        { new: true }
      );
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // update a thought by it's `_id`
  async updateThought(req, res) {
    try {
      const result = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // remove a thought by it's `_id`
  async deleteThought(req, res) {
    try {
      const result = await Thought.deleteOne({ _id: req.params.thoughtId });
      res
        .status(200)
        .json({ message: "Success! The thought has been deleted." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
