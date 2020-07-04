import React from "react";

export interface IMessage {
  user: string;
  text: string;
}

type MessageProps = {
  message: {
    user: string;
    text: string;
  };
  name: string;
};

export default function Message({
  message: { user, text },
  name,
}: MessageProps) {
  let isSentByCurrentUser = false;

  if (user === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="w-9/12 justify-end ml-auto mr-2 mb-3 p-2 rounded bg-green-600 text-green-100">
      <p className="m-0">{text}</p>
    </div>
  ) : (
    <div className="w-9/12 ml-2 mb-3 p-2 rounded bg-gray-200 text-gray-800">
      <p>{text}</p>
      {user === "admin" ? (
        <small className="font-semibold">{user}</small>
      ) : (
        <small className="italic">{user}</small>
      )}
    </div>
  );
}
