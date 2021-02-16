import { db } from "../../firebase";
import { Layout } from "../../components/organisms";
import { BookEdit } from "../../components/molecules";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  select: {
    width: "20%",
    ["@media (max-width:768px)"]: {
      width: "100%",
    },
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

  const [status, setStatus] = useState("");
  const [books, setBooks] = useState([]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const query =
      status !== "" ? booksRef.where("progress", "==", status) : booksRef;
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
  }, [status]);

  return (
    <Layout title="本棚">
      <div className="md:max-w-screen-lg mx-auto mt-8 px-3 md:px-0">
        <h1 className="text-2xl md:text-left md:pl-4 text-center bg-blue-200 py-2 rounded-lg">
          {selector.users.username}さんの本棚
        </h1>
        <div className="mt-4" />
        <div>
          {books.length !== 0 && (
            <FormControl variant="outlined" className={classes.select}>
              <InputLabel id="demo-simple-select-outlined-label">
                フィルター
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={status}
                onChange={handleChange}
                label="フィルター"
              >
                <MenuItem value="">
                  <em>すべて</em>
                </MenuItem>
                <MenuItem value="unread">未読</MenuItem>
                <MenuItem value="reading">読書中</MenuItem>
                <MenuItem value="read">読了</MenuItem>
              </Select>
            </FormControl>
          )}
          {books.length !== 0 ? (
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
          ) : (
            <div className="text-center text-xl mt-20">
              現在、本棚に本が登録されていません。
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default books;
