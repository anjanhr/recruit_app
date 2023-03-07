const initialState = [];

const candidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CANDIES": {
      return [...action.payload];
    }
    default: {
      return state;
    }
  }
};

export default candidateReducer;
