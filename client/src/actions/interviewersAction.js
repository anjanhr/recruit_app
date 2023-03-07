import axios from "axios";
import cogoToast from "cogo-toast";

export const startGetInterviewers = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:3000/user/interviewers", {
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
          dispatch(showInterviewers(response.data));
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

const showInterviewers = (userData) => {
  return {
    type: "GET_INTER",
    payload: userData,
  };
};
