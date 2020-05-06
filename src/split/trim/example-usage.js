const ffmpegBin = require('ffmpeg-static-electron');
const trim = require('./index.js');
const ffmpegBinPath = ffmpegBin.path;

// const url = 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4';
const url = '../../KateDarling_2018S-950k.mp4';
const audioFileOutput = './ted-talk-trimmed.wav';

trim({src: url, input:60, duration: 62, outputName: audioFileOutput, ffmpegBin: ffmpegBinPath}).then((resp)=>{
    console.log('trim', resp)
})

