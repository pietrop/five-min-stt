const adjustTimecodeOffset = require('./adjust-timecode-offset/index.js');
const combineSegments = require('./combine-segments/index.js');

// re-adjust results offsets and combine into one
const recombineSegmentsOutput = (transcribedSegments) => {
  // add offsets to individual timecodes of words in chuncked results segments
  const transcribedSegmentsWithOffset = transcribedSegments.map(({ words, offset }) => {
    return adjustTimecodeOffset({ words, offset });
  });
  // combined chunked results into one, sorting by offset, and then combining words into one list
  const result = combineSegments(transcribedSegmentsWithOffset);
  return result;
};

module.exports = recombineSegmentsOutput;
