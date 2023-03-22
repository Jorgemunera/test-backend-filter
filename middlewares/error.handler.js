function logsError(err, req, res, next) {
  console.log('--logsErros', err);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  console.log('--errorHandler');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('--errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = {
  logsError,
  boomErrorHandler,
  errorHandler,
};
