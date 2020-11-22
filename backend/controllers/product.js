const Product = require('../models/Product');

const addProduct = (req, res) => {
  console.log(req.body);
  const product = new Product({
    title: req.body.title,
    discription: req.body.discription,
    price: req.body.price,
    offerPrice: req.body.offerPrice
  })
  .save()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
  })
}

const findById = (req, res) => {
  Product.findById(req.params.id)
  .then(result => {
    res.status(200).json({
      result
    })
  })
  .catch(err => {
    console.log(err);
  })
}

const fetchAllProduct = (req, res) => {
  Product.find()
  .then(result => {
    console.log(result);
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  })
}

const addReview = (req, res) => {
  Product.findByIdAndUpdate(req.body.id,  {$push:{review:{userid:req.body.userid, comment:req.body.comment}}}, {new: true})
  .populate('review.userid')
  .then(result => {
    console.log(result);
    res.json(result);
  })
  .catch(err => {
    console.log(err);
  })
}

const deleteReview = (req, res) => {
  console.log(req.params.id);
  Product.findOneAndUpdate({"review._id": req.params.id}, {$pull:{review:{_id:req.params.id}}}, {FindAndModify: true, new:true})
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = {
  addProduct, findById, addReview, addReview, deleteReview, fetchAllProduct
}