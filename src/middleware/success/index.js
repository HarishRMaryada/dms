module.exports = (req, res, next) => {
  if (req.route && req.route.path) {
    res.json({
      success: true,
      data: res.data,
    });
    res.end();
  } else {
    next();
  }
};
