// Check username, password in post(login) request
//if exist create new JWT
//send back to req.body
//setup authentication so only the request with JWT can access the dashboard
const jwt = require("jsonwebtoken");
const {BadRequestError} = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(username, password);
  res.status(200).json({ msg: "user created", token });
};
const dashboard = async (req, res) => {
    console.log(req.user)
  const luckyNUmber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNUmber}`,
  });
};
module.exports = {
  login,
  dashboard,
};
