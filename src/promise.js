
function func() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('error'));
    }, 3000);
  });
}

module.exports = func;
