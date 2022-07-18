const privateMessage = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Delay is over")
    }, 2000)
  })
};

module.exports = privateMessage;
