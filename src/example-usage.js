const ffmpegBin = require('ffmpeg-static-electron');
const ffprobeBin = require('ffprobe-static-electron');
const ffmpegBinPath = ffmpegBin.path;
const ffprobeBinPath = ffprobeBin.path;
const fiveMinStt = require('./index.js');
const assemblyai = require('./index.js');

const sampleAssemblyAi = {
    "acoustic_model": "assemblyai_default",
    "audio_duration": 12.0960090702948,
    "audio_url": "https://s3-us-west-2.amazonaws.com/blog.assemblyai.com/audio/8-7-2018-post/7510.mp3",
    "confidence": 0.956,
    "dual_channel": null,
    "format_text": true,
    "id": "5551722-f677-48a6-9287-39c0aafd9ac1",
    "language_model": "assemblyai_default",
    "punctuate": true,
    "status": "completed",
    "text": "You know Demons on TV like that and and for people to expose themselves to being rejected on TV or humiliated by fear factor or.",
    "utterances": null,
    "webhook_status_code": null,
    "webhook_url": null,
    "words": [
        {
            "confidence": 1.0,
            "end": 440,
            "start": 0,
            "text": "You"
        },
        {
            "confidence": 0.96,
            "end": 10060,
            "start": 9600,
            "text": "factor"
        },
        {
            "confidence": 0.97,
            "end": 10260,
            "start": 10080,
            "text": "or."
        }
    ]
}

const url = 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4';
// const url = './KateDarling_2018S-950k.mp4';
const audioFileOutput = './KateDarling_2018S-950k.wav';

const sttTranscribeFunction = async (filePath)=>{
    // return await assemblyai({ApiKey, filePath});
    return sampleAssemblyAi;
} 

fiveMinStt({file: url,audioFileOutput,ffmpegBinPath, ffprobeBinPath, sttTranscribeFunction}).then((resp)=>{
    console.log('example usage, fiveMinStt::', JSON.stringify(resp,null,2))
})

