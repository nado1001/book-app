import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signOut } from "../redux/users/operations";

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Link href="/about/">
          <a>aboutへ</a>
        </Link>

        <button onClick={() => dispatch(signOut())}>ログアウト</button>
      </main>
    </div>
  );
}
