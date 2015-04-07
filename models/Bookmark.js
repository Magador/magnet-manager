/**
 * Created by Magador on 27/03/2015.
 */

var mongoose = require('mongoose');

var Bookmark = mongoose.Schema({
    _id: { type: String, required: true, index: { unique: true}},
    user_id: { type: mongoose.Types.ObjectId, required: true, index: true},
    media_id: { type: String, required: true},
    season_num: Number,
    episode_num: Number
});

module.exports = mongoose.model('Bookmark', Bookmark);