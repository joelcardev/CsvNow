import * as Actions from "./actionTypes";

const INITIAL_STATE = {
  keyWord: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case Actions.KEY_WORD: {
      return {
        ...state,
        keyWord: action.payload,
      };
    }
    default:
      return state;
  }
};
