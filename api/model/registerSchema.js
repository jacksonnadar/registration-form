const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  email: { type: String, require: false },
  age: { type: Number, require: true },
  qualification: { type: String, require: true },
  intrest: { type: String, require: true },
  gender: { type: String, require: true },
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Register", registerSchema);
