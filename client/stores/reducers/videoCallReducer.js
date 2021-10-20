import { SET_VIDEO_CALL, SET_LOADING_VIDEO_CALL, GET_VIDEO_CALL, SET_ERROR_VIDEO_CALL } from "../actionType";

const initialState = {
  videoCall: {},
  isLoading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_VIDEO_CALL:
      return { ...state, videoCall: payload };

    case GET_VIDEO_CALL:
      return { ...state, videoCall: payload };

    case SET_LOADING_VIDEO_CALL:
      return { ...state, isLoading: payload };

    case SET_ERROR_VIDEO_CALL:
      return { ...state, isLoading: payload };

    default:
      return state;
  }
}
