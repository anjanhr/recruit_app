import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { startShowUser } from "../actions/userAction";
import { startGetAllCandidateInterviewProcess } from "../actions/candidateAction";

const InterviewProcess = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const candidateDetails = location.state;
  const [currCandidRounds, setCurrCandidRounds] = useState([]);

  useEffect(() => {
    dispatch(startShowUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(startGetAllCandidateInterviewProcess(redirectSuccess));
    function redirectSuccess(data) {
      const result = data.filter((ele) => {
        return ele.can_id === candidateDetails.can_id;
      });
      setCurrCandidRounds(result);
    }
  }, [dispatch]);

  const userData = useSelector((state) => {
    return state.userData;
  });

  const handleRound = (roundVal) => {
    navigate(
      `/user/${userData.username}/dashboard/candidate/${candidateDetails.can_id}/add/round`,
      { state: { candidateDetails, roundVal } }
    );
  };

  const handleInterviewView = (canId, round) => {
    const candidateID = canId;
    const username = userData.username;
    navigate(`/user/${userData.username}/dashboard/candidate/interview/table`, {
      state: { candidateID, username, candidateDetails, round },
    });
  };

  const handleBack = () => {
    navigate(`/user/${userData.username}/dashboard/view/candidate`);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Interview Process
        <button
          style={{
            backgroundColor: "tomato",
            padding: "5px 15px",
            borderRadius: "5px",
            marginLeft: "48.2rem",
            border: "1px solid black",
            cursor: "pointer",
          }}
          onClick={handleBack}
        >
          Back
        </button>
      </h1>

      <br />
      <h2> Round 1 </h2>
      <button
        disabled={currCandidRounds.length > 0}
        onClick={() => {
          handleRound(1);
        }}
        style={
          currCandidRounds.length > 0
            ? {
                backgroundColor: "grey",
                border: "2px solid black",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                marginRight: "3rem",
              }
            : {
                backgroundColor: "green",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                marginRight: "3rem",
                cursor: "pointer",
              }
        }
      >
        {currCandidRounds.length === 0 ? "Schedule Now " : "Scheduled"}
      </button>
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "2rem",
        }}
        onClick={() => {
          handleInterviewView(candidateDetails.can_id, 1);
        }}
      >
        View
      </button>
      <hr />

      {currCandidRounds.length >= 1 &&
        currCandidRounds[0].is_selected === "Yes" && (
          <>
            <h2> Round 2 </h2>
            <button
              disabled={currCandidRounds.length > 1}
              onClick={() => {
                handleRound(2);
              }}
              style={
                currCandidRounds.length > 1
                  ? {
                      backgroundColor: "grey",
                      border: "2px solid black",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginRight: "3rem",
                    }
                  : {
                      backgroundColor: "green",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginRight: "3rem",
                      cursor: "pointer",
                    }
              }
            >
              {currCandidRounds.length === 1 ? "Schedule Now " : "Scheduled"}
            </button>
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "2rem",
              }}
              onClick={() => {
                handleInterviewView(candidateDetails.can_id, 2);
              }}
            >
              View
            </button>
            <hr />
          </>
        )}
    </div>
  );
};

export default InterviewProcess;
