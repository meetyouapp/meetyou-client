import { combineReducers } from "redux";
import interestsReducer from "./interestsReducer";
import usersReducer from "./usersReducer";
import chatsReducer from "./chatsReducer";
const reducer = combineReducers({
  interestsState: interestsReducer,
  usersState: usersReducer,
  chatsState: chatsReducer,
});

export default reducer;
