const { logging } = require('./config.json');

module.exports = (message) => {
  if (logging) {
    console.log(`LOG: ${message}`);
  }
}
