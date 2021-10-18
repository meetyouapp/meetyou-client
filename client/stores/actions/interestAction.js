import { SET_INTERESTS } from "../actionType";
import { instance } from "../../apis/api";

export function setInterests(interests) {
  return {
    type: SET_INTERESTS,
    payload: interests,
  };
}

export function setInterestsAsync() {
  return function (dispatch) {
    instance
      .get(`/interests`)
      .then((res) => {
        const data = res.data;
        const interest = data.map((el) => {
          el["selected"] = false;
          return el;
        });
        dispatch(setInterests(interest));
      })
      .catch((err) => console.log(err));
  };
}
