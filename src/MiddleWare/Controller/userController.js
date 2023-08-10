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
      name: req.body.name,
      email: req.body.email,
      password: sPassword,
      // image: req.file.filename,
      type: req.body.type,
      mobile: req.body.mobile,
    });
    const userData = await User.findOne({
      $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
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
