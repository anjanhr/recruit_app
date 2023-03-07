const dbService = require("../services/dbService");
require("dotenv").config();
const nodemailer = require("nodemailer");

const candidateController = {};

candidateController.addCandidate = (req, res) => {
  const body = req.body;

  const db = dbService.getDbServiceInstance();
  const result = db.postCandidate(body);
  result
    .then((response) => {
      if (response.dbError) {
        if (response.dbError.includes("Duplicate")) {
          return res.json({ dbError: "Sorry, Username is Allready Exists" });
        } else {
          return res.json(response);
        }
      } else {
        if (response.affectedRows) {
          return res.json("Added Candidate is successfull");
        } else {
          return res.json(response);
        }
      }
    })
    .catch((error) => {
      res.json({ mainError: error.message });
    });
};

candidateController.getCandidateID = (req, res) => {
  const db = dbService.getDbServiceInstance();
  const result = db.getLastCandidateID();
  result
    .then((response) => {
      if (response.dbError) {
        return res.json(response);
      }
      if (response[0].max == null) {
        return res.json("No data Found");
      } else {
        return res.json(response);
      }
    })
    .catch((error) => {
      res.json({ mainError: error.message });
    });
};

candidateController.getAllCandidates = (req, res) => {
  const db = dbService.getDbServiceInstance();
  const result = db.showAllCandidates();
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

candidateController.getInterData = (req, res) => {
  const id = req.params.id;
  const round = req.query.round;

  const db = dbService.getDbServiceInstance();
  const result = db.showCandidateInterData(id, round);
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

candidateController.getAllInterData = (req, res) => {
  const db = dbService.getDbServiceInstance();
  const result = db.showAllCandidateInterData();
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

candidateController.updateInterData = (req, res) => {
  const body = req.body;

  const db = dbService.getDbServiceInstance();
  const result = db.updateCandidInterData(body);
  result
    .then((response) => {
      if (response.dbError) {
        return res.json(response);
      } else {
        if (response.affectedRows) {
          let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "demohr300@gmail.com",
              pass: "dzwfxdgxvtuhatab",
            },
          });
          let details = {
            from: "demohr300@gmail.com",
            to: "admhr1997@gmail.com",
            subject: "Recruitment App",
            html: `<p>Please note that candidate process has been updated</></p>
            <p><b> Interviewer </b> : <span>${body.interviewer}</span></p>
            <p><b> Candid ID </b> : <span>${body.can_id}</span></p>
            <p><b>Web Site</b> : <a href="http://localhost:3000">Login Here</a>
            <p> Thank YOU! </p>`,
          };
          mailTransporter.sendMail(details, (err) => {
            if (err) {
              console.log(err.message);
            }
          });
          return res.json("Interview Is Scheduled");
          //
        } else {
          return res.json(response);
        }
      }
    })
    .catch((error) => {
      res.json({ mainError: error.message });
    });
};

module.exports = candidateController;
