import { combineReducers } from "redux";
import interestsReducer from "./interestsReducer";
import usersReducer from "./usersReducer";
import chatsReducer from "./chatsReducer";
import profileReducer from './profileReducer'

const reducer = combineReducers({
  interestsState: interestsReducer,
  usersState: usersReducer,
  chatsState: chatsReducer,
  profileState: profileReducer,
});

export default reducer;
