import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { startPostInterProcess } from "../actions/scheduleAction";
import RoundData from "./RoundData";
import { useDispatch, useSelector } from "react-redux";
import { startGetInterviewers } from "../actions/interviewersAction";
import { startShowUser } from "../actions/userAction";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";
// import { useDispatch, useSelector } from "react-redux";

const AddRounds = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const candidateDetails = location.state.candidateDetails;
  const roundVal = location.state.roundVal;

  const [details, setDetails] = useState({
    inter_round: JSON.parse(localStorage.getItem("inter_round")) || roundVal,
    date: JSON.parse(localStorage.getItem("date")) || "",
    time: JSON.parse(localStorage.getItem("time")) || "",
    scheduled_by: JSON.parse(localStorage.getItem("scheduled_by")) || "Admin",
    interviewer: JSON.parse(localStorage.getItem("interviewer")) || "",
    resume: "",
  });

  const [firstColData, setFirstColData] = useState([]);
  const [secondColData, setSecondColData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    axios
      .get("https://outrageous-shorts-elk.cyclic.app/schedule_vertices")
      .then((response) => {
        const mainData = response.data;
        const firstColData = mainData
          .sort((a, b) => {
            return a.row - b.row;
          })
          .filter((ele) => {
            return ele.column === "1";
          });
        const secondColData = mainData
          .sort((a, b) => {
            return a.row - b.row;
          })
          .filter((ele) => {
            return ele.column === "2";
          });
        setFirstColData(firstColData);
        setSecondColData(secondColData);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  useEffect(() => {
    dispatch(startGetInterviewers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(startShowUser());
  }, [dispatch]);

  const interviewersData = useSelector((state) => {
    return state.interviewersData;
  });

  const userData = useSelector((state) => {
    return state.userData;
  });

  const handleLocalFormClear1 = () => {
    let keysToRemove = ["date", "time", "resume"];
    for (let key of keysToRemove) {
      localStorage.removeItem(key);
      setDetails((prev) => {
        return { ...prev, [key]: "" };
      });
    }
  };

  const handleLocalFormClear2 = () => {
    let keysToRemove = [
      "inter_round",
      "date",
      "time",
      "scheduled_by",
      "interviewer",
      "resume",
    ];
    for (let key of keysToRemove) {
      localStorage.removeItem(key);
      setDetails((prev) => {
        return { ...prev, [key]: "" };
      });
    }
  };

  const handleSubmit = (e, clear) => {
    e.preventDefault();
    if (clear) {
      handleLocalFormClear1();
    } else {
      const imageRef = ref(storage, candidateDetails.can_resume);
      deleteObject(imageRef)
        .then(() => {
          if (!file) {
            alert("Please check the file process");
          }
          const storageRef = ref(
            storage,
            `files/${candidateDetails.can_email + file.name}`
          );
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error) => {
              alert("Firebase Error");
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const finalData = { ...details };
                finalData[`can_id`] = candidateDetails.can_id;
                finalData.resume = downloadURL;
                dispatch(startPostInterProcess(finalData, reDirectSuccess));
                function reDirectSuccess(value) {
                  alert(value);
                  handleLocalFormClear2();
                  setRefresh(!refresh);
                  navigate(
                    `/user/${userData.username}/dashboard/candidate/${candidateDetails.can_id}/intreview_process`,
                    { state: candidateDetails }
                  );
                }
              });
            }
          );
        })
        .catch((error) => {
          alert("Failed to delete image");
        });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
    setFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem(`${name}`, JSON.stringify(`${value}`));
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleBack = () => {
    navigate(
      `/user/${userData.username}/dashboard/candidate/${candidateDetails.can_id}/intreview_process`,
      { state: candidateDetails }
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ textAlign: "center", marginLeft: "25rem" }}>
          Set The Interview Round
        </h2>
        <button
          style={{
            backgroundColor: "tomato",
            padding: "1px 10px",
            height: "30px",
            border: "1px solid back",
            alignSelf: "center",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleBack}
        >
          Back
        </button>
      </div>

      <h2 style={{ marginLeft: "0.8rem", marginBottom: "2rem" }}>
        Name : {candidateDetails.can_first_name}
      </h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            columnGap: "200px",
            marginLeft: "0.8rem",
            marginTop: "1rem",
          }}
        >
          <RoundData
            roundMetaData={firstColData}
            details={details}
            handleChange={handleChange}
            interviewersData={interviewersData}
            handleFileChange={handleFileChange}
          />
          <RoundData
            roundMetaData={secondColData}
            details={details}
            interviewersData={interviewersData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        </div>
        <input
          style={{
            backgroundColor: "rgb(46, 163, 46)",
            color: "white",
            fontSize: "17px",
            padding: "0.2px 75px",
            marginLeft: "37.5rem",
            borderRadius: "3px",
            marginBottom: "3rem",
            cursor: "pointer",
          }}
          type="submit"
          value="Save"
        />
        <button
          style={{
            backgroundColor: "rgb(214, 64, 64)",
            color: "white",
            fontSize: "17px",
            padding: "0.2px 75px",
            marginLeft: "1rem",
            borderRadius: "3px",
            marginBottom: "3rem",
            cursor: "pointer",
          }}
          onClick={(e) => {
            handleSubmit(e, "clear");
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default AddRounds;
