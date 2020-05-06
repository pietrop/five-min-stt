/**
 * @function parse
 * @description Takes STT Service json and adds time offest onto each word.
 * this is so that each chunk of audio that has been transcribed separately can be joined back togethere.
 * @param {Object[]} data - array list of transcription json with IBM specs
 * @param {number} offset - number offset of the chunked clip relative to original source audio
 * @returns {Object} - same json STT transcription specs(but with offset).
 */

'use strict';
function adjustTimecodeOffset({ words, offset }) {
  //TODO: not sure if this is necessary. eg when is the case in which offset would be undefined?
  if (typeof offset === 'undefined') {
    offset = 0;
  }
  const wordsResults = words.map((word) => {
    // add time offset for each word start and end time
    return {
      text: word.text,
      start: word.start + offset,
      end: word.end + offset,
    };
  });
  return { words: wordsResults, offset };
}
module.exports = adjustTimecodeOffset;
