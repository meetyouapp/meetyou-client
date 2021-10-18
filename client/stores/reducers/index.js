import { combineReducers } from "redux";
import interestsReducer from "./interestsReducer";
import usersReducer from "./usersReducer";
const reducer = combineReducers({
  interestsState: interestsReducer,
  usersState: usersReducer,
});

export default reducer;
