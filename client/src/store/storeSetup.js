import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import candidateReducer from "../reducers/candidateReducer";
import interviewersReducer from "../reducers/interviewersReducer";

const storeSetup = () => {
  const store = createStore(
    combineReducers({
      userData: userReducer,
      candidatesData: candidateReducer,
      interviewersData: interviewersReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default storeSetup;
