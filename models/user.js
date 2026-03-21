const mongoose = require("mongoose");

//Validación datos de link
const urlRegex =
  /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=\-]*)?#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: "URL de avatar no válida",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
