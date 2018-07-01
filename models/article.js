const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: { type: String, required: true, index: { unique: true } },
    url: { type: String, required: true },
    date: { type: String, default: Date.now },
    saved: { type: Boolean, default: false },
    note: { type: String },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;