import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

import adminReducer from "./adminReducer";

export default combineReducers({
  admin: adminReducer,
  errors: errorReducer,
});
