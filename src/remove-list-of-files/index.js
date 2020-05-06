const fs = require('fs');
const removeListOfFiles = (list) => {
  //removing temp audio files
  if (list.length > 1) {
    list.forEach(function (d) {
      try {
        fs.unlinkSync(d.name);
      } catch (e) {
        console.error(`there was an error deleting: ${d.path}`, e);
      }
    });
  }
};

module.exports = removeListOfFiles;
