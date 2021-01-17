import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../../redux/users/selectors";
import { listenAuthState } from "../../redux/users/operations";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const seletor = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(seletor);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  return children;
};

export default Auth;
