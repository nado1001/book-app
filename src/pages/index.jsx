import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";

const Home = () => {
  const selector = useSelector((state) => state);

  useEffect(() => {
    Router.push(`/users/${selector.users.uid}`);
  }, []);

  return <></>;
};

export default Home;
