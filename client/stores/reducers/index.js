import { combineReducers } from "redux";
import interestsReducer from "./interestsReducer";
import usersReducer from "./usersReducer";
import chatsReducer from "./chatsReducer";
import profileReducer from './profileReducer'
import videoCallReducer from './videoCallReducer'

const reducer = combineReducers({
  interestsState: interestsReducer,
  usersState: usersReducer,
  chatsState: chatsReducer,
  profileState: profileReducer,
  videoCallState: videoCallReducer
});

export default reducer;
