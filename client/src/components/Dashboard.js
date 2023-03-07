import React from "react";
import NavBar from "./NavBar";
import workpic from "../assets/work.jpg";

const Dashboard = (props) => {
  return (
    <div>
      <NavBar />
      <div className="flex4">
        <img src={workpic} className="workpic" alt="not found" />
        <p className="flex4_item2">
          We lead in the creation and delivery of services that enable our
          clients to win in the changing world of work.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
