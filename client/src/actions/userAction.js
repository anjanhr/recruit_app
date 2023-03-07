import axios from "axios";
import cogoToast from "cogo-toast";

export const startRegisterUser = (formData) => {
  return () => {
    axios
      .post("http://localhost:3000/user/register", formData)
      .then((response) => {
        if (response.data.dbError) {
          cogoToast.error(response.data.dbError);
        } else if (response.data.mainError) {
          cogoToast.error(response.data.mainError);
        } else {
          cogoToast.success(response.data);
          // reDirectSuccess();
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};

export const startLoginUser = (formData, reDirectSuccess) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3000/user/login", formData)
      .then((response) => {
        if (response.data.dbError) {
          cogoToast.error(response.data.dbError);
        } else if (response.data.mainError) {
          cogoToast.error(response.data.mainError);
        } else if (response.data.invalidError) {
          cogoToast.error(response.data.invalidError);
        } else {
          const token = response.data.token.split(" ")[1];
          localStorage.setItem("myToken", token);
          axios
            .get(`http://localhost:3000/user/account`, {
              headers: {
                Authorization: response.data.token,
              },
            })
            .then((response) => {
              if (response.data.invalidError) {
                cogoToast.error(response.data.invalidError);
              } else {
                reDirectSuccess(response.data.result);
              }
            })
            .catch((error) => {
              cogoToast.error(error.message);
            });
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};

export const startShowUser = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3000/user/account`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("myToken")}`,
        },
      })
      .then((response) => {
        if (response.data.invalidError) {
          cogoToast.error(response.data.invalidError); // token altered
        } else {
          dispatch(showUser(response.data.result));
        }
      })
      .catch((error) => {
        cogoToast.error(error.message);
      });
  };
};

const showUser = (userData) => {
  return {
    type: "SHOW_USER",
    payload: userData,
  };
};
