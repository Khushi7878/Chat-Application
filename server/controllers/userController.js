const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isValidUserName = await userModel.findOne({ username });
    if (isValidUserName) {
      return res.json({ msg: "username is already exist", status: false });
    }

    const isValidEmail = await userModel.findOne({ email });
    if (isValidEmail) {
      return res.json({ msg: "email is already exist", status: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    let user = await userModel.create({ username, email, password:hashPassword });
    delete user.password
    return res.json({status: true, user});
  } catch (err) {
    console.log(err);
  }
};

const login = async(req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    console.log(user)
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    console.log(err);
  }
};

const setAvatar = async(req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await userModel.findByIdAndUpdate(userId,{
      isAvatarImageSet:true,
      avatarImage
    })
    return res.json({isSet: userData.isAvatarImageSet,
    image: userData.avatarImage});
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async(req, res) => {
  try {
    const users = await userModel.find({_id: {$ne: req.params.id}}).select([
      "email",
      "username",
      "avatarImage",
      "_id"
    ])

    return res.json(users)
  } catch (err) {
    console.log(err);
  }
};
module.exports = { register, login, setAvatar, getAllUsers};
