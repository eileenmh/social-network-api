const { User } = require("../models");

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
  async getSingleUser(req, res) {},

  // create a new user
  // Example data:
  // {
  // "username": "lernantino",
  // "email": "lernantino@gmail.com"
  // }
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {},
};
