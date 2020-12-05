const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    source: {type: String, require: true},
    title: {type: String, require: true},
    context: {type: [String], require: true},
    postTime: {type: Number, require: true},
    country: {type: String, require: true},
    tags: {type: [String], require: true},
    type: {type: String, require: true},
    },
    { timestamps: true }
  );

const News = mongoose.model('News', newsSchema);

module.exports = News;