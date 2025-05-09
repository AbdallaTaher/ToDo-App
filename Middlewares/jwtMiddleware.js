const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ message: "Authentication failed" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Token not valid, Please Login again!" });
  }
};

module.exports = verifyToken;
