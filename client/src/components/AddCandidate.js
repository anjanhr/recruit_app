import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import { startPostCandidate } from "../actions/candidateAction";
import CandidateData from "./CandidateData";
import { useDispatch } from "react-redux";
import { startGetCandidateID } from "../actions/candidateAction";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const AddCandidate = (props) => {
  const dispatch = useDispatch();
  const date = new Date();

  const [details, setDetails] = useState({
    can_id: JSON.parse(localStorage.getItem("can_id")) || "",
    can_first_name: JSON.parse(localStorage.getItem("can_first_name")) || "",
    can_last_name: JSON.parse(localStorage.getItem("can_last_name")) || "",
    can_dob: JSON.parse(localStorage.getItem("can_dob")) || "",
    can_email: JSON.parse(localStorage.getItem("can_email")) || "",
    can_contact_no: JSON.parse(localStorage.getItem("can_contact_no")) || "",
    can_skill_set: JSON.parse(localStorage.getItem("can_skill_set")) || "",
    can_experience: JSON.parse(localStorage.getItem("can_experience")) || "",
    can_qualification:
      JSON.parse(localStorage.getItem("can_qualification")) || "",
    can_percentage: JSON.parse(localStorage.getItem("can_percentage")) || "",
    can_address: JSON.parse(localStorage.getItem("can_address")) || "",
    can_resume: "",
    can_cv_rec_on:
      JSON.parse(localStorage.getItem("can_cv_rec_on")) ||
      date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, 0) +
        "-" +
        date.getDate().toString().padStart(2, 0),
    can_sched_interview:
      JSON.parse(localStorage.getItem("can_sched_interview")) ||
      date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, 0) +
        "-" +
        date.getDate().toString().padStart(2, 0),
    can_emp_refree: JSON.parse(localStorage.getItem("can_emp_refree")) || "",
    can_supp_vendor: JSON.parse(localStorage.getItem("can_supp_vendor")) || "",
  });

  const [firstColData, setFirstColData] = useState([]);
  const [secondColData, setSecondColData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    dispatch(startGetCandidateID(reDirectSuccess));
    function reDirectSuccess(value) {
      if (value[0].max) {
        localStorage.setItem("can_id", value[0].max + 1);
        setDetails({ ...details, ...{ can_id: value[0].max + 1 } });
      } else {
        setDetails({ ...details, ...{ can_id: "3001" } });
      }
    }
  }, [refresh === true, dispatch]);

  useEffect(() => {
    axios
      .get("https://outrageous-shorts-elk.cyclic.app/candidates_vertices")
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

  const handleLocalFormClear = () => {
    let keysToRemove = [
      "can_first_name",
      "can_last_name",
      "can_dob",
      "can_email",
      "can_contact_no",
      "can_skill_set",
      "can_experience",
      "can_qualification",
      "can_percentage",
      "can_address",
      "can_resume",
      "can_cv_rec_on",
      "can_sched_interview",
      "can_emp_refree",
      "can_supp_vendor",
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
      handleLocalFormClear();
    } else {
      // file related code

      if (!file) {
        alert("Please check the file process");
      }
      const storageRef = ref(storage, `files/${details.can_email + file.name}`);
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
            finalData[`can_id`] =
              finalData[`can_id`] + finalData[`can_first_name`];
            finalData[`can_resume`] = downloadURL;

            dispatch(startPostCandidate(finalData, reDirectSuccess));
            function reDirectSuccess(value) {
              alert(value);
              handleLocalFormClear();
              setRefresh(!refresh);
            }
          });
        }
      );
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

  return (
    <div>
      <NavBar />
      <br />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            columnGap: "200px",
            marginLeft: "0.8rem",
            marginTop: "1rem",
          }}
        >
          <CandidateData
            canMetaData={firstColData}
            handleFileChange={handleFileChange}
            details={details}
            handleChange={handleChange}
          />
          <CandidateData
            canMetaData={secondColData}
            handleFileChange={handleFileChange}
            details={details}
            handleChange={handleChange}
          />
        </div>
        <input
          style={{
            backgroundColor: "rgb(46, 163, 46)",
            color: "white",
            fontSize: "17px",
            padding: "0.2px 75px",
            marginLeft: "39.5rem",
            borderRadius: "3px",
            marginBottom: "3rem",
            marginTop: "2rem",
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

export default AddCandidate;
