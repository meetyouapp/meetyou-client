import {
 SET_PLACE_DATA
} from "../actionType";

const initialState = {
  placeData: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PLACE_DATA:
      return { ...state, placeData: payload };
    default:
      return state;
  }
}
