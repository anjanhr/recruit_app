import axios from "axios";
import cogoToast from "cogo-toast";

export const startPostCandidate = (formData, reDirectSuccess) => {
  return () => {
    axios
      .post("http://localhost:3000/user/candidate", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.dbError) {
          cogoToast.error(response.data.dbError);
        } else if (response.data.mainError) {
          cogoToast.error(response.data.mainError);
        } else if (response.data.invalidError) {
          cogoToast.error(response.data.invalidError);
        } else {
          reDirectSuccess(response.data);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const startGetCandidateID = (reDirectSuccess) => {
  return () => {
    axios
      .get("http://localhost:3000/user/candidateID", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.dbError) {
          cogoToast.error(response.data.dbError);
        } else if (response.data.mainError) {
          cogoToast.error(response.data.mainError);
        } else if (response.data.invalidError) {
          cogoToast.error(response.data.invalidError);
        } else {
          reDirectSuccess(response.data);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const startGetCandidates = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3000/user/candidates", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.dbError) {
          cogoToast.error(response.data.dbError);
        } else if (response.data.mainError) {
          cogoToast.error(response.data.mainError);
        } else if (response.data.invalidError) {
          cogoToast.error(response.data.invalidError);
        } else {
          dispatch(getCandies(response.data));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

const getCandies = (candidatesData) => {
  return {
    type: "GET_CANDIES",
    payload: candidatesData,
  };
};

export const startGetCandidateInterviewProcess = (
  reDirectSuccess,
  id,
  round
) => {
  return () => {
    axios
      .get(
        `http://localhost:3000/user/candidates/${id}/interview/process?round=${round}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.dbError) {
          cogoToast.error(response.data.dbError);
        } else if (response.data.mainError) {
          cogoToast.error(response.data.mainError);
        } else if (response.data.invalidError) {
          cogoToast.error(response.data.invalidError);
        } else {
          reDirectSuccess(response.data);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const startGetAllCandidateInterviewProcess = (reDirectSuccess) => {
  return () => {
    axios
      .get(`http://localhost:3000/candidates/interview/process`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.dbError) {
          cogoToast.error(response.data.dbError);
        } else if (response.data.mainError) {
          cogoToast.error(response.data.mainError);
        } else if (response.data.invalidError) {
          cogoToast.error(response.data.invalidError);
        } else {
          reDirectSuccess(response.data);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const startEditCandidInterProcess = (reDirectSuccess, formData) => {
  return () => {
    axios
      .put(`http://localhost:3000/candidates/interview/process`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.dbError) {
          cogoToast.error(response.data.dbError);
        } else if (response.data.mainError) {
          cogoToast.error(response.data.mainError);
        } else if (response.data.invalidError) {
          cogoToast.error(response.data.invalidError);
        } else {
          reDirectSuccess("Updated Successfully");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};
