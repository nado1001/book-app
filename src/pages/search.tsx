import type { NextPage } from "next";
import Link from "next/link";
import { TextInput, Loading } from "@/components/atoms/";
import { Layout } from "@/components/organisms";
import React, { useState, useCallback, useEffect } from "react";
import Button from "@material-ui/core/Button";
import HelpIcon from "@material-ui/icons/Help";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
  icon: {
    color: "#757575",
  },
  Button: {
    display: "flex",
    margin: "1rem auto 0",
    padding: 0,
  },
}));

const search: NextPage = () => {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const inputSearch = useCallback(
    (event) => {
      setSearch(event.target.value);
    },
    [setSearch]
  );

  const fetchBooks = useCallback(
    async (word: string): Promise<void> => {
      if (word) {
        const res: Promise<object> = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
            word
          )}&maxResults=25`
        );
        const json = await res.data.items;
        setBookList(json);
        // console.log(bookList);
      }
    },
    [setBookList]
  );

  const setSession = () => {
    sessionStorage.setItem("search", search);
    setLoading(true);
  };

  useEffect(() => {
    fetchBooks(search);
  }, [search]);

  useEffect(() => {
    const session = sessionStorage.getItem("search");
    if (session !== null) {
      setSearch(session);
    }
  }, []);

  return (
    <Layout>
      {loading && <Loading />}
      <div className="md:w-3/6 w-4/6 mx-auto mt-12">
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
        <div className="my-4">
          <Link href="/guide">
            <a className="hover:opacity-80">
              <HelpIcon className={classes.icon} />
              <span className="ml-2">Book Logの使い方</span>
            </a>
          </Link>
        </div>
      </div>

      <ul className="bookList flex flex-wrap md:justify-center items-center justify-between">
        {bookList.map((book, index) => (
          <li className="bookList__item mt-8 md:w-30 w-1/2" key={index}>
            <h2 className="text-center mb-2">{book.volumeInfo.title}</h2>
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
            <Button
              variant="contained"
              color="primary"
              className={classes.Button}
            >
              <Link href={`/result/${book.id}`}>
                <a className="px-8 py-2" onClick={setSession}>
                  詳細を見る
                </a>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default search;
