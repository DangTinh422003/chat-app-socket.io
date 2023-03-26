const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: String,
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);
