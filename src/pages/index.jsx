import Link from "next/link";
import { TextInput } from "../components/atoms";
import { Layout } from "../components/organisms";
import { useState, useCallback, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({
  Button: {
    display: "flex",
    margin: "1rem auto 0",
    padding: 0,
  },
});

export default function Home() {
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);
  const classes = useStyles();

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
    <Layout>
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
                <a className="px-8 py-2">詳細を見る</a>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
