import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import NoMatch from "./NoMatch";
import AddCandidate from "./AddCandidate";
import ViewCandidate from "./ViewCandidate";
import InterviewProcess from "./InterviewProcess";
import AddRounds from "./AddRounds";
import InterviewTable from "./InterViewTable";
import ViewStatistics from "./ViewStatistics";

const Login = React.lazy(() => import("./Login"));

const Container = (props) => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>...</>}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          exact
          path="/user/:username/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/user/:username/:roles/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/user/:username/dashboard/add/candidate"
          element={
            <PrivateRoute>
              <AddCandidate />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/user/:username/dashboard/view/candidate"
          element={
            <PrivateRoute>
              <ViewCandidate />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/user/:username/dashboard/view/candidates/stats"
          element={
            <PrivateRoute>
              <ViewStatistics />
            </PrivateRoute>
          }
        />

        <Route
          exact
          path="/user/:username/dashboard/candidate/:candidateID/intreview_process"
          element={
            <PrivateRoute>
              <InterviewProcess />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/user/:username/dashboard/candidate/:candidateID/add/round"
          element={
            <PrivateRoute>
              <AddRounds />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/user/:username/dashboard/candidate/interview/table"
          element={
            <PrivateRoute>
              <InterviewTable />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default Container;
