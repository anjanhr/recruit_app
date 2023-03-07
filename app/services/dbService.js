const connection = require("../../config/database");
const instance = null;

class dbService {
  static getDbServiceInstance() {
    return instance ? instance : new dbService();
  }

  async registerUser(username, email, password, roles) {
    try {
      const response = await new Promise((resolve, reject) => {
        const queries =
          "insert into users (username, email, password, roles) values (?, ?, ?, ?);";
        connection.query(
          queries,
          [username, email, password, roles],
          (error, result) => {
            if (error) {
              reject(new Error(error.message));
            }
            resolve(result);
          }
        );
      });

      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async loginUser(email) {
    try {
      const response = await new Promise((resolve, reject) => {
        const queries = "select * from users where email = ?;";
        connection.query(queries, [email], (error, result) => {
          if (error) {
            reject(new Error(error.message));
          }
          resolve(result);
        });
      });
      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async postCandidate(body) {
    const {
      can_id,
      can_first_name,
      can_last_name,
      can_dob,
      can_email,
      can_contact_no,
      can_skill_set,
      can_experience,
      can_qualification,
      can_percentage,
      can_address,
      can_resume,
      can_cv_rec_on,
      can_sched_interview,
      can_emp_refree,
      can_supp_vendor,
    } = body;

    try {
      const response = await new Promise((resolve, reject) => {
        const queries =
          "insert into candidates ( can_id, can_first_name, can_last_name, can_dob, can_email, can_contact_no, can_skill_set, can_experience, can_qualification, can_percentage, can_address, can_resume, can_cv_rec_on,can_sched_interview, can_emp_refree, can_supp_vendor) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connection.query(
          queries,
          [
            can_id,
            can_first_name,
            can_last_name,
            can_dob,
            can_email,
            can_contact_no,
            can_skill_set,
            can_experience,
            can_qualification,
            can_percentage,
            can_address,
            can_resume,
            can_cv_rec_on,
            can_sched_interview,
            can_emp_refree,
            can_supp_vendor,
          ],
          (error, results) => {
            if (error) {
              reject(new Error(error.message));
            }
            resolve(results);
          }
        );
      });
      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async getLastCandidateID() {
    try {
      const response = await new Promise((resolve, reject) => {
        const queries =
          "select MAX(CAST(`can_id` AS UNSIGNED)) as max from candidates;";
        connection.query(queries, (error, results) => {
          if (error) {
            reject(new Error(error.message));
          }
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async showAllCandidates() {
    try {
      const response = await new Promise((resolve, reject) => {
        const queries = "select * from candidates";
        connection.query(queries, (error, results) => {
          if (error) {
            reject(new Error(error.message));
          }
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async postSchedule(body) {
    const {
      inter_round,
      date,
      time,
      scheduled_by,
      interviewer,
      resume,
      can_id,
    } = body;

    try {
      const response = await new Promise((resolve, reject) => {
        const queries =
          "insert into inter_process ( inter_round, date, time, scheduled_by, interviewer, resume, can_id) values (?, ?, ?, ?, ?, ?, ?)";
        connection.query(
          queries,
          [inter_round, date, time, scheduled_by, interviewer, resume, can_id],
          (error, results) => {
            if (error) {
              reject(new Error(error.message));
            }
            resolve(results);
          }
        );
      });
      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async showInterviewers() {
    try {
      const response = await new Promise((resolve, reject) => {
        const queries = "select * from interviewers;";
        connection.query(queries, (error, results) => {
          if (error) {
            reject(new Error(error.message));
          }
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async showCandidateInterData(id, round) {
    try {
      const response = await new Promise((resolve, reject) => {
        const queries =
          "select * from inter_process where can_id=? and inter_round=?;";
        connection.query(queries, [id, round], (error, results) => {
          if (error) {
            reject(new Error(error.message));
          }
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async showAllCandidateInterData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const queries = "select * from inter_process;";
        connection.query(queries, (error, results) => {
          if (error) {
            reject(new Error(error.message));
          }
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async updateCandidInterData(body) {
    const { inter_round, can_id, remark, selection } = body;

    try {
      const response = await new Promise((resolve, reject) => {
        const queries =
          "update inter_process set remarks=?, is_selected=? where can_id=? and inter_round=?";
        connection.query(
          queries,
          [remark, selection, can_id, inter_round],
          (error, results) => {
            if (error) {
              reject(new Error(error.message));
            }
            resolve(results);
          }
        );
      });
      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }

  async showRecResumes(date) {
    try {
      const response = await new Promise((resolve, reject) => {
        const queries =
          "select count(can_cv_rec_on) as TotalResumes from candidates where can_cv_rec_on=?";
        connection.query(queries, [date], (error, results) => {
          if (error) {
            reject(new Error(error.message));
          }
          resolve(results);
        });
      });
      return response;
    } catch (error) {
      return { dbError: error.message };
    }
  }
}

module.exports = dbService;
