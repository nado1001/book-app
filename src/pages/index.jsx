import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../redux/users/operations";
import { useRouter } from "next/router";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const selector = useSelector((state) => state);

  console.log(selector.users);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Link href="/about/">
          <a>aboutへ</a>
        </Link>

        <button onClick={() => dispatch(signIn())}>sign in</button>
      </main>
    </div>
  );
}
