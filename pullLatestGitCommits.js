const shellCommand = require('./shellCommand');
const config = require('./config');

module.exports = async (relativePath, branches) => {
  let currentRepo;

  await shellCommand(`cd ${relativePath} && git fetch`);

  branches.forEach(async (branch) => {
    await shellCommand(`cd ${relativePath} && git checkout ${branch} && git pull ${config.remoteName} ${branch}`);
  });

  await shellCommand(`cd ${relativePath} && git checkout master`);
}
