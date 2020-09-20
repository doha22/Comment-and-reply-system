const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: "message is required!",
  },
  username:{
    type: String,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply"
    }
  ],
});

module.exports = mongoose.model("Message", messageSchema);