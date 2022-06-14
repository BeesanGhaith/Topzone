const usersModel = require("../database/models/usersSchema");

// This function to create a new user
const createNewUser = (req, res) => {
  const { email, name, password, country } = req.body;

  const user = new usersModel({
    email,
    name,
    password,
    country,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Success User Added",
        user: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

module.exports = {
  createNewUser,
};
