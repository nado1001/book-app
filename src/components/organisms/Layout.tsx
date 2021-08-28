import React from "react";
import type { ReactNode, VFC } from "react";
import Head from "next/head";
import { Header } from "@/components/organisms/index";

const siteTitle = "Book Log";

const Layout: VFC<{ children: ReactNode; title?: string }> = (props) => {
  const { title, children } = props;
  return (
    <React.Fragment>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      </Head>
      <Header />
      <main className="py-16">{children}</main>
    </React.Fragment>
  );
};

export default Layout;
