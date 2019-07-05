const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = {
  title: { type: String, required: [true, "Tytuł wpisu jest wymagany"] },
  description: { type: String, required: [true, "Wpis jest wymagany"] },
  date: { type: Date, default: Date.now }
};

const newsSchema = new Schema(schema);

module.exports = mongoose.model("News", newsSchema);
