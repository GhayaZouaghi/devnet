const {
  register,
  login,
  currentUser,
  listOfUsers,
} = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

// require express
const express = require("express");
const {
  registerValidator,
  validations,
  loginValidator,
} = require("../middleware/userValidator");

// require router

const router = express.Router();
//  test route
// router.get("/test", (req, res) => {
//   res.send("hiiii test");
// });

/** register route
 * @desc: register
 * @method:POST
 * @path:/register
 * @data: req.body
 */
router.post("/register", registerValidator(), validations, register);

/** login route
 * @desc: login
 * @method:POST
 * @path:/login
 * @data: req.body
 */
router.post("/login", loginValidator(), validations, login);

/** profile route
 * @desc: current user
 * @method:GET
 * @path:/current
 * @data: no data
 */

router.get("/current", isAuth, currentUser);

/* @desc: get all contacts
 * @method: get
 * @path: '/http://localhost:6000/api/contacts/'
 * @data: no
 */
// router.get("/developers", listOfUsers);

module.exports = router;
