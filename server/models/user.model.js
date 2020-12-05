const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    followtags: [
        {
            tageName: {type: String, require: true},
            lastSeen: {type: Number, require: true}
        }
    ],
    bookmarks: {type: Number, require: true}
    },
    { timestamps: true }
  );

const User = mongoose.model('User', userSchema);

module.exports = User;