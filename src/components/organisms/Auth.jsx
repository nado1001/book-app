import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../../redux/users/selectors";
import { listenAuthState } from "../../redux/users/operations";
import { useRouter } from "next/router";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const router = useRouter();

  console.log(selector.users);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  return children;
};

export default Auth;
