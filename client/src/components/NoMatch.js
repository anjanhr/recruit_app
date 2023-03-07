import React from "react";
import oops from "../assets/oops.jpg";
import { useNavigate } from "react-router-dom";

const NoMatch = (props) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("Name");

  const handleBack = () => {
    navigate(`/user/${username}/home`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3rem",
        }}
      >
        <h4>There's Nothing HERE !!!</h4>
        <button
          style={{
            backgroundColor: "Tomato",
            padding: "5px 20px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          onClick={handleBack}
        >
          Back
        </button>
      </div>
      <img
        src={oops}
        width={600}
        height={190}
        style={{ marginTop: "5rem", marginLeft: "13rem" }}
        alt="not found"
      />
    </div>
  );
};

export default NoMatch;
