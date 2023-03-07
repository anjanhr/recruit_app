import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { startGetCandidates } from "../actions/candidateAction";
import CandidateTable from "./CandidateTable";

const ViewCandidate = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetCandidates());
  }, [dispatch]);

  const candidatesData = useSelector((state) => {
    return state.candidatesData;
  });

  return (
    <div>
      <NavBar />
      <br />
      <CandidateTable candidatesData={candidatesData} />
    </div>
  );
};

export default ViewCandidate;
