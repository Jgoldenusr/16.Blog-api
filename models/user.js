const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, maxLength: 30, required: true },
  name: { type: String, maxLength: 30, required: true },
  surname: { type: String, maxLength: 30, required: true },
  password: { type: String, required: true },
  isWriter: {
    type: Boolean,
    default: false,
  },
});

UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
