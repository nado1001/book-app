import { Layout } from "@/components/organisms";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

const useStyles = makeStyles(() => ({
  icon: {
    fontSize: "5rem",
    borderRadius: "50%",
    background: "#757575",
    color: "#fff",
    padding: "1rem",
  },
}));

const guide = () => {
  const classes = useStyles();
  return (
    <Layout title="Book Logの使い方">
      <div className="md:max-w-5xl w-full px-4 md:px-0 mx-auto mt-12">
        <h1 className="text-3xl font-medium text-center">Book Logの使い方</h1>
        <p className="text-lg text-center leading-loose mt-4">
          Book Logは自分だけの本棚を作成し
          <br />
          読書の進捗を管理することができます
        </p>
        <ul className="md:mt-16 md:flex items-center justify-between">
          <li
            className="border-gray-400 border-2 border-solid p-4 rounded md:w-80 mt-8 md:mt-0"
            style={{ height: "17rem" }}
          >
            <div className="flex justify-center">
              <SearchIcon className={classes.icon} />
            </div>
            <h2 className="text-center text-lg mt-4">書籍を検索する</h2>
            <p className="mt-4 text-left flex justify-center leading-relaxed">
              まずは好きな本や読みたい本を検索します。
              <br />
              見つかったら詳細ページへ移動しましょう。
            </p>
          </li>
          <li
            className="border-gray-400 border-2 border-solid p-4 rounded md:w-80 mt-8 md:mt-0"
            style={{ height: "17rem" }}
          >
            <div className="flex justify-center">
              <BookmarksIcon className={classes.icon} />
            </div>
            <h2 className="text-center text-lg mt-4">本棚に登録する</h2>
            <p className="mt-4 text-left flex justify-center leading-relaxed">
              詳細ページでは本の概要を見ることができます。
              <br />
              読みたいと思った本なら自分の本棚に登録してみましょう。
            </p>
          </li>
          <li
            className="border-gray-400 border-2 border-solid p-4 rounded md:w-80 mt-8 md:mt-0"
            style={{ height: "17rem" }}
          >
            <div className="flex justify-center">
              <ImportContactsIcon className={classes.icon} />
            </div>
            <h2 className="text-center text-lg mt-4">進捗を管理する</h2>
            <p className="mt-4 text-left flex justify-center leading-relaxed">
              読書を始めたら本棚に登録してある本をタップしてステータスを更新しましょう。
              <br />
              未読・読書中・読了でフィルターをかけることもできます。
            </p>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default guide;
