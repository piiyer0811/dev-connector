const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Get token from the header

  const token = req.header("x-auth-token");

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  //verify token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || config.get("jwtSecret"));
    req.user = decoded.user;

    next();
  } catch (e) {
    res.status(401).json({ msg: "Token is not valid!" });
  }
};
