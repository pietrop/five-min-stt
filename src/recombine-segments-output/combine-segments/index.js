function combineSegments(data) {
  //results list
  let out = [];
  //order by offset
  const sortedData = data.sort((a, b) => {
    return a.offset - b.offset;
  });
  //concat json transcription for individual audio clips into one json
  sortedData.forEach((data) => {
    out = out.concat(data.words);
  });
  //return resuls list, output json of transcription IBM Specs
  return out;
}

module.exports = combineSegments;
