const dbService = require("../services/dbService");
require("dotenv").config();

const statsController = {};

statsController.getRecResumes = (req, res) => {
  const date = req.query.date;

  const db = dbService.getDbServiceInstance();
  const result = db.showRecResumes(date);
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

module.exports = statsController;
