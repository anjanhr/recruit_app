import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import CandidatesTableBody from "./CandidatesTableBody";
import {
  Table,
  TextField,
  TableCell,
  TableContainer,
  IconButton,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    width: 2500,
  },
  tableContainer: {
    borderRadius: 10,
    marginTop: "0.5rem",
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
    marginTop: "0.1rem",
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

const CandidateTable = (props) => {
  const { candidatesData } = props;
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [searchText, setSearchText] = useState("");
  const [candidatesDataFilter, setCandidatesDataFilter] = useState([]);

  useEffect(() => {
    const result = candidatesData.filter((ele) => {
      return ele.can_skill_set.toLowerCase().includes(searchText);
    });
    setCandidatesDataFilter(result);
  }, [searchText]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <div>
      <TextField
        style={{ marginLeft: "0.8rem" }}
        value={searchText}
        variant="standard"
        placeholder="Search…"
        className={classes.textField}
        onChange={handleSearchText}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: searchText ? "visible" : "hidden" }}
              onClick={clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                First Name
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Last Name
              </TableCell>
              <TableCell
                style={{ width: "40px" }}
                className={classes.tableHeaderCell}
              >
                DOB
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Email</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Contact No
              </TableCell>
              <TableCell
                style={{ width: "350px" }}
                className={classes.tableHeaderCell}
              >
                Skill Sets
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Experience
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Qualification
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Percentage
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Address</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                CV/Resume
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                CV Received On
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Sched Interview On
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Employee Refree
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Supplied Vendor
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidatesDataFilter.length !== 0 ? (
              <CandidatesTableBody
                finalData={candidatesDataFilter}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            ) : (
              <CandidatesTableBody
                finalData={candidatesData}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            )}
          </TableBody>
        </Table>

        <TablePagination
          className={classes.TablePagination}
          rowsPerPageOptions={[3, 6, 10]}
          component="div"
          count={candidatesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default CandidateTable;
