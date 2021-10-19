import {
  SET_LOADING_PROFILE,
  SET_DATA_PROFILE
} from "../actionType";

const initialState = {
  profileData: {},
  loadingProfile: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DATA_PROFILE:
      return { ...state, profileData: payload };
    case SET_LOADING_PROFILE:
      return { ...state, loadingProfile: payload };
    default:
      return state;
  }
}
