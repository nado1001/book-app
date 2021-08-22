import {
  createStore as reduxCreteStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { UsersReducer } from "../users/reducers";

export type UsersState = {
  isSignedIn: Boolean;
  role: String;
  uid: String;
  username: String;
};

export default function createStore() {
  return reduxCreteStore(
    combineReducers({
      users: UsersReducer,
    }),
    applyMiddleware(thunk)
  );
}
