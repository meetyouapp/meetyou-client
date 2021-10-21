import {
 SET_PLACE_DATA,
 SET_LOADING_PLACE
} from "../actionType";

const initialState = {
  placeData: [],
  loadingPlace: false
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PLACE_DATA:
      return { ...state, placeData: payload };
      case SET_LOADING_PLACE:
        return { ...state, loadingPlace: payload };
    default:
      return state;
  }
}
