import React, { Fragment, useEffect } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startShowUser } from "../actions/userAction";

const CandidatesTableBody = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultEntry = "* * * *";

  const { finalData, page, rowsPerPage } = props;

  useEffect(() => {
    dispatch(startShowUser());
  });

  const userData = useSelector((state) => {
    return state.userData;
  });

  const handleSchedule = (row) => {
    navigate(
      `/user/${userData.username}/dashboard/candidate/${row.can_id}/intreview_process`,
      { state: row }
    );
  };

  /* Note: don't use div tag below where the fragment is been used, 
    becuase div is not work inside MUI table */
  return (
    <Fragment>
      {finalData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, i) => (
          <Fragment key={i}>
            <TableRow>
              <TableCell>{row.can_first_name}</TableCell>
              <TableCell>
                {row.can_last_name ? row.can_last_name : defaultEntry}
              </TableCell>
              <TableCell>{row.can_dob ? row.can_dob : defaultEntry}</TableCell>
              <TableCell>{row.can_email}</TableCell>
              <TableCell>{row.can_contact_no}</TableCell>
              <TableCell>{row.can_skill_set}</TableCell>
              <TableCell>
                {row.can_experience ? row.can_experience : defaultEntry}
              </TableCell>
              <TableCell>
                {row.can_qualification ? row.can_qualification : defaultEntry}
              </TableCell>
              <TableCell>
                {row.can_percentage ? row.can_percentage : defaultEntry}
              </TableCell>
              <TableCell>
                {row.can_address ? row.can_address : defaultEntry}
              </TableCell>
              <TableCell>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={row.can_resume}
                >
                  VIEW
                </a>
              </TableCell>
              <TableCell>{row.can_cv_rec_on}</TableCell>
              <TableCell>{row.can_sched_interview}</TableCell>
              <TableCell>
                {row.can_emp_refree ? row.can_emp_refree : defaultEntry}
              </TableCell>
              <TableCell>
                {row.can_supp_vendor ? row.can_supp_vendor : defaultEntry}
              </TableCell>
              <TableCell>
                <button
                  className="schedule"
                  onClick={() => {
                    handleSchedule(row);
                  }}
                >
                  Schedule
                </button>
              </TableCell>
            </TableRow>
          </Fragment>
        ))}
    </Fragment>
  );
};

export default CandidatesTableBody;
