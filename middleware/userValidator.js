const { body, validationResult } = require("express-validator");


exports.registerValidator=()=> [
    body('name', 'Name is required!!').notEmpty(),
    body('email', 'email is required!!').isEmail(),
    body('password', 'Enter a password that is 6 or more characters').isLength({min: 6})

]

exports.loginValidator=()=> [
  
    body('email', 'email is required!!').isEmail(),
    body('password', 'Enter a password that is 6 or more characters').isLength({min: 6})

]

exports.validations=(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 next()
}