import React, { useEffect, useState, FormEvent } from "react";
import { useLocation, useHistory } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import Loadingbar from "react-top-loading-bar";

import WriteMessage from "../WriteMessage/WriteMessage";
import Messages from "../Messages/Messages";
import { IMessage } from "../Message/Message";
import Users from "../Users/Users";

let socket: SocketIOClient.Socket;

export default function Chat() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const ENDPOINT = "https://chatify-server-socket.herokuapp.com";
  //const ENDPOINT = "http://localhost:5000";

  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    setProgress(50);
    async function connect() {
      const query = new URLSearchParams(search);
      const username = query.get("name");

      socket = io(ENDPOINT);

      if (username) {
        setName(username);
      } else {
        history.replace("/");
      }

      const response = await axios.get(`${ENDPOINT}/messages`);
      setMessages(response.data);
      setProgress(100);

      socket.emit("join", { name: username }, (usersInChat: string[]) => {
        setUsers((users) => [...users, ...usersInChat]);
      });
    }

    connect();
  }, [ENDPOINT, search, history]);

  useEffect(() => {
    socket.on("message", (message: IMessage) => {
      setMessages((messages) => [...messages, message]);
      if (message.users) {
        setUsers(message.users);
      }
    });
  }, []);

  function sendMessage(e: React.KeyboardEvent<HTMLInputElement> | FormEvent) {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  return (
    <>
      <Loadingbar progress={progress} height={3} color="#276749" />
      <div className="flex">
        <div className="w-screen lg:w-4/5">
          <h3 className="m-2 text-2xl">General</h3>
          <Messages messages={messages} user={name} />
          <WriteMessage
            message={message}
            sendMessage={sendMessage}
            setMessage={setMessage}
          />
        </div>
        <Users users={users} />
      </div>
    </>
  );
}
