const ffmpegBin = require('ffmpeg-static-electron');
const convertToAudio = require('./index.js');
const ffmpegBinPath = ffmpegBin.path;

// const url = 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4';
const url = './KateDarling_2018S-950k.mp4';
const audioFileOutput = './KateDarling_2018S-950k.wav';

convertToAudio({ file: url, audioFileOutput, ffmpegPath: ffmpegBinPath })
  .then((newFile) => {
    console.log(newFile);
  })
  .catch((err) => {
    console.error(err);
  });
