const mongoose = require('mongoose');
const schema = mongoose.Schema;

const User = new schema({
  name: {type:String, require: true},
  email: {type:String, require: true},
  number: {type:String, require: true},
  password: {type:String, require: true},
  date: {type:Date, require: true, default:Date.now},
  like:[{songId:{type:schema.Types.ObjectId, ref:'Song'}}],
  lastSongPlay:{
    songId:{type:schema.Types.ObjectId, ref:'Song'}, 
    songTime:{type:Number}
  },
  controls:{ 
    isRepeat:Boolean,        
    isShuffle:Boolean
  }        
});

module.exports = mongoose.model('User', User);