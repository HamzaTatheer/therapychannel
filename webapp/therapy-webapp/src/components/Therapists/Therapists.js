import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import withIndex from "../withIndex";
import { showTherapists } from "../../api/Therapists";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { LoadMessages } from "../../api/Chat";

function Therapists(props) {
  const useStyles = makeStyles((theme) => ({
    root: {},
  }));
  const classes = useStyles();

  const [Therapists, setTherapists] = useState([]);

  useEffect(() => {
    showTherapists()
      .then((res) => {
        console.log(res.data);
        setTherapists(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderTherapists = () => {
    return Therapists.map((val) => {
      return (
        <Grid item xs="2">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              props.history.push("/chats/chat", { recipient: val._id });
            }}
          >
            Talk to {val.name}
          </Button>
        </Grid>
      );
    });
  };

  return (
    <Grid container className={classes.root}>
      {Therapists ? renderTherapists() : "No Therapists Found"}
    </Grid>
  );
}

export default withIndex(Therapists);
