const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  let token = req.get("authorization");

  if (token) {
    token = token.slice(7);

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({
          invalidError: "Invalid Token...",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      invalidError: "Access Denied! Unauthorized User",
    });
  }
};

module.exports = authenticateUser;
