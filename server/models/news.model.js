const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema = new Schema({
    url: {type: String, require: true},
    tags: {type: [String], require: true}
    },
    { timestamps: true }
  );

const News = mongoose.model('News', newsSchema);

module.exports = News;