const bodyparser = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const userRouter = require('./routers/user.router');
const productRouter = require('./routers/product.router');
const track = require('./routers/track.router');
const song = require('./routers/song.router');


//######################## set headers #############################################
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
  next();
})

//######################## set middleware #########################################
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

const MINE_TYPE_MAP = {
  "image/jpeg": 'jpg',
  "image/png": "png",
  "image/jpg": "jpg",
  "audio/mpeg": "mp3"
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("invalid type");
    console.log(isValid);
    if(isValid){
      error = null;
    }
    cb(error, "./public/songs")
  },
  filename: (req, file, cb) => {
    const name = file.fieldname.toLowerCase().split(' ').join('_');
    const exe = MINE_TYPE_MAP[file.mimetype];
    cb(null, name + '_' + Date.now() + '.' + exe);
  }
})
app.use(multer({storage: storage}).fields([{name:'song', maxCount:1},{name:'thumbnail', maxCount:1}]));
app.use(express.static(path.join(__dirname, 'public')));

//######################## routers ################################################
//app.use(productRouter);
app.use(userRouter);
app.use(track);
app.use(song);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// })

//######################## create server ###########################################
mongoose.connect('mongodb://localhost:27017/spotifyClone', { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
  console.log("connected");
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})