const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxLength: 128,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (time) => new Date(time).toLocaleDateString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
