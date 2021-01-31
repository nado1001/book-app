import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { TextInput } from "../components/atoms";
import { Layout } from "../components/organisms";
import { useState, useCallback, useEffect } from "react";
import fetch from "node-fetch";
import axios from "axios";

export default function Home({ title, thumbnail }) {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);

  const inputSearch = useCallback(
    (event) => {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  async function fetchBooks(word) {
    if (word) {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
          word
        )}&maxResults=30`
      );
      const json = await res.data.items;
      setBookList(json);
      // console.log(bookList);
    }
  }

  useEffect(() => {
    fetchBooks(search);
  }, [search]);

  return (
    <Layout className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-20">
        <div className="md:w-3/6 w-4/6 mx-auto mt-4">
          <h1 className="text-3xl">書籍検索</h1>
          <p className="my-4">著者名、本のタイトルなどを入力してください</p>
          <TextInput
            fullWidth={true}
            label={"検索"}
            multiline={false}
            required={true}
            rows={1}
            value={search}
            type={"search"}
            onChange={inputSearch}
          />
        </div>

        <ul className="bookList flex flex-wrap md:justify-center items-center justify-between">
          {bookList.map((book, index) => (
            <li className="bookList__item mt-8 md:w-30 w-1/2" key={index}>
              <h2 className="text-center">{book.volumeInfo.title}</h2>
              {book.volumeInfo.imageLinks ? (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="m-auto"
                />
              ) : (
                <span className="flex justify-center items-center m-auto w-36 h-48">
                  no image
                </span>
              )}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}

// export async function getStaticProps() {
//   const res = await fetch(
//     "https://www.googleapis.com/books/v1/volumes?q=%E4%B8%89%E7%A7%8B%E7%B8%8B"
//   );
//   const json = await res.json();
//   const title = json.items[0].volumeInfo.title;
//   const thumbnail = json.items[0].volumeInfo.imageLinks.thumbnail;

//   return {
//     props: {
//       title,
//       thumbnail,
//     },
//   };
// }
