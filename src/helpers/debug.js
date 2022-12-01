const log = (err) => {
  if (process.env.NODE_ENV === "production") {
    // Production logging
  } else {
    console.log(err);
  }
};

const logExceptions = (func) =>
  async function () {
    try {
      return await func(...arguments);
    } catch (err) {
      log(err);
      throw err;
    }
  };

module.exports = {
  log,
  logExceptions,
};
