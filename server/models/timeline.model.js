const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timelineSchema = new Schema({
    tagName: {type: String, require: true},
    news: {type: [String], require: true}
    },
    { timestamps: true }
  );

const Timeline = mongoose.model('Timeline', timelineSchema);

module.exports = Timeline;