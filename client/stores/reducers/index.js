import { combineReducers } from "redux";
import interestsReducer from "./interestsReducer";
import usersReducer from "./usersReducer";
import chatsReducer from "./chatsReducer";
import profileReducer from './profileReducer'
import videoCallReducer from './videoCallReducer'
import placeReducer from './placeReducer'

const reducer = combineReducers({
  interestsState: interestsReducer,
  usersState: usersReducer,
  chatsState: chatsReducer,
  profileState: profileReducer,
  videoCallState: videoCallReducer,
  placeState: placeReducer
});

export default reducer;
