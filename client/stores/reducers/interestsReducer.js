import { SET_INTERESTS } from "../actionType";

const initialState = {
  interests: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_INTERESTS:
      return { ...state, interests: action.payload };

    default:
      return state;
  }
}
