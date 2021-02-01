import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Button: {
    backgroundColor: "#556cd6",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

const PrimaryButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.Button}
      variant="contained"
      onClick={() => props.onClick()}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
