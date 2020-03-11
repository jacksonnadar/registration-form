module.exports = async (req, res, next) => {
  try {
    if (!req.session.varified) {
      return res.redirect("/register/login");
    }
    next();
  } catch (err) {
    res.status(400).redirect("/register/login");
  }
};
