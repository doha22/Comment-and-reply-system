const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  messages: {
    type: String,
    required: "message is required!",
  },
  username:{
    type: String,
  }

});

module.exports = mongoose.model("Reply", ReplySchema);