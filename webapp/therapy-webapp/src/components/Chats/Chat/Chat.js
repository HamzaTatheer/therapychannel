import React, { useState, useEffect } from "react";
import withIndex from "../../withIndex";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";

import { Input } from "react-chat-elements";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import { ChevronRight as ChevronRightIcon } from "@material-ui/icons";
import AppsIcon from "@material-ui/icons/Apps";
import io from "socket.io-client";
import { socket } from "../../../service/socket";
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { LoadMessages } from "../../../api/Chat";

function Chats(props) {
  console.log(props.location.state);
  console.log(props.location.state.recipient);
  const [Recipient, setRecipient] = useState(props.location.state.recipient);
  const [Message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [Authenticated, setAuthenticated] = useState(false);
  const [Socket, setSocket] = useState(null);
  let token = props.token;
  let input_node = null;
  let messagesEnd = null;

  useEffect(() => {
    LoadMessages(Recipient)
      .then((res) => {
        console.log("__________");
        console.log(res.data);
        let messages = res.data;
        setConversation(
          messages.map((val) => {
            return { to: val.to, from: val.from, message: val.message };
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let socket = io("http://localhost:9000");
    setSocket(socket);
    socket.on("connect", function () {
      socket.emit("authentication", { token });
      socket.on("authenticated", function () {
        setAuthenticated(true);
        socket.emit("startmessage", { to: Recipient });
        socket.on("message", function (data) {
          setConversation((prevConvo) => {
            return [
              ...prevConvo,
              { from: Recipient, to: props.user._id, message: data.message },
            ];
          });
        });
      });
    });

    socket.on("disconnect", function () {
      setAuthenticated(false);
      setSocket(null);
    });

    return () => {
      socket.emit("endmessage");
      socket.off("connect");
      socket.off("authenticated");
      socket.off("unauthorized");
      socket.off("message");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [token]);

  const sendMessage = (message) => {
    let convo = [
      ...conversation,
      { from: props.user._id, to: Recipient, message: message },
    ];
    Socket.emit("message", { to: Recipient, message: message });
    setConversation(convo);
    setMessage("");
    input_node.clear();
  };

  const renderMessages = (messages) => {
    return (
      <MessageList
        style={{ height: "300px" }}
        className="message-list"
        lockable={true}
        toBottomHeight={"100%"}
        dataSource={messages.map((message, index) => {
          return {
            position: message.from == props.user._id ? "right" : "left",
            type: "text",
            text: message.message,
            date: new Date(),
          };
        })}
      />
    );
  };

  useEffect(() => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  return (
    <>
      <Snackbar open={Authenticated} autoHideDuration={6000}>
        <MuiAlert severity="success">User Connected with {Recipient}</MuiAlert>
      </Snackbar>
      <Snackbar open={!Authenticated} autoHideDuration={6000}>
        <MuiAlert severity="error">User Disconnected {token}</MuiAlert>
      </Snackbar>
      <Grid
        item
        xs={12}
        style={{
          height: "300px",
          background: "aliceblue",
          overflowY: "scroll",
        }}
      >
        {renderMessages(conversation)}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            messagesEnd = el;
          }}
        ></div>
      </Grid>
      {true ? (
        <Input
          placeholder="Type here..."
          ref={(el) => (input_node = el)}
          onChange={(event) => setMessage(event.target.value)}
          disa
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              sendMessage(Message);
            }
          }}
          rightButtons={
            <>
              <IconButton
                disabled={Socket == null ? true : false}
                onClick={() => sendMessage(Message)}
              >
                <AppsIcon />
              </IconButton>

              <IconButton
                disabled={Socket == null ? true : false}
                onClick={() => sendMessage(Message)}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          }
        />
      ) : (
        <Grid item xs="12">
          <MuiAlert severity="info">
            You Can not send a message right now
          </MuiAlert>
        </Grid>
      )}
    </>
  );
}

export default withIndex(Chats);
