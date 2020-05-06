const ffmpegBin = require('ffmpeg-static-electron');
const ffprobeBin = require('ffprobe-static-electron');
const ffmpegBinPath = ffmpegBin.path;
const ffprobeBinPath = ffprobeBin.path;

const splitAudioFile = require('./index.js');

// const url = 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4';
const url = './KateDarling_2018S-950k.wav';
// const audioFileOutput = './ted-talk.wav';

splitAudioFile({ file: url, ffmpegBinPath, ffprobeBinPath }).then((resp) => {
  console.log('example usage::', resp);
});
