const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAuth = async (req, res, next) => {
  try {
    // check token

    const token = req.headers["authorization"];
    //check to see if there is no token in header
    if (!token) {
      return res
        .status(401)
        .send({ errors: [{ msg: "You are not authorized" }] });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //  find the user
    const userToFind = await User.findOne({ _id: decoded.id });
    if (!userToFind) {
      return res
        .status(401)
        .send({ errors: [{ msg: "You are not authorized" }] });
    }

    req.user = userToFind;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ errors: [{ msg: "You are not authorized" }] });
  }
};

module.exports = isAuth;
