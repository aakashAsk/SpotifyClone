const mongoose = require('mongoose');
const { schema } = require('./User');
const SongSchema = mongoose.Schema;

const Song = new SongSchema({
  title: {type:String, required:true},
  artistName: {type:String, required:true},
  song: {type:String, required:true},
  img: {type:String, required:true},
  lan: {type:String, required:true},
  collectionName: {type:String},
  likes: [{userid:{type:SongSchema.Types.ObjectId, ref:'User'}}]
});

module.exports = mongoose.model('Song', Song);