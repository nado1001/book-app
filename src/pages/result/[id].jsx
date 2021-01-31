import fetch from "node-fetch";
import { Layout } from "../../components/organisms";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Button: {
    display: "flex",
    padding: 0,
    width: "19.5rem",
    ["@media (max-width:768px)"]: {
      width: "100%",
      marginTop: "1rem",
    },
  },
});

const Post = ({ data }) => {
  const classes = useStyles();

  // console.log(data.volumeInfo.title);

  return (
    <Layout title={data.volumeInfo.title}>
      <div className="md:flex md:justify-center md:px-0 px-6">
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
              <p className="text-base">著者：{data.volumeInfo.authors[0]}</p>
              <p className="text-base">
                発売日：{data.volumeInfo.publishedDate}
              </p>
              <h2 className="text-lg mt-6">あらすじ</h2>
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
                href={data.volumeInfo.previewLink}
                target="_blank"
              >
                google booksで見る
              </a>
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.Button}
            >
              <div className="px-8 py-3">本棚に登録する</div>
            </Button>
          </div>
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
