const { Schema } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (time) => new Date(time).toLocaleDateString(),
  },
});

module.exports = reactionSchema;
