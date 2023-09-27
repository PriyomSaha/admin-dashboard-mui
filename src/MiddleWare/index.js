const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");

const connectDB = (module.exports = async (req, res) => {
  const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
  try {
    await mongoose.connect(
      "mongodb+srv://Priyom:Test1234@cluster0.nnpbvl2.mongodb.net/testDb?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Success");
  } catch (error) {
    console.log("fail" + error);
  }
});

connectDB();

const user = require("./Controller/userController");

app.post("/api/register", user.register_user);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Runninng on Port : ${PORT}`);
});
