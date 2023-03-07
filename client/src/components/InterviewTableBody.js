import React, { useState, Fragment, useEffect } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import "../style.css";
import { useDispatch, useSelector } from "react-redux";
import { startShowUser } from "../actions/userAction";
import InterEditModal from "./InterEditModal";
import { startGetCandidates } from "../actions/candidateAction";

const InterviewTableBody = (props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const { finalData, page, rowsPerPage, locationData, handleEditedData } =
    props;

  useEffect(() => {
    dispatch(startShowUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(startGetCandidates());
  }, [dispatch]);

  const candidatesData = useSelector((state) => {
    return state.candidatesData;
  });

  const handleClose = () => {
    setOpen(false);
    setEditData({});
  };

  const handleInterEdit = (data) => {
    setOpen(true);
    setEditData(data);
  };

  const currCandidName = (data) => {
    const result = candidatesData.filter((ele) => {
      return ele.can_id === data.can_id;
    });
    return result[0].can_first_name;
  };

  /* Note: don't use div tag below where the fragment is been used, 
    becuase div is not work inside MUI table */
  return (
    <Fragment>
      {open && (
        <InterEditModal
          handleClose={handleClose}
          handleEditedData={handleEditedData}
          open={open}
          currData={editData}
        />
      )}
      {finalData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, i) => (
          <Fragment key={i}>
            <TableRow>
              {locationData.username !== "Admin" && (
                <TableCell>{row.inter_round}</TableCell>
              )}
              {locationData.username !== "Admin" && (
                <TableCell>{currCandidName(row)}</TableCell>
              )}
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              {locationData.username !== "Admin" && (
                <TableCell>{row.scheduled_by}</TableCell>
              )}
              {locationData.username === "Admin" && (
                <TableCell>{row.interviewer}</TableCell>
              )}
              <TableCell>{row.is_selected}</TableCell>

              <TableCell>
                {row.remarks ? (
                  row.remarks
                ) : (
                  <span style={{ fontWeight: "bold" }}>-- --</span>
                )}
              </TableCell>

              <TableCell>
                <a target="_blank" rel="noopener noreferrer" href={row.resume}>
                  VIEW
                </a>
              </TableCell>
              {locationData.username !== "Admin" && (
                <TableCell>
                  <button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "4px 15px",
                      borderRadius: "5px",
                      border: "2px solid black",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleInterEdit(row);
                    }}
                  >
                    Edit
                  </button>
                </TableCell>
              )}
            </TableRow>
          </Fragment>
        ))}
    </Fragment>
  );
};

export default InterviewTableBody;
