import type { NextPage } from "next";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

const Home: NextPage = () => {
  const selector = useSelector((state: any) => state);

  useEffect(() => {
    Router.push(`/users/${selector.users.uid}`);
  }, []);

  return <></>;
};

export default Home;
