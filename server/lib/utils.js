const wrapAsync = (fn) => (...args) => fn(...args).catch(args[2]);

module.exports.wrapAsync = wrapAsync;
