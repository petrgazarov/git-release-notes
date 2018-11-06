const { execSync } = require('child_process');

module.exports = async function shellCommand(command) {
  return execSync(command).toString('utf8');
}
