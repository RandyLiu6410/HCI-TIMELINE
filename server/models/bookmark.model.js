const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    name: {type: String, require: true},
    news: {type: [String], require: true},
    },
    { timestamps: true }
  );

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;