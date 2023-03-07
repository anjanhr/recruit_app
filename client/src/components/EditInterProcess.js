import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startEditCandidInterProcess } from "../actions/candidateAction";
import { startGetCandidates } from "../actions/candidateAction";
import { startShowUser } from "../actions/userAction";

const EditInterProcess = (props) => {
  const dispatch = useDispatch();
  const { currData, handleClose, handleEditedData } = props;
  const [remark, setRemark] = useState("");
  const [selection, setSelection] = useState("");

  useEffect(() => {
    dispatch(startGetCandidates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(startShowUser());
  }, [dispatch]);

  const candidatesData = useSelector((state) => {
    return state.candidatesData;
  });

  const userData = useSelector((state) => {
    return state.userData;
  });

  const currCandidDetails = candidatesData.filter((ele) => {
    return ele.can_id === currData.can_id;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      inter_round: currData.inter_round,
      can_id: currData.can_id,
      remark,
      selection,
      interviewer: userData.username,
    };

    dispatch(startEditCandidInterProcess(redirectSuccess, formData));
    function redirectSuccess(value) {
      alert(value);
      handleClose();
      handleEditedData();
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "remark") {
      setRemark(value);
    } else {
      setSelection(value);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100px",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "60px",
              justifyContent: "space-between",
            }}
          >
            <label> Candid Name </label>
            <input
              style={{
                padding: "5px 10px",
                border: "1px solid black",
                borderRadius: "5px",
              }}
              type="text"
              value={currCandidDetails[0].can_first_name}
              readOnly
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "60px",
              justifyContent: "space-between",
            }}
          >
            <label> Is Selected </label>
            <select
              style={{
                padding: "5px 10px",
                border: "1px solid black",
                borderRadius: "5px",
              }}
              name="selection"
              value={selection}
              onChange={handleChange}
              placeholder="Selection"
            >
              <option> Select Selection</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "60px",
              justifyContent: "space-between",
            }}
          >
            <label> Remarks </label>
            <textarea
              style={{
                border: "1px solid black",
                marginTop: "0.9rem",
                borderRadius: "5px",
                minWidth: "280px",
                maxWidth: "40%",
                minHeight: "70px",
                height: "100%",
                width: "100%",
              }}
              name="remark"
              value={remark}
              onChange={handleChange}
              placeholder="Remark"
              required={true}
            />
          </div>
        </div>
        <input
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "3px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "1.5rem",
          }}
          type="submit"
          value="Update"
        />
      </form>
    </div>
  );
};

export default EditInterProcess;
