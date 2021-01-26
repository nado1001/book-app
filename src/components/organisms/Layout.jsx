import React from "react";
import { Header } from "./index";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
