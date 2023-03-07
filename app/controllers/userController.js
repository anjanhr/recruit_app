const { hashSync, genSaltSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const dbService = require("../services/dbService");
require("dotenv").config();

const userController = {};

userController.register = (req, res) => {
  const body = req.body;
  const db = dbService.getDbServiceInstance();

  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  const result = db.registerUser(
    body.username,
    body.email,
    body.password,
    body.roles
  );

  result
    .then((response) => {
      if (response.dbError) {
        if (response.dbError.includes("ER_DUP_ENTRY")) {
          res.json({ dbError: "Sorry, User is Allready Exists" });
        } else {
          res.json(response);
        }
      } else {
        if (response.affectedRows) {
          res.json("Successfully Registered");
        } else {
          res.json(response);
        }
      }
    })
    .catch((error) => {
      res.json({ mainError: error.message });
    });
};

userController.login = (req, res) => {
  const body = req.body;
  const db = dbService.getDbServiceInstance();

  const result = db.loginUser(body.email);
  result
    .then((response) => {
      if (response.dbError) {
        res.json(response);
      }
      if (response.length === 0) {
        res.json({
          invalidError: "Invalid UserName or Password",
        });
      }
      if (response.length !== 0) {
        const match = compareSync(body.password, response[0].password);
        if (match) {
          response[0].password = undefined;
          const jsontoken = sign({ result: response[0] }, process.env.JWT_KEY, {
            expiresIn: "1d",
          });
          return res.json({ token: `Bearer ${jsontoken}` });
        } else {
          return res.json({
            invalidError: "Invalid UserName or Password",
          });
        }
      }
    })
    .catch((error) => {
      return res.json({
        mainError: error.message,
      });
    });
};

userController.account = (req, res) => {
  res.json(req.decoded);
};

module.exports = userController;
