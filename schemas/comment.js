const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  
  user: {
    type: String,
    required: true,
  },

  password:{
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    required: false,
  },
  postId: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model("cccc", commentSchema);