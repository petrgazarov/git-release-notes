const releaseNotes = require('git-release-notes');

module.exports = async (relativePath, fromBranch, toBranch) => {
  const OPTIONS = {
    path: relativePath,
    branch: fromBranch,
  };

  const RANGE = `${toBranch}..${fromBranch}`;
  const TEMPLATE = './markdownTemplate.ejs';

  return releaseNotes(OPTIONS, RANGE, TEMPLATE)
    .catch((error) => {
      if (error.message === 'No commits in the specified range') {
        return '';
      } else {
        console.error(error);
        process.exit(1);
      }
    });
}
