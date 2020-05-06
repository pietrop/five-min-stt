/**
* @module trimmer
* @description trims a video or audio file 
* @author Pietro Passarelli 
* @example
```
const trim = require('./index.js');
trim({src: url, input:60, duration: 62, outputName: audioFileOutput, ffmpegBin: ffmpegBinPath}).then((resp)=>{
    console.log('trim', resp)
})
```
* @requires ffmpeg-fluent - to trim the audio or video.
*/ 

const ffmpeg = require('fluent-ffmpeg');

/**
* @function trim
* @description Trims a video or audio file 
* @param {string} src -  video or audio file path,relative to computer root 
* @param {number} input -  input point for cutting video or audio from 
* @param {number} duration - duration to cut video or audio for how long
* @param {string} outputName - desired name of the trimmed clip
* @returns {callback} config.callback - Optional callback to return when transcription has done processing. It returns output name and input.
* 
*/
const trim = ({src, input, duration, outputName, ffmpegBin})=>{
	//set ffmpeg bin path as optional
	if(ffmpegBin){
		//setting ffmpeg bin
		ffmpeg.setFfmpegPath(ffmpegBin);
	}else{
		console.warn("ffmpeg binary path not defined, so using system one. if available.")
	}

	return new Promise((resolve, reject) => {
	//running ffmpeg 
		ffmpeg(src)
			.seekInput(input)
			.setDuration(duration)
			.output(outputName)
			.on('end', 
				function() {
					resolve({outputName,input, duration});
					//optional callback 
					// console.log('done trimming')
					// if(callback){
					// 	//returning output name and input of cut
					// 	callback(outputName, input)
					// }
			})
			.on('error', (err) => {
				reject(err);
			  })
			  .run();
	})
}

module.exports = trim;