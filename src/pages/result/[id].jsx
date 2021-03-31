import fetch from "node-fetch";
import { Layout } from "../../components/organisms";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { useState } from "react";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 8, 4),
    borderRadius: "10px",
  },
  Button: {
    display: "flex",
    padding: 0,
    width: "19.5rem",
    textTransform: "none",
    ["@media (max-width:768px)"]: {
      width: "100%",
      marginTop: "1rem",
    },
  },
}));

const Post = ({ data }) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bookData = {
    thumbnail: data.volumeInfo.imageLinks
      ? data.volumeInfo.imageLinks.thumbnail
      : "",
    title: data.volumeInfo.title,
    description: data.volumeInfo.description ? data.volumeInfo.description : "",
    totalPage: data.volumeInfo.pageCount,
    currentPage: 0,
    progress: "unread",
  };

  const updateBooks = () => {
    db.collection("users")
      .doc(selector.users.uid)
      .collection("books")
      .doc(data.volumeInfo.title)
      .set(bookData, { merge: true })
      .then(() => {
        handleOpen();
      })
      .catch((error) => {
        alert("登録に失敗しました。お手数ですが最初からやり直してください。");
      });
  };

  return (
    <Layout title={data.volumeInfo.title}>
      <div className="md:flex md:justify-center md:px-0 mt-8 px-6">
        <div className="margin-adjuster_container">
          <h1 className="text-2xl mt-4 text-center md:text-left">
            {data.volumeInfo.title}
          </h1>
          <div className="md:flex mt-8">
            {data.volumeInfo.imageLinks ? (
              <img
                src={data.volumeInfo.imageLinks.thumbnail}
                alt={data.volumeInfo.title}
                className="md:w-1/5 w-60 mx-auto md:mx-0"
              />
            ) : (
              <span className="flex justify-center items-center mx-auto md:mx-0 w-40 h-48 border border-black">
                no image
              </span>
            )}
            <div className="md:w-4/5 md:px-8 mt-4 md:mt-0">
              {data.volumeInfo.authors && (
                <div className="flex items-start">
                  <h2 className="text-base md:w-auto w-1/6">著者：</h2>
                  <ul className="md:w-auto w-5/6">
                    {data.volumeInfo.authors.map((author, index) => {
                      return (
                        <li className="text-base" key={index}>
                          {author}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <p className="text-base mt-4">
                発売日：{data.volumeInfo.publishedDate}
              </p>
              <h2 className="text-lg mt-6">概要</h2>
              <p
                className="mt-2 text-base"
                dangerouslySetInnerHTML={{
                  __html: data.volumeInfo.description,
                }}
              />
            </div>
          </div>
          <div className="mt-14 md:flex md:items-center md:justify-between md:w-3/5 md:mr-auto md:ml-auto">
            <Button
              variant="contained"
              color="primary"
              className={classes.Button}
            >
              <a
                className="px-8 py-3"
                href={`https://www.amazon.co.jp/s?k=${encodeURI(
                  data.volumeInfo.title
                )}`}
                target="_blank"
              >
                Amazonで購入する
              </a>
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.Button}
            >
              <div className="px-8 py-3" onClick={updateBooks}>
                本棚に登録する
              </div>
            </Button>
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2
                  id="transition-modal-title"
                  className="text-center text-lg mb-4"
                >
                  本棚に登録しました
                </h2>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.Button}
                >
                  <Link href={`/users/${selector.users.uid}`}>
                    <a className="block px-8 py-3 w-full font-bold">
                      本棚に移動する
                    </a>
                  </Link>
                </Button>
                <div className="mt-4" />
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.Button}
                >
                  <Link href="/">
                    <a className="block px-8 py-3 w-full font-bold">
                      書籍検索へ戻る
                    </a>
                  </Link>
                </Button>
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${params.id}`
  );
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default Post;
