/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var { pluckFirstLineFromFileAsync } = require('./promiseConstructor.js');
var { getGitHubProfileAsync } = require('./promisification.js');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  /**
   * use pluckFirstLineFromFileAsync() to read the gitHub username
   * then, obtain that user's profile
   * then, write it
   * if there was an error, handle it
   */
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((user) => getGitHubProfileAsync(user))
    .then((profile) => fs.writeFileSync(writeFilePath, JSON.stringify(profile)))
    .catch ((error) => {
      console.log(`Error in exercises/basicChaining.js::fetchProfileAndWriteToFile\n${JSON.stringify(error)}`);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
