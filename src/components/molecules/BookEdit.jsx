import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  radio: {
    flexDirection: "unset",
  },
  button: {
    width: "50%",
    margin: "0.5rem auto",
    padding: "0.7rem",
    fontWeight: "bold",
    ["@media (max-width:768px)"]: {
      width: "90%",
    },
  },
  deleteButton: {
    width: "47%",
    margin: "0.5rem auto",
    padding: "0.7rem",
    fontWeight: "bold",
    color: "orangered",
    border: "1px solid rgba(244, 143, 177, 0.5)",
    "&:hover": {
      border: "1px solid #f48fb1",
      backgroundColor: "rgba(244, 143, 177, 0.08)",
    },
    ["@media (max-width:768px)"]: {
      width: "90%",
    },
  },
  number: {
    padding: "1rem",
  },
}));

export default function BookEdit(props) {
  const router = useRouter();
  const selector = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState("");
  const [count, setCount] = useState(props.currentPage);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeProgress = useCallback(
    (event) => {
      setProgress(event.target.value);
    },
    [setProgress]
  );

  const changeCount = useCallback(
    (event) => {
      setCount(event.target.value);
    },
    [setCount]
  );

  const bookUpdate = () => {
    db.collection("users")
      .doc(selector.users.uid)
      .collection("books")
      .doc(props.title)
      .set(
        {
          progress: progress,
          currentPage: count,
        },
        { merge: true }
      )
      .then(() => {
        alert("保存しました");
        setOpen(false);
      });
  };

  const deleteBook = () => {
    const confirm = window.confirm("本棚から削除してもよろしいですか？");
    if (!confirm) {
      return false;
    } else {
      db.collection("users")
        .doc(selector.users.uid)
        .collection("books")
        .doc(props.title)
        .delete()
        .then(() => {
          alert("削除しました");
          setOpen(false);
        });
    }
  };

  useEffect(() => {
    setProgress(props.progress);
  }, [props.progress]);

  useEffect(() => {
    setCount(props.currentPage);
  }, [props.currentPage]);

  return (
    <div>
      <div onClick={handleClickOpen} className="cursor-pointer">
        {props.children}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            dangerouslySetInnerHTML={{
              __html: props.description,
            }}
          />
          <FormControl component="fieldset">
            <h2 className="mt-4 text-lg">現在の状態</h2>
            <RadioGroup
              aria-label="gender"
              name="progress"
              value={progress}
              onChange={changeProgress}
              className={classes.radio}
            >
              <FormControlLabel
                value="unread"
                control={<Radio />}
                label="未読"
              />
              <FormControlLabel value="read" control={<Radio />} label="読了" />
            </RadioGroup>
            <div className="flex items-center mt-4">
              <TextField
                id="outlined-basic"
                label="ページ数"
                variant="outlined"
                type="number"
                rows="4"
                value={count}
                onChange={changeCount}
              />
              <span className="text-lg block mt-4 ml-4">
                / {props.totalPage}
              </span>
            </div>
            　　　
          </FormControl>
        </DialogContent>
        <div className="mt-4 block text-center px-0 md:flex items-center md:px-5">
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            onClick={bookUpdate}
            startIcon={<SaveIcon />}
          >
            保存する
          </Button>
          <Button
            variant="outlined"
            className={classes.deleteButton}
            onClick={deleteBook}
            startIcon={<DeleteIcon />}
          >
            本棚から削除する
          </Button>
        </div>
        <div className="mt-4" />
      </Dialog>
    </div>
  );
}
