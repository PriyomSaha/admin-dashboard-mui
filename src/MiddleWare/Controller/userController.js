const User = require("../Model/userModel");
const bcryptjs = require("bcryptjs");

const securePass = async (pass, req, res) => {
  try {
    return await bcryptjs.hash(pass, 10);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const register_user = async (req, res) => {
  try {
    const sPassword = await securePass(req.body.password);

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      password: sPassword,
    });
    const userData = await User.findOne({
      $or: [{ phoneNumber: req.body.phoneNumber }],
    });

    if (userData) {
      res.status(200).send({ success: false, msg: "User Already Exists" });
    } else {
      const user_data = await user.save();
      res.status(200).send({ success: true, data: user_data });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  register_user,
};
