const express = require('express');
const SongRouter = express.Router();
const songController = require('../controllers/song.controller');


SongRouter.post('/song',  songController.uploadSong);
// SongRouter.get('/gethindisong',  songController.gethindisong);
SongRouter.get('/getSongById/:id',  songController.getSongById);
SongRouter.get('/getLastPlayedSong/:id',  songController.getSongById);
SongRouter.get('/getSongCollection/:collection',  songController.getSongCollection);
SongRouter.get('/getSongByLan/:lan',  songController.getSongByLan);
module.exports = SongRouter;