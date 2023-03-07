import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableBody,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";
import { startGetCandidateInterviewProcess } from "../actions/candidateAction";
import InterviewTableBody from "./InterviewTableBody";
import { startGetAllCandidateInterviewProcess } from "../actions/candidateAction";
import { startShowUser } from "../actions/userAction";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    width: 1100,
  },
  tableContainer: {
    borderRadius: 10,
    marginTop: "2.5rem",
    margin: "10px 10px",
    maxWidth: 1040,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  TablePagination: {
    color: "green",
    fontWeight: "bold",
  },
  textField: {
    marginTop: "3rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    margin: theme.spacing(1, 0.5, 1.5),
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(0.5),
    },
    "& .MuiInput-underline:before": {
      borderBottom: `0.7px solid black`,
    },
  },
}));

const InterviewTable = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [interData, setInterData] = useState([]);
  const locationData = location.state;

  useEffect(() => {
    if (locationData.username === "Admin") {
      dispatch(
        startGetCandidateInterviewProcess(
          redirectSuccess,
          locationData.candidateID,
          locationData.round
        )
      );
      function redirectSuccess(data) {
        setInterData(data);
      }
    } else {
      dispatch(startGetAllCandidateInterviewProcess(redirectSuccess));
      function redirectSuccess(data) {
        const result = data.filter((ele) => {
          return ele.interviewer === locationData.email;
        });

        setInterData(result);
      }
    }
  }, [
    dispatch,
    locationData.candidateID,
    locationData.email,
    locationData.username,
  ]);

  const handleEditedData = () => {
    dispatch(startGetAllCandidateInterviewProcess(redirectSuccess));
    function redirectSuccess(data) {
      const result = data.filter((ele) => {
        return ele.interviewer === locationData.email;
      });
      setInterData(result);
    }
  };

  useEffect(() => {
    dispatch(startShowUser());
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBack = () => {
    if (locationData.username !== "Admin") {
      navigate(`/user/${locationData.username}/dashboard`);
    } else {
      navigate(
        `/user/${locationData.username}/dashboard/candidate/${locationData.candidateID}/intreview_process`,
        { state: locationData.candidateDetails }
      );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        View Candid Inter Process
        <button
          style={{
            backgroundColor: "tomato",
            padding: "5px 15px",
            borderRadius: "5px",
            marginLeft: "39.5rem",
            border: "1px solid black",
            cursor: "pointer",
          }}
          onClick={handleBack}
        >
          Back
        </button>
      </h1>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {locationData.username !== "Admin" && (
                <TableCell className={classes.tableHeaderCell}>
                  Inter Round
                </TableCell>
              )}
              {locationData.username !== "Admin" && (
                <TableCell className={classes.tableHeaderCell}>
                  Candidate
                </TableCell>
              )}
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>Time</TableCell>
              {locationData.username !== "Admin" && (
                <TableCell className={classes.tableHeaderCell}>
                  Scheduled By
                </TableCell>
              )}
              {locationData.username === "Admin" && (
                <TableCell className={classes.tableHeaderCell}>
                  Interviewer
                </TableCell>
              )}
              <TableCell className={classes.tableHeaderCell}>
                Is Selected
              </TableCell>

              <TableCell
                style={{ width: "350px" }}
                className={classes.tableHeaderCell}
              >
                Remarks
              </TableCell>

              <TableCell className={classes.tableHeaderCell}>Resume</TableCell>
              {locationData.username !== "Admin" && (
                <TableCell className={classes.tableHeaderCell}>
                  Edit Selection
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            <InterviewTableBody
              handleEditedData={handleEditedData}
              finalData={interData}
              page={page}
              rowsPerPage={rowsPerPage}
              locationData={locationData}
            />
          </TableBody>
        </Table>
        <TablePagination
          className={classes.TablePagination}
          rowsPerPageOptions={[3, 6, 10]}
          component="div"
          count={interData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default InterviewTable;
