const fs = require('fs');
const path = require('path');


const getTrackById = (req, res) => {
  const TrackPath = './public/songs/track.mp3';

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

module.exports = {getTrackById}