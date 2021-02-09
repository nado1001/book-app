import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  radio: {
    flexDirection: "unset",
  },
}));

export default function BookEdit(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("female");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
            <FormLabel component="legend">現在の状態</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="progress"
              value={value}
              onChange={handleChange}
              className={classes.radio}
            >
              <FormControlLabel value="read" control={<Radio />} label="未読" />
              <FormControlLabel value="male" control={<Radio />} label="既読" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div onClick={handleClose}>Subscribe</div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
