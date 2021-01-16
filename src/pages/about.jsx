import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { getUserId, getUserName } from "../redux/users/selectors";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const about = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const name = getUserName(selector);

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
      </form>
      <Link href="/">
        <a>ホーム</a>
      </Link>
      <p>{uid}</p>
      <p>{name}</p>
    </div>
  );
};

export default about;
