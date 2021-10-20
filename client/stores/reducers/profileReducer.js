import {
  SET_LOADING_PROFILE,
  SET_DATA_PROFILE,
  SET_DATA_DETAIL
} from "../actionType";

const initialState = {
  profileData: {},
  detailData: {},
  loadingProfile: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DATA_PROFILE:
      return { ...state, profileData: payload };
    case SET_DATA_DETAIL:
      return { ...state, detailData: payload };
    case SET_LOADING_PROFILE:
      return { ...state, loadingProfile: payload };
    default:
      return state;
  }
}
