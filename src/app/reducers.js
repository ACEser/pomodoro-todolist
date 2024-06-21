// reducers.js
const initialState = {
  token: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;