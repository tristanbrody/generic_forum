const authMiddleware = (req, res, next) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    console.log(`Found User Session`.green);
    next();
  } else {
    console.log(`No User Session Found`.red);
    res.redirect("https://google.com");
  }
};

module.exports = { authMiddleware };
