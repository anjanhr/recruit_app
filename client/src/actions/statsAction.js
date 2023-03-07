import axios from "axios";
import cogoToast from "cogo-toast";

export const startRecResumes = (reDirectSuccess, date) => {
  return () => {
    axios
      .get(`http://localhost:3000/candidates/received/resumes?date=${date}`, {
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
