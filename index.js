const branchArguments = process.argv.slice(2).map(a => a.split('='));
const config = require('./config.json');
const log = require('./log');
const pullLatestGitCommits = require('./pullLatestGitCommits');
const generateReleaseNotes = require('./generateReleaseNotes');
const fs = require('fs');
const currentDateTime = require('./currentDateTime');

let fromBranch = branchArguments.find((a => a[0] === 'fromBranch'));
let toBranch = branchArguments.find((a => a[0] === 'toBranch'));

if (!fromBranch) {
  log(`fromBranch not provided, using "${config.defaults.fromBranch}"`);
  fromBranch = config.defaults.fromBranch;
} else {
  fromBranch = fromBranch[1];
}

if (!toBranch) {
  log(`toBranch not provided, using "${config.defaults.toBranch}"`);
  toBranch = config.defaults.toBranch;
} else {
  toBranch = toBranch[1];
}

async function clauseGitReleaseNotes() {
  let output = `# Git release notes ${currentDateTime()}\n\n`
  let noChangesRepos = '';

  for (let repositoryName in config.repositories) {
    const relativePath = config.repositories[repositoryName];

    log(`Fetching latest git commits for ${repositoryName}`);
    await pullLatestGitCommits(relativePath, [fromBranch, toBranch]);

    log(`Generating git release notes...`);
    await generateReleaseNotes(relativePath, fromBranch, toBranch).then(releaseNotes => {
      if (releaseNotes) {
        output += `## ${repositoryName}\n${releaseNotes}\n`;
      } else {
        noChangesRepos += `## ${repositoryName}\nNo changes since last deploy\n\n`;
      }
    });
  }

  output += noChangesRepos;

  fs.writeFile("./output.md", output, (err) => {
    if (err) {
      console.log(err);
    } else {
      log('Done. See output.md for release notes');
    }
  });
}

clauseGitReleaseNotes();
