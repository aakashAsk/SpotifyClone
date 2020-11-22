const User = require('../models/User');

//############## signup ################################
const signup = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    password: req.body.password,
  })
  .save()
  .then(result => {
    if(result){
      res.json({
        done: true, 
        result
      })
    }
  })
  .catch(err => {
    console.log(err);
  })

  
}

//############### login ################################
const login = (req, res) => {
  User.findOne(
    {$and:
      [
        {$or:[{email:req.body.login}, {number:req.body.login}]},
        {password:req.body.password}
      ]
    }
  )
  .then(result => {
    console.log(result);
    if(result){
      res.json(
        {...result._doc, done:true}
      )
    }
    else{
      res.json(
        {message: 'user not found', done:false}
      )
    }
  })
  .catch(err => {
    res.json({
      err: err
    })
  })
}

const lastPlayedSong = (req, res) => {
  
  User.updateOne({_id: req.body.id}, {$set:{lastSongPlay:{songId:req.body.songId, songTime:req.body.songTime}}})
  .then(result => {
    if(result.n === 1 &&  result.nModified === 1 && result.ok === 1){
      res.status(200).json(result);
    }
  })
}

const getLastPlayedSong = (req, res) => {
  User.findOne({_id: req.params.id})
  .populate('lastSongPlay.songId')
  .then(result => {
    if(result != null){
      res.status(200).json({songDetails: result.lastSongPlay.songId, currentTime:result.lastSongPlay.songTime, controls:result.controls});    
    }
  })
}

const updateControls = (req, res) => {
  User.updateOne({_id: req.body.id}, {$set:{controls:{isShuffle:req.body.controls.isShuffle, isRepeat:req.body.controls.isRepeate}}})
  .then(result => {
    console.log(result);
    if(result.n === 1 &&  result.nModified === 1 && result.ok === 1){
      res.status(200).json({done:true});
    }
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = {
  signup, login, lastPlayedSong, getLastPlayedSong, updateControls
}
