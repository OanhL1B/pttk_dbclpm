import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import customerReducer from "./customerReducer";

export default combineReducers({
  errors: errorReducer,
  customer: customerReducer,
});
