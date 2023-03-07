import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { startRecResumes } from "../actions/statsAction";
import { startGetAllCandidateInterviewProcess } from "../actions/candidateAction";

const ViewStatistics = (props) => {
  const dispatch = useDispatch();
  const date = new Date();

  const [mainDate, setMainDate] = useState(
    date.getFullYear().toString() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      date.getDate().toString().padStart(2, 0)
  );

  const [recResumesNum, setRecResumesNum] = useState("");
  const [round1ConductNum, setRound1ConductNum] = useState("");
  const [round1RejectedNum, setRound1RejectedNum] = useState("");
  const [round2ConductNum, setRound2ConductNum] = useState("");
  const [round2RejectedNum, setRound2RejectedNum] = useState("");
  const [selectedCanNum, setSelectedCanNum] = useState("");

  useEffect(() => {
    dispatch(startRecResumes(redirectSuccess, mainDate));
    function redirectSuccess(data) {
      setRecResumesNum(data[0].TotalResumes);
    }
  }, [mainDate, dispatch]);

  useEffect(() => {
    dispatch(startGetAllCandidateInterviewProcess(redirectSuccess));
    function redirectSuccess(data) {
      const allCanInterProcessData = data;

      const round1ConductedCalc = allCanInterProcessData.filter((ele) => {
        return ele.inter_round === 1 && ele.date === mainDate;
      });

      const round1RejectedCalc = allCanInterProcessData.filter((ele) => {
        return (
          ele.inter_round === 1 &&
          ele.date === mainDate &&
          ele.is_selected === "No"
        );
      });

      const round2ConductedCalc = allCanInterProcessData.filter((ele) => {
        return ele.inter_round === 2 && ele.date === mainDate;
      });

      const round2RejectedCalc = allCanInterProcessData.filter((ele) => {
        return (
          ele.inter_round === 2 &&
          ele.date === mainDate &&
          ele.is_selected === "No"
        );
      });

      const selectedCanCalc = allCanInterProcessData.filter((ele) => {
        return (
          ele.inter_round === 2 &&
          ele.date === mainDate &&
          ele.is_selected === "Yes"
        );
      });

      setRound1ConductNum(round1ConductedCalc.length);
      setRound1RejectedNum(round1RejectedCalc.length);
      setRound2ConductNum(round2ConductedCalc.length);
      setRound2RejectedNum(round2RejectedCalc.length);
      setSelectedCanNum(selectedCanCalc.length);
    }
  }, [dispatch, mainDate]);

  const handleChange = (e) => {
    const value = e.target.value;
    setMainDate(value);
  };

  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: "center" }}>Candidates Statistics</h1>
      <form>
        <div style={{ marginTop: "2rem" }}>
          <input
            style={{
              width: "250px",
              justifySelf: "start",
              padding: "10px 30px",
              border: "1.9px solid green",
              marginBottom: "0.5rem",
              borderRadius: "6px",
              fontSize: "15px",
            }}
            type="date"
            value={mainDate}
            onChange={handleChange}
          />
        </div>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "45.5%",
          marginTop: "2rem",
        }}
      >
        <label style={{ fontSize: "20px" }}>Resumes Received :</label>
        <span
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "20px",
            marginLeft: "5rem",
            padding: "3px 30px",
            borderRadius: "5px",
            border: "1px solid black",
          }}
        >
          {recResumesNum}
        </span>
      </div>
      <hr
        style={{
          marginTop: "2rem",
          width: "70%",
          marginLeft: "6rem",
        }}
      />

      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          width: "45.5%",
          justifyContent: "space-between",
        }}
      >
        <label style={{ fontSize: "20px" }}>Round 1 Conducted :</label>
        <span
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "20px",
            marginLeft: "5rem",
            padding: "3px 30px",
            borderRadius: "5px",
            border: "1px solid black",
          }}
        >
          {round1ConductNum}
        </span>
      </div>
      <hr style={{ marginTop: "2rem", width: "70%", marginLeft: "6rem" }} />

      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          width: "45.5%",
          justifyContent: "space-between",
        }}
      >
        <label style={{ fontSize: "20px" }}>Round 1 Rejected :</label>
        <span
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "20px",
            marginLeft: "5rem",
            padding: "3px 30px",
            borderRadius: "5px",
            border: "1px solid black",
          }}
        >
          {round1RejectedNum}
        </span>
      </div>
      <hr style={{ marginTop: "2rem", width: "70%", marginLeft: "6rem" }} />

      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          width: "45.5%",
          justifyContent: "space-between",
        }}
      >
        <label style={{ fontSize: "20px" }}>Round 2 Conducted :</label>
        <span
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "20px",
            marginLeft: "5rem",
            padding: "3px 30px",
            borderRadius: "5px",
            border: "1px solid black",
          }}
        >
          {round2ConductNum}
        </span>
      </div>
      <hr style={{ marginTop: "2rem", width: "70%", marginLeft: "6rem" }} />

      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          width: "45.5%",
          justifyContent: "space-between",
        }}
      >
        <label style={{ fontSize: "20px" }}>Round 2 Rejected :</label>
        <span
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "20px",
            marginLeft: "5rem",
            padding: "3px 30px",
            borderRadius: "5px",
            border: "1px solid black",
          }}
        >
          {round2RejectedNum}
        </span>
      </div>
      <hr style={{ marginTop: "2rem", width: "70%", marginLeft: "6rem" }} />

      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          width: "45.5%",
          justifyContent: "space-between",
        }}
      >
        <label style={{ fontSize: "20px" }}> Total Selected Candidates :</label>
        <span
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "20px",
            marginLeft: "5rem",
            padding: "3px 30px",
            borderRadius: "5px",
            marginBottom: "5rem",
            border: "1px solid black",
          }}
        >
          {selectedCanNum}
        </span>
      </div>
    </div>
  );
};

export default ViewStatistics;
