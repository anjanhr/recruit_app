const dbService = require("../services/dbService");
require("dotenv").config();
const nodemailer = require("nodemailer");

const scheduleController = {};

scheduleController.addSchedule = (req, res) => {
  const body = req.body;

  const db = dbService.getDbServiceInstance();
  const result = db.postSchedule(body);
  result
    .then((response) => {
      if (response.dbError) {
        if (response.dbError.includes("Duplicate")) {
          return res.json({ dbError: "Sorry, Its Allready Exists" });
        } else {
          return res.json(response);
        }
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
            to: body.interviewer,
            cc: "admhr1997@gmail.com",
            subject: "Recruitment App",
            html: `<p>Please note that interview has been scheduled</></p>
            <p><b>Date</b> : <span>${body.date}</span></p>
            <p><b>Time</b> : <span>${body.time}</span></p> 
            <p><b>Resume Link</b> : <span>${body.resume}</span></p>
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

module.exports = scheduleController;
