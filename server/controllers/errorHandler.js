
//handle err



module.exports.errors = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ err: err.message || " somethig Err happen !!" });
};
module.exports.notfound = (req, res, next) => {
  const err = new Error("not Found!");
  err.status = 404;
  next(err);
};