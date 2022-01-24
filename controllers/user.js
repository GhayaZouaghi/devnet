const User = require("../model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    //   checkemail
    const userToCheck = await User.findOne({ email });

    if (userToCheck) {
      return res
        .status(400)
        .send({ errors: [{ msg: "user already exists!!!" }] });
    }
    // instance of model
    const newUser = new User({ name, email, password, phone });

    //   hash password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;
    await newUser.save();

    // token

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    return res.status(200).send({ msg: "Register success!", user: newUser, token });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Register failed!!!" }] });
  }
};

// login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email
    const userToCheck = await User.findOne({ email });
    if (!userToCheck) {
      return res.status(400).send({ errors: [{ msg: "Bad credentials!!!" }] });
    }
    // check password
    const isMatch = await bcrypt.compare(password, userToCheck.password);
    if (!isMatch) {
      return res.status(400).send({ errors: [{ msg: "Bad credentials!!!" }] });
    }

    // token

    const token = jwt.sign({ id: userToCheck._id }, process.env.SECRET_KEY);
    return res
      .status(200)
      .send({ msg: "login success....!!", user: userToCheck, token });
  } catch (error) {
    return res.status(400).send({ msg: "login failed...!!" });
  }
};

// current user 

exports.currentUser = async (req, res) => {
            res.send( req.user)
      };

exports.listOfUsers = async (req, res) => {
  try {
    const listContact = await Contact.find();
    res.status(200).send({ msg: "This is the list of contacts", listContacts });
  } catch (error) {
    res.status(400).send({ msg: "Can not get Contacts", error });
  }}