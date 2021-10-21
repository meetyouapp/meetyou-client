import { SET_VIDEO_CALL, SET_LOADING_VIDEO_CALL, GET_VIDEO_CALL, SET_ERROR_VIDEO_CALL } from "../actionType";

const initialState = {
  videoCallSet: "",
  videoCallGet: "",
  isLoading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_VIDEO_CALL:
      return { ...state, videoCallSet: payload?.url };

    case GET_VIDEO_CALL:
      return { ...state, videoCallGet: payload?.url };

    case SET_LOADING_VIDEO_CALL:
      return { ...state, isLoading: payload };

    case SET_ERROR_VIDEO_CALL:
      return { ...state, isLoading: payload };

    default:
      return state;
  }
}
