import React, { useEffect } from "react";
import type { ReactNode, VFC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UsersState } from "@/redux/store/store";
import { getIsSignedIn } from "@/redux/users/selectors";
import { listenAuthState } from "@/redux/users/operations";
import { useRouter } from "next/router";

const Auth: VFC<{ children: ReactNode }> = (props: any) => {
  const dispatch = useDispatch();
  // TODO selectorの型指定
  const selector = useSelector((state: any) => state);
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
