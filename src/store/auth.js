import { createSlice } from "@reduxjs/toolkit";
import { login as loginApi} from "../api/auth";

const initialState = {
  user: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return Object.assign({}, state, { user: action.payload });
    }
  }
});

export default slice.reducer;

export const isAuthSelector = state => state.auth.user !== null;

export function login(logindata) {
  return async function(dispatch) {
    const user = await loginApi(logindata);
    dispatch(slice.actions.setUser(user));
  }
}
