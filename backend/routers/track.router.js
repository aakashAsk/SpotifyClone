const express = require('express');
const track = express.Router();
const trackController = require('../controllers/trackController');

track.get('/track', trackController.getTrackById);

module.exports = track;