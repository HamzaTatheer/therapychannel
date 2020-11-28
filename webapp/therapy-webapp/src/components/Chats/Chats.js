import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import withIndex from "../withIndex";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

function Chats(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          onClick={() => props.history.push("/chats/chat", { recipient: 3 })}
        >
          <ListItemIcon>
            <Avatar>A</Avatar>
          </ListItemIcon>
          <ListItemText primary="Alex" />
        </ListItem>
        <Divider />

        <ListItem button>
          <ListItemIcon>
            <Avatar>M</Avatar>
          </ListItemIcon>
          <ListItemText primary="Mark" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}

export default withIndex(Chats);
