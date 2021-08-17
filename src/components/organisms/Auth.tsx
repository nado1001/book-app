import React, { useEffect } from "react";
import type { ReactNode, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "@/redux/users/selectors";
import { listenAuthState } from "@/redux/users/operations";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
};

const Auth: VFC<Props> = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (
    !isSignedIn &&
    router.pathname !== "/signin" &&
    router.pathname !== "/signup" &&
    router.pathname !== "/signin/reset"
  ) {
    return <></>;
  } else {
    console.log(selector.users);
    return props.children;
  }
};

export default Auth;
