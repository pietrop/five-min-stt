const path = require('path');
const tmp = require('tmp');
const convertToAudio = require('./convert-to-audio/index.js');
const splitAudioFile = require('./split/index.js');
const removeListOfFiles = require('./remove-list-of-files/index.js');
const recombineSegmentsOutput = require('./recombine-segments-output/index.js');

const main = async ({file, audioFileOutput, ffmpegBinPath, ffprobeBinPath, sttTranscribeFunction}) =>{
  try {
    // audioFileOutput - is optional, if not provided it creates one, 
    // and the deletes it when done, se below. 
    // if provided name/path then is developer's responsability to decide if they 
    // want to keep or delete the audio 
   let tmpAudioFileOutput = audioFileOutput;
    if(!audioFileOutput){
      const tmpFolder = tmp.dirSync({
        unsafeCleanup: true
      });
      tmpAudioFileOutput = tmp.fileSync({
        dir:     tmpFolder.name,
        prefix:  `source-${path.parse(file).base}`,
        postfix: '.wav'
      }).name;
    }
    // Convert to audio file
    const newFile =  await convertToAudio({file, audioFileOutput: tmpAudioFileOutput, ffmpegPath: ffmpegBinPath});
    // Split - list 
    const files = await splitAudioFile({file: newFile, ffmpegBinPath, ffprobeBinPath});
    // send to STT
    const transcriptionsSegments = await files.map(async (file)=>{
      const result =  await sttTranscribeFunction(file.name);
      // return adjustedResult;
      return { words: result.words, offset: file.offset, name: file.name };
    })
    const transcribedSegments = await Promise.all(transcriptionsSegments);
    // re-adjust results offsets and combine into one
    const result = recombineSegmentsOutput(transcribedSegments);
    
    // clean up - remove segmented audio files
    let filesToDelete = files;
    if(!audioFileOutput){
      filesToDelete.push({name: tmpAudioFileOutput})
    }
    removeListOfFiles(filesToDelete)
    return result;
  }catch(e){
    console.error(e)
    return e;
  }
}












    module.exports = main;