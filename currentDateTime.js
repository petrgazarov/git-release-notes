module.exports = () => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };
  const now = new Date();

  return now.toLocaleDateString("en-US", options);
}
