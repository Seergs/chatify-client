import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
let socket: SocketIOClient.Socket;

export default function Chat() {
  const [name, setName] = useState("");
  const ENDPOINT = "http://localhost:5000";

  const { search } = useLocation();

  useEffect(() => {
    function connect() {
      const query = new URLSearchParams(search);
      const username = query.get("name");

      socket = io(ENDPOINT);

      if (username) {
        setName(username);
      }

      socket.emit("join", { name: username });
    }

    connect();

    return () => {
      socket.emit("disconnect");
      //socket.off();
    };
  }, [ENDPOINT, search]);
  return <div>Chat</div>;
}
