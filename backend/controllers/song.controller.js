const Song  = require('../models/Songs');
const fs = require('fs');
const path = require('path');

const uploadSong = (req, res) => {
  const songUrl = "http://localhost:3000/songs/" + req.files.song[0].filename;
  const imgUrl = "http://localhost:3000/songs/" + req.files.thumbnail[0].filename;

  const song = new Song({
    title: req.body.title,
    artistName: req.body.artistname,
    song: songUrl,
    img: imgUrl,
    lan: req.body.lan,
    collectionName: req.body.collection,
  }).save()
  .then(result => {
    if(result != null){
      res.status(200).json(result);
    }
  })
  .catch(err => {
    console.log(err);
  })
  
}

const getTrackById = (req, res) => {

  const stat = fs.statSync(TrackPath)
  const fileSize = stat.size
  const range = req.headers.range;
  console.log(fileSize, range);

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
     
    const chunksize = (end-start)+1
    const file = fs.createReadStream(TrackPath, {start, end})
    const head = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'audio/mp3',
    }
     
    res.writeHead(206, head)
    file.pipe(res)
  }
  else {
    const head = {
    'Content-Length': fileSize,
    'Content-Type': 'audio/mp3',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
}

const getSongByLan = (req, res) => {
  Song.find({lan:req.params.lan}).sort({_id: -1}).limit(6)
  .then(result => {
    if(result != null){
      res.status(200).json(result);
    }
  })
}

const getSongById = (req, res)=>{
  Song.findOne({_id: req.params.id})
  .then(result => {
    if(result != null){
      res.status(200).json(result);
    }
  })
  .catch(err => {
    console.log(err)
  })
}

const getSongCollection = (req, res) => {
  Song.find({collectionName:req.params.collection})
  .then(result => {
    console.log(result);
    if(result != null){
      res.status(200).json(result);
    }
  })
}



module.exports = {
  uploadSong,
  getTrackById,
  getSongByLan,
  getSongById,
  getSongCollection
}