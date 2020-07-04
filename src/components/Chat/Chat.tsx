import React, { useEffect, useState, FormEvent } from "react";
import { useLocation, useHistory } from "react-router-dom";
import io from "socket.io-client";
import WriteMessage from "../WriteMessage/WriteMessage";
import Messages from "../Messages/Messages";
import { IMessage } from "../Message/Message";
import axios from "axios";

let socket: SocketIOClient.Socket;

export default function Chat() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "http://localhost:5000";

  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    async function connect() {
      const query = new URLSearchParams(search);
      const username = query.get("name");

      socket = io(ENDPOINT);

      if (username) {
        setName(username);
      } else {
        history.replace("/");
      }

      const response = await axios.get("http://localhost:5000/messages");
      setMessages(response.data);

      socket.emit("join", { name: username }, () => {});
    }

    connect();
  }, [ENDPOINT, search, history]);

  useEffect(() => {
    socket.on("message", (message: IMessage) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  function sendMessage(e: React.KeyboardEvent<HTMLInputElement> | FormEvent) {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  }

  return (
    <div>
      <h3 className="m-2 text-2xl">General</h3>
      <Messages messages={messages} user={name} />
      <WriteMessage
        message={message}
        sendMessage={sendMessage}
        setMessage={setMessage}
      />
    </div>
  );
}
