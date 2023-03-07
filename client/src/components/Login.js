import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import logopic from "../assets/logo.jpg";
import userPic from "../assets/1.jpg";
import { startLoginUser } from "../actions/userAction";
import { useDispatch } from "react-redux";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reset, setReset] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email !== "" && !reset) {
      const formData = {
        email,
        password,
      };
      dispatch(startLoginUser(formData, reDirectSuccess));
      function reDirectSuccess(data) {
        navigate(`user/${data.username}/dashboard`);
        setEmail("");
        setPassword("");
      }
    } else {
      setEmail("");
      setPassword("");
      setReset(!reset);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <div>
      <div className="flex1">
        <img src={logopic} className="logo" alt="not found" />
        <form className="form1" onSubmit={handleSubmit}>
          <div className="flex2">
            <label className="login">LOGIN</label>
            <img src={userPic} alt="not found" className="userpic" />
            <div className="input1">
              <input
                className="input1_1"
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                className="input1_2"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div>
              <input className="submit" type="submit" value="Login" />
              <button
                className="reset"
                onClick={() => {
                  setReset(!reset);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
