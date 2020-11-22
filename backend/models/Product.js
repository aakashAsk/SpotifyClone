const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Product = new schema({
  title: {type:String, require:true},
  price: {type:Number, require:true},
  offerPrice: {type:Number, require:true},
  discription: {type:String, require:true},
  review: [{userid:{type:schema.Types.ObjectId, ref:'User'}, comment:String}]
});

module.exports = mongoose.model('Product', Product);