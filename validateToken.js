const jwt = require("jsonwebtoken");

function validateToken() {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(400).json({ message: "You shall not pass!" });
      }

      jwt.verify(token, "Oreos are the shit", (err, decode) => {
        if (err) {
          res.status(400).json({ message: "You shall not pass!" });
        }
      });

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = validateToken;
