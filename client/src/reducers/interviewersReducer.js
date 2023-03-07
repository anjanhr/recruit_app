const initialState = [];

const interviewersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INTER": {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
};

export default interviewersReducer;
