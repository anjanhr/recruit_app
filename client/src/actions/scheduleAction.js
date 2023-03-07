import axios from "axios";
import cogoToast from "cogo-toast";

export const startPostInterProcess = (formData, reDirectSuccess) => {
  return () => {
    axios
      .post("http://localhost:3000/schedule/round", formData, {
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
