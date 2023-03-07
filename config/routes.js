const express = require("express");
const router = express.Router();

const authentication = require("../app/middlewares/authentication");
const userController = require("../app/controllers/userController");
const candidateController = require("../app/controllers/candidateController");
const scheduleController = require("../app/controllers/scheduleController");
const interviewersController = require("../app/controllers/interviewersController");
const statsController = require("../app/controllers/statsController");

// user

router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.get("/user/account", authentication, userController.account);

// candidate

router.post(
  "/user/candidate",
  authentication,
  candidateController.addCandidate
);

router.get(
  "/user/candidateID",
  authentication,
  candidateController.getCandidateID
);

router.get(
  "/user/candidates",
  authentication,
  candidateController.getAllCandidates
);

router.get(
  "/user/candidates/:id/interview/process",
  authentication,
  candidateController.getInterData
);

router.get(
  "/candidates/interview/process",
  authentication,
  candidateController.getAllInterData
);

router.put(
  "/candidates/interview/process",
  authentication,
  candidateController.updateInterData
);

// interviewers

router.get(
  "/user/interviewers",
  authentication,
  interviewersController.getInterviewers
);

// schedule

router.post("/schedule/round", authentication, scheduleController.addSchedule);

// stats

router.get(
  "/candidates/received/resumes",
  authentication,
  statsController.getRecResumes
);

module.exports = router;
