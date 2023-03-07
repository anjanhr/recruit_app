const dbService = require("../services/dbService");
require("dotenv").config();

const interviewersController = {};

interviewersController.getInterviewers = (req, res) => {
  const db = dbService.getDbServiceInstance();
  const result = db.showInterviewers();
  result
    .then((response) => {
      if (response.dbError) {
        return res.json(response);
      } else {
        return res.json(response);
      }
    })
    .catch((error) => {
      res.json({ mainError: error.message });
    });
};

module.exports = interviewersController;
