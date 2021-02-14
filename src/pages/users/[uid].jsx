import { db } from "../../firebase";
import { Layout } from "../../components/organisms";
import { BookEdit } from "../../components/molecules";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";

const useStyles = makeStyles(() => ({
  tab: {
    width: "49%",
    fontWeight: "bold",
    fontSize: "1.3rem",
    borderRadius: "5px",
  },
}));

const books = () => {
  const selector = useSelector((state) => state);
  const classes = useStyles();
  const router = useRouter();
  const booksRef = db
    .collection("users")
    .doc(selector.users.uid)
    .collection("books");

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const query =
      router.query.progress !== undefined
        ? booksRef.where("progress", "==", router.query.progress)
        : booksRef.where("progress", "==", "unread");
    query
      .get()
      .then((snapshots) => {
        const list = [];
        snapshots.forEach((snapshot) => {
          const data = snapshot.data();
          list.push({
            totalPage: data.totalPage,
            currentPage: data.currentPage,
            description: data.description,
            progress: data.progress,
            thumbnail: data.thumbnail,
            title: data.title,
          });
        });
        setBooks(list);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [router.query.progress, books]);

  return (
    <Layout title="本棚">
      <div className="md:max-w-screen-lg mx-auto mt-8 px-3 md:px-0">
        <h1 className="text-2xl md:text-left md:pl-4 text-center bg-blue-200 py-2 rounded-lg">
          {selector.users.username}さんの本棚
        </h1>
        <div className="mt-4" />
        <div>
          <div className="flex items-center justify-between">
            <Button className={classes.tab} variant="contained" color="primary">
              <Link href={`/users/${selector.users.uid}/?progress=unread`}>
                <a className="w-full">未読</a>
              </Link>
            </Button>
            <Button className={classes.tab} variant="contained" color="primary">
              <Link href={`/users/${selector.users.uid}/?progress=read`}>
                <a className="w-full">読了</a>
              </Link>
            </Button>
          </div>

          <ul className="mt-8 bg-gray-100 flex items-center flex-wrap">
            {books.map((book, index) => (
              <li key={index} className="w-1/2 md:w-auto md:ml-4 py-4">
                <BookEdit
                  title={book.title}
                  description={book.description}
                  progress={book.progress}
                  currentPage={book.currentPage}
                  totalPage={book.totalPage}
                >
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="mx-auto"
                  />
                </BookEdit>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default books;
