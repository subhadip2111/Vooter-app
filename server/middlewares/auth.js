const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const [, token] = authorizationHeader.split(" ");

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token is invalid or expired" });
    }

    req.decoded = decoded;
    next();
  });
};
