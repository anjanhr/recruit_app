import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../style.css";
import { startShowUser } from "../actions/userAction";

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(startShowUser());
  }, [dispatch]);

  const userData = useSelector((state) => {
    return state.userData;
  });

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  const handleInterTable = () => {
    navigate(`/user/${userData.username}/dashboard/candidate/interview/table`, {
      state: { username: userData.username, email: userData.email },
    });
  };

  return (
    <div>
      {Object.keys(userData).length !== 0 && userData.username === "Admin" && (
        <nav className="navbar">
          <ul className="flex3">
            <li>
              <Link
                id="1"
                className="li item1"
                to={`/user/${userData.username}/dashboard/add/candidate`}
              >
                Add Candid
              </Link>
            </li>
            <li>
              <Link
                id="2"
                className="li item2"
                to={`/user/${userData.username}/dashboard/view/candidate`}
              >
                View Candid
              </Link>
            </li>
            <li>
              <Link
                id="3"
                className="li item2"
                to={`/user/${userData.username}/dashboard/view/candidates/stats`}
              >
                Candidate Stats
              </Link>
            </li>
            <li className="li item3" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
      )}

      {Object.keys(userData).length !== 0 &&
        userData.roles === "Interviewer" && (
          <nav className="navbar">
            <ul className="flex3">
              <li>
                <span id="4" className="li item4" onClick={handleInterTable}>
                  View Interview Table
                </span>
              </li>
              <li className="li item5" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </nav>
        )}
    </div>
  );
};

export default NavBar;
