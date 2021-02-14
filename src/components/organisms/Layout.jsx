import React from "react";
import Head from "next/head";
import { Header } from "./index";

const siteTitle = "Book Log";

const Layout = (props) => {
  const { title, children } = props;
  return (
    <React.Fragment>
      <Head>
        <title>{props.title ? `${title} | ${siteTitle}` : siteTitle}</title>
      </Head>
      <Header />
      <main className="py-16">{children}</main>
    </React.Fragment>
  );
};

export default Layout;
